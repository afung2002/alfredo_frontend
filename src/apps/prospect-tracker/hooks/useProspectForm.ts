import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/constants/routes";

const personSchema = z.object({
  name: z.string().min(1, "Name is required"),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL"),
  description: z.string().min(1, "Description is required"),
});

const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  websiteUrl: z.string().url("Please enter a valid website URL"),
  description: z.string().min(1, "Description is required"),
});

const fundSchema = z.object({
  name: z.string().min(1, "Fund name is required"),
  websiteUrl: z.string().url("Please enter a valid website URL"),
  description: z.string().min(1, "Description is required"),
});

export type PersonFormData = z.infer<typeof personSchema>;
export type CompanyFormData = z.infer<typeof companySchema>;
export type FundFormData = z.infer<typeof fundSchema>;

type FormData = PersonFormData | CompanyFormData | FundFormData;

const useProspectForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(personSchema), // Default to person schema
    defaultValues: {
      name: "",
      linkedinUrl: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);
    try {
      navigate(Routes.PROSPECT_TRACKER_PROSPECT);
    } catch (error: any) {
      console.error("Error saving prospect:", error);
    }
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};

export default useProspectForm;
