import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCreateFundMutation } from '@services/api/baseApi';
import { Routes } from '@constants/routes';

const schema = z.object({
  name: z.string().min(1, 'Fund name is required'),
  websiteUrl: z.string().url('Must be a valid URL'),
  description: z.string().min(1, 'Description is required'),
  legalEntity: z.string().min(1, 'Legal entity is required'),
  fundSize: z.string().min(1, 'Fund size is required'),
  estimatedValue: z.string().min(1, 'Estimated value is required'),
});

export type NewFundFormData = z.infer<typeof schema>;

const useNewFundForm = () => {
  const navigate = useNavigate();
  const [createFund, { isLoading }] = useCreateFundMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<NewFundFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      websiteUrl: '',
      description: '',
      legalEntity: '',
      fundSize: '',
      estimatedValue: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: NewFundFormData) => {
    try {
      await createFund({
        name: data.name,
        website_url: data.websiteUrl,
        description: data.description,
        legal_entity: data.legalEntity,
        fund_size: data.fundSize,
        estimated_value: data.estimatedValue,
      }).unwrap();

      reset();
      navigate(Routes.FUND_MANAGER_FUNDS);
    } catch (error: any) {
      const message = error?.data?.message || 'Something went wrong. Please try again.';
      setError('name', { message });
    }
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
  };
};

export default useNewFundForm;
