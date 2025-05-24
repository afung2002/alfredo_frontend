// useUploadDocumentForm.ts
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadDocumentMutation } from '@services/api/baseApi';

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
  fundId?: string,
  limitedPartner?: string
) => {
  const [uploadDocument, { isLoading }] = useUploadDocumentMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
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

  const submitForm = async () => {
    await handleSubmit(async () => {
      try {
        const file = getValues('file')[0];
        const documentType = getValues('documentType');

        const payload: any = {
          name: getValues('docTitle'),
          description: getValues('description'),
          file,
        };

        // if no explicit documentType and external IDs passed
        if (!documentType && fundId) {
          payload.fund = fundId;
        }
        if (!documentType && investmentId) {
          payload.investment = investmentId;
        }

        // fund-management branch
        if (documentType === 'fund-management') {
          const fundVal = getValues('fund');
          payload.fund = fundVal === 'no_funds' ? null : fundVal; // 🔥 treat no_funds as null
        }

        // fund-investment branch
        if (documentType === 'fund-investment') {
          const fundVal = getValues('fund');
          const invVal  = getValues('investment');
          const compVal = getValues('company');
          payload.fund         = fundVal === 'no_funds'        ? null : fundVal; // 🔥
          payload.investment   = invVal  === 'no_investments'  ? null : invVal;  // 🔥
          payload.company_name = compVal === 'no_companies'    ? null : compVal; // 🔥
        }

        // angel-investment branch
        if (documentType === 'angel-investment') {
          const invVal  = getValues('investment');
          const compVal = getValues('company');
          payload.investment   = invVal  === 'no_investments'  ? null : invVal;  // 🔥
          payload.company_name = compVal === 'no_companies'    ? null : compVal; // 🔥
        }

        if (limitedPartner) {
          payload.limited_partner = limitedPartner;
        }

        await uploadDocument(payload).unwrap();
        reset();
        onSuccess();
      } catch (err: any) {
        const message = err?.data?.message || 'Upload failed. Try again.';
        console.error('Upload error:', message);
      }
    })();
  };

  return {
    uploadControl: control,
    submitForm,
    uploadErrors: errors,
    uploadIsLoading: isLoading,
    watch,
  };
};

export default useUploadDocumentForm;
