import { Button } from "@src/components/ui/button";
import { Card } from "@src/components/ui/card";
import { FormInput } from "@src/components/ui/form-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { Routes } from "@src/constants/routes";
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProspectForm from "../../hooks/useProspectForm";
import { FormTextArea } from "@src/components/ui/form-textarea";

const PROSPECT_TYPES = [
  {
    label: "Person",
    value: "person",
  },
  {
    label: "Company",
    value: "company",
  },
  {
    label: "Fund",
    value: "fund",
  },
] as const;

export default function NewProspect() {
  const navigate = useNavigate();
  const [prospectType, setProspectType] = useState<
    (typeof PROSPECT_TYPES)[number]["value"] | undefined
  >();
  const { control, handleSubmit, errors } = useProspectForm();

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white h-screen flex flex-col">
      <Link to={Routes.PROSPECT_TRACKER}>
        <Button variant="ghost" size="sm">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back
        </Button>
      </Link>

      <div className="pt-20">
        <h1 className="text-2xl font-semibold mb-4">Add New Prospect</h1>

        <Card className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Prospect Type
                </label>
                <Select
                  value={prospectType}
                  onValueChange={(value) =>
                    setProspectType(
                      value as (typeof PROSPECT_TYPES)[number]["value"]
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Prospect Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROSPECT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {prospectType === "person" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <FormInput
                      name="name"
                      control={control}
                      placeholder="Enter name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.name.message}
                      </p>
                    )}
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
                    {errors.linkedinUrl && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.linkedinUrl.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description (will help to drive precision in our AI
                      scanning)
                    </label>
                    <FormTextArea
                      name="description"
                      control={control}
                      placeholder="Elon Musk previously founded SpaceX and Tesla"
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </>
              )}
              {prospectType === "company" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <FormInput
                        name="name"
                        control={control}
                        placeholder="Esusu"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company Website URL
                      </label>
                      <FormInput
                        name="name"
                        control={control}
                        placeholder="Esusurent.com"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Specific Sources Desired to Track (Optional)
                    </label>
                    <FormTextArea
                      name="linkedinUrl"
                      control={control}
                      placeholder="If desired, add website URLs line by line that represent the company's public presence (ex: blog sites, Twitter profile, etc.) if not, we'll run general scans for you"
                    />
                    {errors.linkedinUrl && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.linkedinUrl.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description (will help to drive precision in our AI
                      scanning)
                    </label>
                    <FormTextArea
                      name="description"
                      control={control}
                      placeholder="Esusu enables renters to build credit while they pay rent."
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </>
              )}
              {prospectType === "fund" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <FormInput
                        name="name"
                        control={control}
                        placeholder="Index Ventures"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        LinkedIn URL
                      </label>
                      <FormInput
                        name="name"
                        control={control}
                        placeholder="indexventures.com"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Specific Sources Desired to Track (Optional)
                    </label>
                    <FormTextArea
                      name="linkedinUrl"
                      control={control}
                      placeholder="If desired, add website URLs line by line that represent the company's public presence (ex: blog sites, Twitter profile, etc.) if not, we'll run general scans for you"
                    />
                    {errors.linkedinUrl && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.linkedinUrl.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description (will help to drive precision in our AI
                      scanning)
                    </label>
                    <FormTextArea
                      name="description"
                      control={control}
                      placeholder="Index Ventures is a multi-stage venture capital firm investing across 12 funds into founders worldwide."
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-4">
                <Button onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!prospectType || Object.keys(errors).length > 0}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
