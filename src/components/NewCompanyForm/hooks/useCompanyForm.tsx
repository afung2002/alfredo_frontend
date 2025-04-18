import { useState } from 'react';
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: '',
      websiteUrl: '',
      founderEmail: '',
      description: '',
    },
  });

  const onSubmit = async (data: CompanyFormData) => {
    try {
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
