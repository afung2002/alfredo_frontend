import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router-dom';
import { useCreateFundUpdateMutation } from '@services/api/baseApi'; // adjust path if needed

const createPostSchema = z.object({
  postTitle: z.string().min(1, 'Title is required'),
  postDescription: z.string().min(1, 'Description is required'),
});

type CreatePostFormState = z.infer<typeof createPostSchema>;

const useCreatePostForm = (handleClose: () => void) => {
  const { fundId } = useParams();
  const [createFundUpdate, { isLoading }] = useCreateFundUpdateMutation();
  
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    reset,
    setValue,
  } = useForm<CreatePostFormState>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      postTitle: '',
      postDescription: '',
    },
    mode: 'onChange',
  });
  console.log(errors);
  const postTitle = watch('postTitle');
  const postDescription = watch('postDescription');
  console.log(watch('postDescription'));
  const onSubmit = async (data: CreatePostFormState) => {
    try {
      if (!fundId) {
        setError('postTitle', { message: 'Fund ID is missing' });
        return;
      }

      await createFundUpdate({
        title: data.postTitle,
        description: data.postDescription,
        fund: Number(fundId),
      }).unwrap();

      reset();
      handleClose();
    } catch (error: any) {
      const errMsg = error?.data?.message || 'Something went wrong. Please try again.';
      setError('root', { message: errMsg });
    }
  };

  return {
    control,
    postTitle,
    postDescription,
    errors,
    requiredFields: { postTitle, postDescription },
    handleSubmit: handleSubmit(onSubmit),
    setError,
    reset,
    isLoading,
    setValue,
  };
};

export default useCreatePostForm;
