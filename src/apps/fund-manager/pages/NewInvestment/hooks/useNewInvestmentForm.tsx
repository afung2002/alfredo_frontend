import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Routes } from '@constants/routes';
import { useCreateInvestmentMutation, useGetInvestmentByIdQuery,  useLazyGetCompanyByIdQuery, useUpdateInvestmentMutation } from '@services/api/baseApi'; // make sure this exists
import { useEffect } from 'react';

const schema = z.object({
  company: z.string().min(1, 'Company is required'),
  websiteUrl: z.string().url('Must be a valid URL'),
  founderEmail: z.string().email('Must be a valid email'),
  description: z.string().min(1, 'Description is required'),
  investedAmount: z.string().min(1, 'Required'),
  estimatedValue: z.string().min(1, 'Required'),
  postMoneyValuation: z.string().min(1, 'Required'),
  investmentDate: z.string().min(1, 'Required'),
  investmentType: z.enum(['FUND', 'ANGEL']),
  fund: z.string().optional(), // will handle disabling based on type
  status: z.string().min(1, 'Status is required'),
  limitedPartner: z.string().optional(), // Assuming this is a string, adjust if necessary
});



const useNewInvestmentForm = (id: string | null) => {
  const navigate = useNavigate();
  const [createInvestment, { isLoading }] = useCreateInvestmentMutation();
  const [updateInvestment, { isLoading: isUpdateLoading }] = useUpdateInvestmentMutation();
  const {data: investmentData, isLoading: isInvestmentLoading, error: isInvestmentError} = useGetInvestmentByIdQuery(+id, {
    skip: id === null,
  });
  const [getCompany, {data: companyData, isLoading: companyLoading, error: companyError}] = useLazyGetCompanyByIdQuery();

  useEffect(() => {
    if (investmentData) {
      console.log('Investment Data:', investmentData);
      getCompany(investmentData?.company?.id).unwrap()
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
        websiteUrl: companyData.website_url,
        founderEmail: companyData.founder_email,
        description: companyData.description,
        investedAmount: investmentData.amount,
        estimatedValue: investmentData.estimated_value,
        postMoneyValuation: investmentData.post_money_valuation,
        investmentDate: investmentData.investment_date,
        investmentType: investmentData.type,
        fund: investmentData.fund.toString() || '',
        status: investmentData.status,
        limitedPartner: investmentData.fund_manager_id || '',
      });
    }
  }, [isInvestmentLoading, investmentData, isInvestmentError, companyData]);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      company: '',
      websiteUrl: '',
      founderEmail: '',
      description: '',
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

  const onSubmit = async (data: any, fundId: string | null = null) => {
    try {
      if (investmentData) {
        await updateInvestment({
          id: investmentData.id,
          company: data.company,
          estimated_value: data.estimatedValue,
          post_money_valuation: data.postMoneyValuation,
          investment_date: data.investmentDate,
          type: data.investmentType,
          fund: data.investmentType === 'FUND' ? (fundId || data.fund) : null,
          status: data.status,
          amount: data.investedAmount,
          fund_manager_id: data.limitedPartner || null,
        }).unwrap();
      } else {
        await createInvestment({
          company: data.company,
          estimated_value: data.estimatedValue,
          post_money_valuation: data.postMoneyValuation,
          investment_date: data.investmentDate,
          type: data.investmentType,
          fund: data.investmentType === 'FUND' ? (fundId || data.fund) : null,
          status: data.status,
          amount: data.investedAmount,
          fund_manager_id: data.limitedPartner || null,
        }).unwrap();
      }
      

      reset();
      navigate(Routes.FUND_MANAGER);
    } catch (error: any) {
      setError('company', { message: error?.data?.message || 'Submission failed' });
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit, // return separately
    errors,
    isLoading,
    watch,
  };
};


export default useNewInvestmentForm;
