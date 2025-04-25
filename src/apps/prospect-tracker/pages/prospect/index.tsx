import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

import { Button } from "@src/components/ui/button";
import { Card } from "@src/components/ui/card";
import { Routes } from "@src/constants/routes";
import ProspectUpdateCard from "@src/components/ProspectUpdateCard";
import { prospect, updates } from "@src/constants/fake-data";

export default function Prospect() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white min-h-screen flex flex-col">
      <Link to={Routes.PROSPECT_TRACKER}>
        <Button variant="ghost" size="sm">
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back
        </Button>
      </Link>

      <div className="pt-12">
        <h1 className="text-2xl font-semibold mb-4">Prospect</h1>

        <Card className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">{prospect.name}</h2>
              <FaLinkedin className="text-[#0077b5] w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                {prospect.type}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <PencilIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="">
            <h3 className="text-sm font-medium mb-2">
              Specific Sources Tracking:
            </h3>
            <div className="space-y-1 text-sm text-gray-500">
              {Object.entries(prospect.sources).map(([key, value]) => (
                <div key={key} className="break-all">
                  {value}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Description:</h3>
            <p className="text-sm text-gray-500">{prospect.description}</p>
          </div>
        </Card>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Updates</h2>
          <Button variant="ghost" size="sm">
            All
          </Button>
        </div>

        <div className="space-y-3">
          {updates.map((update) => (
            <ProspectUpdateCard
              key={update.id}
              update={update}
              name={prospect.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
