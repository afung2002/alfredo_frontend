import { useState } from "react";

import { prospect, prospects, updates } from "@constants/fake-data";
import { Input } from "@src/components/ui/input";
import ProspectUpdateCard from "@src/components/ProspectUpdateCard";

export default function Updates() {
  const [searchQuery, setSearchQuery] = useState("");

  const totalProspects = prospects.length;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white h-screen flex flex-col pt-24">
      <div className="flex-none space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold">
            {totalProspects} New Updates
          </h1>
        </div>

        <div>
          <Input
            type="text"
            placeholder="Search"
            className="w-full px-6 py-2 border rounded-full text-sm border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto mt-6">
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
