// useNewInvestmentForm.ts
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@constants/routes';
import {
  useCreateInvestmentMutation,
  useGetInvestmentByIdQuery,
  useLazyGetCompanyByIdQuery,
  useUpdateInvestmentMutation,
} from '@services/api/baseApi';
import { useEffect } from 'react';
import {
  removeCommas,
  formatNumberWithCommas,
  setFormattedCommaValue,
  parseCommaSeparatedNumber,
} from '@utils/index';
import { useCommaFormattingWatcher } from '@hooks/useCommaFormattingWatcher';
// import { useUser } from '@clerk/clerk-react';


const schema = z.object({
  company: z.string().min(1, 'Company is required'),
  investedAmount: z.string()
    .min(1)
    .refine((val) => parseCommaSeparatedNumber(val)! >= 0, { message: 'Must be equal or greater than 0' }),
  estimatedValue: z.string()
    .min(1)
    .refine((val) => parseCommaSeparatedNumber(val)! >= 0, { message: 'Must be equal or greater than 0' }),
  postMoneyValuation: z.string()
    .min(1)
    .refine((val) => parseCommaSeparatedNumber(val)! >= 0, { message: 'Must be equal or greater than 0' }),
  investmentDate: z.string().min(1),
  investmentType: z.enum(['FUND', 'ANGEL']),
  fund: z.string().optional(),
  status: z.string().min(1),
  limitedPartner: z.string().optional(),
});

const useNewInvestmentForm = (id: string | null, fundId) => {
  const navigate = useNavigate();
  // const { user } = useUser();
  const user = { id: 'demo-user' };
  //for demo purpose
  const [createInvestment, { isLoading }] = useCreateInvestmentMutation();
  const [updateInvestment] = useUpdateInvestmentMutation();
  const { data: investmentData, isLoading: isInvestmentLoading, error: isInvestmentError } = useGetInvestmentByIdQuery(+id, {
    skip: id === null,
  });
  const [getCompany, { data: companyData }] = useLazyGetCompanyByIdQuery();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      company: '',
      investedAmount: '',
      estimatedValue: '',
      postMoneyValuation: '',
      investmentDate: '',
      investmentType: 'FUND',
      fund: '',
      status: '',
      limitedPartner: '',
    },
    mode: 'onChange',
  });

  useCommaFormattingWatcher(watch, setValue, [
    'investedAmount',
    'estimatedValue',
    'postMoneyValuation',
  ]);

  useEffect(() => {
    if (investmentData) {
      getCompany(investmentData?.company?.id).unwrap();
    }
  }, [investmentData]);

  useEffect(() => {
    if (isInvestmentLoading) return;
    if (isInvestmentError) {
      console.error('Error fetching investment data:', isInvestmentError);
      return;
    }
    if (investmentData && companyData) {
      reset({
        company: companyData.id.toString(),
        investedAmount: formatNumberWithCommas(investmentData.amount),
        estimatedValue: formatNumberWithCommas(investmentData.estimated_value),
        postMoneyValuation: formatNumberWithCommas(investmentData.post_money_valuation),
        investmentDate: investmentData.investment_date,
        investmentType: investmentData.type,
        fund: investmentData.fund?.toString() || '',
        status: investmentData.status,
        limitedPartner: investmentData.fund_manager_id || '',
      });
    }
  }, [isInvestmentLoading, investmentData, isInvestmentError, companyData]);

  const onSubmit = async (data: any) => {

    try {
      if (data.investmentType === 'FUND') {
        const payload = {
          company: data.company,
          estimated_value: removeCommas(data.estimatedValue),
          post_money_valuation: removeCommas(data.postMoneyValuation),
          investment_date: data.investmentDate,
          type: data.investmentType,
          fund: data.investmentType === 'FUND' ? (fundId || data.fund) : null,
          status: data.status,
          amount: removeCommas(data.investedAmount),
          fund_manager_id: user?.id,
        }
        if (investmentData) {
          await updateInvestment({ id: investmentData.id, ...payload }).unwrap();
        } else {
          await createInvestment(payload).unwrap();
        }
      } 
      if (data.investmentType === 'ANGEL') {
        const payload = {
          company: data.company,
          estimated_value: removeCommas(data.estimatedValue),
          post_money_valuation: removeCommas(data.postMoneyValuation),
          investment_date: data.investmentDate,
          type: data.investmentType,
          status: data.status,
          amount: removeCommas(data.investedAmount),
          fund_manager_id: user?.id,
        }
        if (investmentData) {
          await updateInvestment({ id: investmentData.id, ...payload }).unwrap();
        } else {
          await createInvestment(payload).unwrap();
        }
      }




      reset();
      navigate(Routes.FUND_MANAGER);
    } catch (error: any) {
      setError('company', { message: error?.data?.message || 'Submission failed' });
    }
  };

  return {
    control,
    handleSubmit: handleSubmit((data) => onSubmit(data)),
    errors,
    isLoading,
    watch,
    setFundValue: (value: string) => setValue('fund', value),
    setCompanyValue: (value: string) => setValue('company', value.toString()),
    setValue,
  };
};

export default useNewInvestmentForm;
