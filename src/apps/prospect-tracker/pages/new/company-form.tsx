import { Control, FieldErrors } from "react-hook-form";
import { FormInput } from "@src/components/ui/form-input";
import { FormTextArea } from "@src/components/ui/form-textarea";
import { CompanyFormData } from "../../hooks/useProspectForm";

interface CompanyFormProps {
  control: Control<CompanyFormData>;
  errors: FieldErrors<CompanyFormData>;
}

const ErrorMessage = ({ message }: { message: string }) => {
  return <p className="text-sm text-red-500 mt-1">{message}</p>;
};

export default function CompanyForm({ control, errors }: CompanyFormProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <FormInput name="name" control={control} placeholder="Esusu" />
          {errors.name?.message && (
            <ErrorMessage message={errors.name.message} />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Company Website URL
          </label>
          <FormInput
            name="websiteUrl"
            control={control}
            placeholder="Esusurent.com"
          />
          {errors.websiteUrl?.message && (
            <ErrorMessage message={errors.websiteUrl.message} />
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Description (will help to drive precision in our AI scanning)
        </label>
        <FormTextArea
          name="description"
          control={control}
          placeholder="Esusu enables renters to build credit while they pay rent."
        />
        {errors.description?.message && (
          <ErrorMessage message={errors.description.message} />
        )}
      </div>
    </>
  );
}
