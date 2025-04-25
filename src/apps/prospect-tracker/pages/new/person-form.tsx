import { Control, FieldErrors } from "react-hook-form";
import { FormInput } from "@src/components/ui/form-input";
import { FormTextArea } from "@src/components/ui/form-textarea";
import { PersonFormData } from "../../hooks/useProspectForm";

interface PersonFormProps {
  control: Control<PersonFormData>;
  errors: FieldErrors<PersonFormData>;
}

const ErrorMessage = ({ message }: { message: string }) => {
  return <p className="text-sm text-red-500 mt-1">{message}</p>;
};

export default function PersonForm({ control, errors }: PersonFormProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <FormInput name="name" control={control} placeholder="Enter name" />
        {errors.name?.message && <ErrorMessage message={errors.name.message} />}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Enter this person's LinkedIn URL
        </label>
        <FormInput
          name="linkedinUrl"
          control={control}
          placeholder="linkedIn.com/elonmusk"
        />
        {errors.linkedinUrl?.message && (
          <ErrorMessage message={errors.linkedinUrl.message} />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Description (will help to drive precision in our AI scanning)
        </label>
        <FormTextArea
          name="description"
          control={control}
          placeholder="Elon Musk previously founded SpaceX and Tesla"
        />
        {errors.description?.message && (
          <ErrorMessage message={errors.description.message} />
        )}
      </div>
    </>
  );
}
