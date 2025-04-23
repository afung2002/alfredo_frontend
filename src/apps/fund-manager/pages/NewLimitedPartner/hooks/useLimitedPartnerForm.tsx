import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetLimitedPartnerByIdQuery,
  useUpdateLimitedPartnerMutation,
} from '@services/api/baseApi';
import { LimitedPartner } from '@services/api/baseApi/types';
import { useNavigate } from 'react-router';

type LimitedPartnerFormFields = Omit<LimitedPartner, 'user_id'>;

const useLimitedPartnerForm = (limitedPartnerId: string) => {
  const { data, isLoading: isFetching, error: fetchError } = useGetLimitedPartnerByIdQuery(limitedPartnerId);
  const [updateLimitedPartner, { isLoading: isUpdating, error: updateError, isSuccess }] =
    useUpdateLimitedPartnerMutation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LimitedPartnerFormFields>({
    defaultValues: {
      website_url: '',
      email: '',
      name: '',
      description: '',
      fund: undefined,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        website_url: data.website_url || '',
        name: data.name || '',
        email: data.email || '',
        description: data.description || '',
        fund: data.fund,
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: LimitedPartnerFormFields) => {
    console.log('Form submitted with values:', values);
    console.log('Limited Partner ID:', limitedPartnerId);
    try {
      await updateLimitedPartner({user_id: limitedPartnerId, ...values }).unwrap();
      navigate(-1); // Navigate back after successful update
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isFetching,
    isUpdating,
    fetchError,
    updateError,
    isSuccess,
    errors,
  };
};

export default useLimitedPartnerForm;
