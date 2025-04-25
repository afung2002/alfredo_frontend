import { useState } from "react";

import { cn } from "@src/utils/uiUtils";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Link } from "react-router-dom";
import { Routes } from "@constants/routes";
import ProspectCard, { Prospect } from "@src/components/ProspectCard";
import { prospects } from "@src/constants/fake-data";

type FilterType = "All" | "Companies" | "Funds" | "People";

interface FilterButtonConfig {
  label: string;
  slug: FilterType;
  count?: number;
}

interface FilterButtonsProps {
  buttons: FilterButtonConfig[];
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function ProspectTracker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const totalProspects = prospects.length;
  const companiesCount = prospects.filter((p) => p.type === "Company").length;
  const fundsCount = prospects.filter((p) => p.type === "Fund").length;
  const peopleCount = prospects.filter((p) => p.type === "Person").length;

  const filterButtons: FilterButtonConfig[] = [
    { label: "All", slug: "All" },
    { label: "Companies", slug: "Companies", count: companiesCount },
    { label: "Funds", slug: "Funds", count: fundsCount },
    { label: "People", slug: "People", count: peopleCount },
  ];

  const filteredProspects = prospects.filter((prospect) => {
    const typeMatch =
      activeFilter === "All" ||
      (activeFilter === "Companies" && prospect.type === "Company") ||
      (activeFilter === "Funds" && prospect.type === "Fund") ||
      (activeFilter === "People" && prospect.type === "Person");

    const searchMatch =
      !searchQuery ||
      prospect.name.toLowerCase().includes(searchQuery.toLowerCase());

    return typeMatch && searchMatch;
  });

  const handleProspectClick = (prospect: Prospect) => {
    console.log("Clicked prospect:", prospect);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white h-screen flex flex-col pt-24">
      <div className="flex-none space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            {totalProspects.toLocaleString()} Prospects Tracking
          </h1>
          <Link to={Routes.PROSPECT_TRACKER_NEW}>
            <Button className="bg-black text-white px-4 py-2 rounded text-sm">
              Add New
            </Button>
          </Link>
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

        <div className="flex gap-4">
          <FilterButtons
            buttons={filterButtons}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto mt-6">
        <div className="space-y-3">
          {filteredProspects.map((prospect) => (
            <ProspectCard
              key={prospect.id}
              prospect={prospect}
              onClick={() => handleProspectClick(prospect)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const FilterButtons = ({
  buttons,
  activeFilter,
  onFilterChange,
}: FilterButtonsProps) => (
  <div className="flex gap-4">
    {buttons.map((button) => (
      <Button
        key={button.slug}
        onClick={() => onFilterChange(button.slug)}
        variant={"outline"}
        rounded="full"
        className={cn(activeFilter === button.slug ? "border-black" : "")}
      >
        {button.count !== undefined
          ? `${button.count} ${button.label}`
          : button.label}
      </Button>
    ))}
  </div>
);
