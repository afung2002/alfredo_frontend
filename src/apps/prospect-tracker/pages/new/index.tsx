import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@src/components/ui/button";
import { Card } from "@src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { Routes } from "@src/constants/routes";

import useProspectForm from "../../hooks/useProspectForm";
import CompanyForm from "./company-form";
import FundForm from "./fund-form";
import PersonForm from "./person-form";

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

type ProspectType = (typeof PROSPECT_TYPES)[number]["value"];

export default function NewProspect() {
  const navigate = useNavigate();
  const [prospectType, setProspectType] = useState<ProspectType | undefined>();
  const { control, handleSubmit, errors } = useProspectForm();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    navigate(Routes.PROSPECT_TRACKER_PROSPECT);
  };

  const getForm = () => {
    switch (prospectType) {
      case "person":
        return <PersonForm control={control} errors={errors} />;
      case "company":
        return <CompanyForm control={control} errors={errors} />;
      case "fund":
        return <FundForm control={control} errors={errors} />;
      default:
        return null;
    }
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Prospect Type
              </label>
              <Select
                value={prospectType}
                onValueChange={(value) =>
                  setProspectType(value as ProspectType)
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
            {getForm()}
            <div className="flex justify-end space-x-4">
              <Button onClick={handleCancel} variant="outline" type="button">
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
