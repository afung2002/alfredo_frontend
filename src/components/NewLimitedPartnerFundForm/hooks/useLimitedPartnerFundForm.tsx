import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCreateFundLimitedPartnerMutation, useRegisterLimitedPartnerMutation } from '@services/api/baseApi';
import { Routes } from '@constants/routes';

const schema = z.object({
  limitedPartner: z.string().min(1, 'Limited partner is required'),
  investedAmount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Invested amount must be a positive number',
    }),
});

export type LimitedPartnerFundFormData = z.infer<typeof schema>;

const useLimitedPartnerFundForm = (fundId) => {
  const navigate = useNavigate();
  const [createLimitedPartner, { isLoading, data: addedLimitedPartner }] = useCreateFundLimitedPartnerMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LimitedPartnerFundFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      limitedPartner: '',
      investedAmount: '',
    },
    mode: 'onChange',
  });
  console.log('err0ors', errors);
  const onSubmit = async (data: LimitedPartnerFundFormData) => {
    try {
      await createLimitedPartner({
        limited_partner: data.limitedPartner,
        invested_amount: data.investedAmount,
        fund: Number(fundId),
      }).unwrap();

      reset();
    } catch (err: any) {
      console.log(err)
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
    addedLimitedPartner,
  };
};

export default useLimitedPartnerFundForm;
