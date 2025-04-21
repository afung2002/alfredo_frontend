import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadDocumentMutation } from '@services/api/baseApi';
import { useEffect } from 'react';

// Validation schema
const schema = z.object({
  docTitle: z.string().min(1, 'Document title is required'),
  description: z.string().optional(),
  file: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: 'File is required',
    }),
  documentType: z.string().optional(),
  investment: z.string().optional(),
  fund: z.string().optional(),
  company: z.string().optional(),
});

export type UploadDocumentFormData = z.infer<typeof schema>;

const useUploadDocumentForm = (
  onSuccess: () => void,
  investmentId?: string,
  fundId?: string
) => {
  const [uploadDocument, { isLoading }] = useUploadDocumentMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues,
  } = useForm<UploadDocumentFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      docTitle: '',
      description: '',
      file: undefined,
      documentType: '',
      investment: '',
      fund: '',
      company: '',
    },
    mode: 'onChange',
  });

  // Automatically set documentType if fundId or investmentId is passed
  // useEffect(() => {
  //   if (investmentId) {
  //     setValue('documentType', 'fund-investment');
  //   } else if (fundId) {
  //     setValue('documentType', 'fund-management');
  //   }
  // }, [investmentId, fundId, setValue]);

  // Submits the form and posts to API
  const submitForm = async () => {
    await handleSubmit(async (data) => {
      try {
        const file = data.file[0]; // extract from FileList
        const documentType = getValues('documentType');

        // Prepare payload conditionally
        const payload: any = {
          name: data.docTitle,
          description: data.description,
          file,
          fund_manager_id: '1', // TODO: Replace with dynamic ID
        };

        if (!documentType && fundId) {
          payload.fund = fundId;
        }

        if (!documentType && investmentId) {
          payload.investment = investmentId;
        }

        if (documentType === 'fund-management') {
          payload.fund = getValues('fund');
        }

        if (documentType === 'fund-investment') {
          payload.fund = getValues('fund');
          payload.investment = getValues('investment');
          payload.company_name = getValues('company');
        }

        if (documentType === 'angel-investment') {
          payload.company_name = getValues('company');
        }

        await uploadDocument(payload).unwrap();

        reset();
        onSuccess();
      } catch (err: any) {
        const message = err?.data?.message || 'Upload failed. Try again.';
        console.error('Upload error:', message);
      }
    })(); // Immediately invoke
  };

  return {
    uploadControl: control,
    submitForm,
    uploadErrors: errors,
    uploadIsLoading: isLoading,
    setValue,
    watch,
  };
};

export default useUploadDocumentForm;
