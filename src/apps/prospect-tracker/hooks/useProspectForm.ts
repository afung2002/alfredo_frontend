import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const personSchema = z.object({
  name: z.string().min(1, "Name is required"),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL"),
  description: z.string().min(1, "Description is required"),
});

export type PersonFormData = z.infer<typeof personSchema>;

const useProspectForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      name: "",
      linkedinUrl: "",
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: PersonFormData) => {
    try {
      console.log("Form data:", data);
      reset();
      navigate(-1);
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
