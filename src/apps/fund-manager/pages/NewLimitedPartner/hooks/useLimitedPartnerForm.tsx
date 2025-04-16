import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useRegisterLimitedPartnerMutation } from '@services/api/baseApi';
import { Routes } from '@constants/routes';

const schema = z.object({
  user_id: z.string().min(1, 'User ID is required').max(50),
  website_url: z.string().url('Invalid URL').max(200).optional().or(z.literal('')),
  legal_entity: z.string().max(255).optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
});

export type LimitedPartnerFormData = z.infer<typeof schema>;

const useLimitedPartnerForm = () => {
  const navigate = useNavigate();
  const [createLimitedPartner, { isLoading }] = useRegisterLimitedPartnerMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<LimitedPartnerFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      user_id: '',
      website_url: '',
      legal_entity: '',
      description: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: LimitedPartnerFormData) => {
    try {
      await createLimitedPartner(data).unwrap();
      reset();
      navigate(Routes.FUND_MANAGER);
    } catch (error: any) {
      const message = error?.data?.message || 'Submission failed';
      setError('user_id', { message });
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
  };
};

export default useLimitedPartnerForm;
