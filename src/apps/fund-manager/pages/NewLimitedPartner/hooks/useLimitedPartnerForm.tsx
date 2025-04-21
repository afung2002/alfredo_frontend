import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateFundLimitedPartnerMutation } from '@services/api/baseApi';
import type { FundLimitedPartnerRequest } from '@services/api/baseApi/types';

// Schema for selecting an existing limited partner
const schema = z.object({
  limitedPartners: z.string().nonempty('Please select a limited partner'),
});

type FormData = z.infer<typeof schema>;

const useLimitedPartnerForm = () => {
  const navigate = useNavigate();
  const { fundId } = useParams<{ fundId: string }>();
  const [createFundLP, { isLoading }] = useCreateFundLimitedPartnerMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { limitedPartners: '' },
  });

  const onSubmit = async (data: FormData) => {
    if (!fundId) {
      console.error('Fund ID is missing in route parameters');
      return;
    }

    // Build payload to match FundLimitedPartnerRequest
    const payload: FundLimitedPartnerRequest = {
      fund: Number(fundId),
      limited_partner: data.limitedPartners,
      invested_amount: '0', // Default amount; adjust as needed
    };

    try {
      await createFundLP(payload).unwrap();
      navigate(-1);
    } catch (err: any) {
      const message = err?.data?.message || 'Failed to add limited partner to fund';
      setError('limitedPartners', { type: 'server', message });
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
