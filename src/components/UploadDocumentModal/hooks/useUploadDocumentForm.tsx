import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadDocumentMutation } from '@services/api/baseApi';
import Investment from '../../../apps/fund-manager/pages/Investment/index';
import { useEffect } from 'react';

const schema = z.object({
  docTitle: z.string().min(1, 'Document title is required'),
  description: z.string().optional(),
  file: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: 'File is required',
    }),
  documentType: z.enum(['fund', 'investment'], {
    required_error: 'Document type is required',
  }),
  investment: z.string().optional(),
  fund: z.string().optional(),
  company: z.string().optional(),

});

export type UploadDocumentFormData = z.infer<typeof schema>

const useUploadDocumentForm = (onSuccess: () => void, investmentId: any, fundId: any) => {
  const [uploadDocument, { isLoading }] = useUploadDocumentMutation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    setValue,
    watch,
    getValues
  } = useForm<UploadDocumentFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      docTitle: '',
      description: '',
      file: undefined,
      documentType: 'investment', // Default value, can be changed as needed
      investment: '',
      fund: '',
      company: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (investmentId) {
      setValue('documentType', 'investment');
    } else if (fundId) {
      setValue('documentType', 'fund');
    }
  }, [investmentId, fundId]);

  const submitForm = async () => {
    await handleSubmit(async (data) => {
      try {
        const file = data.file[0]; // Grab  file from FileList
        console.log(fundId, 'fundId')
        console.log(investmentId, 'investmentId')
        console.log(data, 'data')
        await uploadDocument({
          description: data.description,
          name: data.docTitle,
          file,
          fund_manager_id: "1", // TODO: Replace with actual fund manager ID
          fund: getValues('documentType') === 'fund' ? (fundId || getValues('fund')) : '',
          investment: getValues('documentType') === 'investment' ? (investmentId || getValues('investment')) : '',
          company_name: data.company,
        }).unwrap();

        reset();
        onSuccess();
      } catch (err: any) {
        const message = err?.data?.message || 'Upload failed. Try again.';
      }
    })(); // call immediately
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
