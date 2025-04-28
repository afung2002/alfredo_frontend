import { Control, FieldErrors } from "react-hook-form";
import { FormInput } from "@src/components/ui/form-input";
import { FormTextArea } from "@src/components/ui/form-textarea";
import { FundFormData } from "../../hooks/useProspectForm";

interface FundFormProps {
  control: Control<FundFormData>;
  errors: FieldErrors<FundFormData>;
}

const ErrorMessage = ({ message }: { message: string }) => {
  return <p className="text-sm text-red-500 mt-1">{message}</p>;
};

export default function FundForm({ control, errors }: FundFormProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <FormInput
            name="name"
            control={control}
            placeholder="Index Ventures"
          />
          {errors.name?.message && (
            <ErrorMessage message={errors.name.message} />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Website URL</label>
          <FormInput
            name="websiteUrl"
            control={control}
            placeholder="indexventures.com"
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
          placeholder="Index Ventures is a multi-stage venture capital firm investing across 12 funds into founders worldwide."
        />
        {errors.description?.message && (
          <ErrorMessage message={errors.description.message} />
        )}
      </div>
    </>
  );
}
