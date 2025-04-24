import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateCompanyMutation } from '@services/api/baseApi';

const companySchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  websiteUrl: z.string().url('Invalid URL'),
  founderEmail: z.string().email('Invalid email'),
  description: z.string().optional(),
});

export type CompanyFormData = z.infer<typeof companySchema>;

const useCompanyForm = () => {
  const [createdCompanyId, setCreatedCompanyId] = useState<number | null>(null);
  const [createCompany, { isLoading, error }] = useCreateCompanyMutation();
  const companySchema = z.object({
    companyName: z.string().min(1, 'Company name is required'),
    websiteUrl: z
      .string()
      .trim()
      .transform((val) =>
        val.startsWith('http://') || val.startsWith('https://')
          ? val
          : `https://${val}`
      )
      .refine((val) => {
        try {
          new URL(val); // native browser validation
          return true;
        } catch {
          return false;
        }
      }, {
        message: 'Invalid URL',
      }),
    founderEmail: z.string().email('Invalid email'),
    description: z.string().optional(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = async (data: CompanyFormData) => {

    try {
      const formattedUrl = data.websiteUrl.startsWith('http')
        ? data.websiteUrl
        : `https://${data.websiteUrl}`;
      setValue('websiteUrl', formattedUrl); // Update the URL in the form state
      const response = await createCompany({
        name: data.companyName,
        website_url: data.websiteUrl,
        founder_email: data.founderEmail,
        description: data.description,
        fund_manager_id: "user_2vPjJ5YkMNjQqiLLKuMSw4j8PlH", // TODO: REMOVE AFTER BACKEND FIX
      }).unwrap();

      setCreatedCompanyId(response.id);
      reset(); // Reset form after successful submission
    } catch (e) {
      // Error handled via RTK Query `error`
      console.log('Error creating company:', e);
    }
  };

  useEffect(() => {
    if (createdCompanyId && getValues('websiteUrl')) {
      const url = getValues('websiteUrl');
      const corrected = url.startsWith('http') ? url : `https://${url}`;
      setValue('websiteUrl', corrected);
    }
  }, [createdCompanyId]);

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    error,
    createdCompanyId,
  };
};

export default useCompanyForm;
