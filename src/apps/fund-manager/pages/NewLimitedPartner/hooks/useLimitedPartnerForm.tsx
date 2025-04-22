import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useGetLimitedPartnerByIdQuery,
  useUpdateLimitedPartnerMutation,
} from '@services/api/baseApi';
import { LimitedPartner } from '@services/api/baseApi/types';

type LimitedPartnerFormFields = Omit<LimitedPartner, 'user_id'>;

 const useLimitedPartnerForm = (limitedPartnerId: string) => {
  const { data, isLoading: isFetching, error: fetchError } = useGetLimitedPartnerByIdQuery(limitedPartnerId);
  const [updateLimitedPartner, { isLoading: isUpdating, error: updateError, isSuccess }] =
    useUpdateLimitedPartnerMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LimitedPartnerFormFields>({
    defaultValues: {
      website_url: '',
      legal_entity: '',
      description: '',
      fund: undefined,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        website_url: data.website_url || '',
        legal_entity: data.legal_entity || '',
        description: data.description || '',
        fund: data.fund,
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: LimitedPartnerFormFields) => {
    try {
      await updateLimitedPartner({...values, user_id: "1"}).unwrap();
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
