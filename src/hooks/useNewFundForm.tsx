import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateFundMutation,
  useLazyGetFundByIdQuery,
  useUpdateFundMutation,
} from '@services/api/baseApi';
import { useEffect } from 'react';
import {
  formatNumberWithCommas,
  setFormattedCommaValue,
  parseCommaSeparatedNumber,
  normalizeUrl,
} from '@utils/index';
import { useCommaFormattingWatcher } from '@hooks/useCommaFormattingWatcher';

const schema = z.object({
  name: z.string().min(1, 'Fund name is required'),
  websiteUrl: z
    .string()
    .min(1, 'Website is required')
    .transform((val) => normalizeUrl(val))
    .refine((val) => {
      try {
        new URL(val);
        return true;
      } catch {
        return false;
      }
    }, { message: 'Must be a valid URL' }),
  description: z.string().min(1, 'Description is required'),
  legalEntity: z.string().min(1, 'Legal entity is required'),
  fundSize: z.string()
    .min(1)
    .refine((val) => parseCommaSeparatedNumber(val)! > 0, { message: 'Must be greater than 0' }),
  estimatedValue: z.string()
    .min(1)
    .refine((val) => parseCommaSeparatedNumber(val)! > 0, { message: 'Must be greater than 0' }),
});

export type NewFundFormData = z.infer<typeof schema>;

const useNewFundForm = (fundId: string | null) => {
  const [createFund, { data: createdFund, isLoading }] = useCreateFundMutation();
  const [getFund, { data: fundData, isLoading: isFundLoading }] = useLazyGetFundByIdQuery();
  const [updateFund, { isLoading: isUpdateLoading }] = useUpdateFundMutation();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    watch,
    setValue,
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

  useCommaFormattingWatcher(watch, setValue, ['fundSize', 'estimatedValue']);

  // 🔁 Normalize websiteUrl on blur
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'blur' && name === 'websiteUrl') {
        const current = value[name];
        if (current) {
          const normalized = normalizeUrl(current);
          setValue('websiteUrl', normalized, { shouldValidate: true });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  useEffect(() => {
    if (fundId) {
      getFund(Number(fundId)).unwrap();
    }
  }, [fundId]);

  useEffect(() => {
    if (isFundLoading) return;
    if (fundData) {
      reset({
        name: fundData.name,
        websiteUrl: normalizeUrl(fundData.website_url ?? ''),
        description: fundData.description ?? '',
        legalEntity: fundData.legal_entity ?? '',
        fundSize: formatNumberWithCommas(fundData.fund_size ?? ''),
        estimatedValue: formatNumberWithCommas(fundData.estimated_value ?? ''),
      });
    }
  }, [isFundLoading, fundData]);
  const handleWebsiteBlur = () => {
    const current = watch('websiteUrl');
    if (current) {
      setValue('websiteUrl', normalizeUrl(current), { shouldValidate: true });
    }
  };
  const submitNewFund = async (): Promise<number | null> => {
    let result: number | null = null;

    await handleSubmit(async (data) => {
      try {
        const payload = {
          name: data.name,
          website_url: data.websiteUrl,
          description: data.description,
          legal_entity: data.legalEntity,
          fund_size: data.fundSize.replace(/,/g, ''),
          estimated_value: data.estimatedValue.replace(/,/g, ''),
        };

        const response = fundId
          ? await updateFund({ id: Number(fundId), ...payload }).unwrap()
          : await createFund(payload).unwrap();

        result = response?.id;
        reset();
      } catch (error: any) {
        const message = error?.data?.message || 'Something went wrong. Please try again.';
        setError('name', { message });
        result = null;
      }
    })();

    return result;
  };

  return {
    newFundControl: control,
    submitNewFund,
    newFundErrors: errors,
    newFundIsLoading: isLoading,
    newFundIsUpdateLoading: isUpdateLoading,
    newFundCreated: createdFund,
    handleWebsiteBlur
  };
};

export default useNewFundForm;
