import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUploadDocumentMutation } from '@services/api/baseApi';

const schema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  description: z.string().min(1, 'Description is required'),
  file: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
      message: 'File is required',
    }),
});

export type UploadDocumentFormData = z.infer<typeof schema>;

const useUploadDocumentForm = (onSuccess: () => void) => {
  const [uploadDocument, { isLoading }] = useUploadDocumentMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<UploadDocumentFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: '',
      description: '',
      file: undefined,
    },
    mode: 'onChange',
  });

  const submitForm = async () => {
    await handleSubmit(async (data) => {
      try {
        const file = data.file[0]; // Grab file from FileList

        await uploadDocument({
          company_name: data.companyName,
          description: data.description,
          name: file.name,
          file,
        }).unwrap();

        reset();
        onSuccess();
      } catch (err: any) {
        const message = err?.data?.message || 'Upload failed. Try again.';
        setError('companyName', { message });
      }
    })(); // call immediately
  };

  return {
    uploadControl: control,
    submitForm,
    uploadErrors: errors,
    uploadIsLoading: isLoading,
  };
};

export default useUploadDocumentForm;
