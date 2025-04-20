import { cn } from "@src/utils/uiUtils";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { useState } from "react";
import { FaLinkedin, FaLink } from "react-icons/fa";

interface Prospect {
  id: string;
  name: string;
  type: "Person" | "Fund" | "Company";
  updates: number;
  hasLinkedIn?: boolean;
  hasWebsite?: boolean;
}

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

const prospects: Prospect[] = [
  {
    id: "1",
    name: "Wayne Chang",
    type: "Person",
    updates: 3,
    hasLinkedIn: true,
  },
  {
    id: "2",
    name: "John Andrew",
    type: "Person",
    updates: 2,
    hasLinkedIn: true,
  },
  {
    id: "3",
    name: "Khalid Ashmawy",
    type: "Person",
    updates: 2,
    hasLinkedIn: true,
  },
  {
    id: "4",
    name: "Vivek Katara",
    type: "Person",
    updates: 2,
    hasLinkedIn: true,
  },
  {
    id: "5",
    name: "Comma Capital",
    type: "Fund",
    updates: 2,
    hasWebsite: true,
  },
  { id: "6", name: "Thatch", type: "Company", updates: 2, hasWebsite: true },
  {
    id: "7",
    name: "Conscience VC",
    type: "Fund",
    updates: 2,
    hasWebsite: true,
  },
  {
    id: "8",
    name: "Mural Pay",
    type: "Company",
    updates: 2,
    hasWebsite: true,
  },
  {
    id: "9",
    name: "Josh Browder",
    type: "Company",
    updates: 2,
    hasLinkedIn: true,
  },
  {
    id: "10",
    name: "Maverick Partners",
    type: "Fund",
    updates: 2,
    hasWebsite: true,
  },
  {
    id: "11",
    name: "Wayne Chang",
    type: "Person",
    updates: 3,
    hasLinkedIn: true,
  },
  {
    id: "12",
    name: "John Andrew",
    type: "Person",
    updates: 2,
    hasLinkedIn: true,
  },
  {
    id: "13",
    name: "Khalid Ashmawy",
    type: "Person",
    updates: 2,
    hasLinkedIn: true,
  },
  {
    id: "14",
    name: "Vivek Katara",
    type: "Person",
    updates: 2,
    hasLinkedIn: true,
  },
  {
    id: "15",
    name: "Comma Capital",
    type: "Fund",
    updates: 2,
    hasWebsite: true,
  },
  { id: "16", name: "Thatch", type: "Company", updates: 2, hasWebsite: true },
  {
    id: "17",
    name: "Conscience VC",
    type: "Fund",
    updates: 2,
    hasWebsite: true,
  },
  {
    id: "18",
    name: "Mural Pay",
    type: "Company",
    updates: 2,
    hasWebsite: true,
  },
  {
    id: "19",
    name: "Josh Browder",
    type: "Company",
    updates: 2,
    hasLinkedIn: true,
  },
  {
    id: "20",
    name: "Maverick Partners",
    type: "Fund",
    updates: 2,
    hasWebsite: true,
  },
];

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
          <Button className="bg-black text-white px-4 py-2 rounded text-sm">
            Add New
          </Button>
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

interface ProspectCardProps {
  prospect: Prospect;
  onClick: () => void;
}

const ProspectCard = ({ prospect, onClick }: ProspectCardProps) => (
  <div
    onClick={onClick}
    className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer shadow-sm"
  >
    <div className="flex items-center gap-2">
      <span className="font-medium text-sm">{prospect.name}</span>
      {prospect.hasLinkedIn && (
        <FaLinkedin className="text-[#0077b5]" size={20} />
      )}
      {prospect.hasWebsite && <FaLink className="text-gray-500" size={16} />}
    </div>
    <div className="flex items-center gap-4">
      <span className="text-gray-500 border border-gray-300 rounded-full px-2 py-0.5 text-xs">
        {prospect.type}
      </span>
      <div className="text-blue-600 text-xs border border-gray-300 rounded-full px-2 py-0.5">
        {prospect.updates} new updates
      </div>
      <div className="text-gray-400">›</div>
    </div>
  </div>
);
