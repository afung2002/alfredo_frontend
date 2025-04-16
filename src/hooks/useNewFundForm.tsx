import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateFundMutation, useLazyGetFundByIdQuery, useUpdateFundMutation } from '@services/api/baseApi';
import { useEffect } from 'react';

const schema = z.object({
  name: z.string().min(1, 'Fund name is required'),
  websiteUrl: z.string().url('Must be a valid URL'),
  description: z.string().min(1, 'Description is required'),
  legalEntity: z.string().min(1, 'Legal entity is required'),
  fundSize: z.string().min(1, 'Fund size is required'),
  estimatedValue: z.string().min(1, 'Estimated value is required'),
});

export type NewFundFormData = z.infer<typeof schema>;

const useNewFundForm = (fundId: string | null) => {
  const [createFund, { isLoading }] = useCreateFundMutation();
  const [getFund, { data: fundData, isLoading: isFundLoading }] = useLazyGetFundByIdQuery();
  const [updateFund, { isLoading: isUpdateLoading }] = useUpdateFundMutation(); // Assuming this is the correct mutation for updating a fund
  
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

  useEffect(() => {
    if (fundId) {
    getFund(Number(fundId)).unwrap()
    }
  },[fundId]);

  useEffect(() => {
    if (isFundLoading) return;
    if (fundData) {
      reset({
        name: fundData.name,
        websiteUrl: fundData.website_url,
        description: fundData.description,
        legalEntity: fundData.legal_entity,
        fundSize: fundData.fund_size,
        estimatedValue: fundData.estimated_value,
      });
    }
  }, [isFundLoading, fundData]);
  
  // ✅ New wrapper with explicit boolean return
  const submitNewFund = async () => {
    let result: number | null = null;
  
    await handleSubmit(async (data) => {
      try {
        if (fundId) {
          const response = await updateFund({
            id: Number(fundId),
            name: data.name,
            website_url: data.websiteUrl,
            description: data.description,
            legal_entity: data.legalEntity,
            fund_size: data.fundSize,
            estimated_value: data.estimatedValue,
          }).unwrap();
          reset();
        result = response?.id
        } else {
        const response = await createFund({
          name: data.name,
          website_url: data.websiteUrl,
          description: data.description,
          legal_entity: data.legalEntity,
          fund_size: data.fundSize,
          estimated_value: data.estimatedValue,
        }).unwrap();
  
        reset();
        result = response?.id
      }
      } catch (error: any) {
        const message = error?.data?.message || 'Something went wrong. Please try again.';
        setError('name', { message });
        result = null;
      }
    })(); // <- Notice the immediate call here
  
    return result;
  };
  

  return {
    newFundControl: control,
    submitNewFund,
    newFundErrors: errors,
    newFundIsLoading: isLoading,
    newFundIsUpdateLoading: isUpdateLoading,
  };
};

export default useNewFundForm;
