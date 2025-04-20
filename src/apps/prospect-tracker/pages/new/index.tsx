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

export default function NewProspect() {
  const navigate = useNavigate();
  const prospectTypes = ["Person", "Company", "Fund"];
  const [prospectType, setProspectType] = useState<string>("");
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
                <Select value={prospectType} onValueChange={setProspectType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Prospect Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {prospectTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
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
                      LinkedIn URL
                    </label>
                    <FormInput
                      name="linkedinUrl"
                      control={control}
                      placeholder="Enter LinkedIn URL"
                    />
                    {errors.linkedinUrl && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.linkedinUrl.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <FormInput
                      name="description"
                      control={control}
                      placeholder="Enter description"
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
