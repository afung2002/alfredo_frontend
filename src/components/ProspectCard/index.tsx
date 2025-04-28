import { FaLink, FaLinkedin } from "react-icons/fa";

export interface Prospect {
  id: string;
  name: string;
  type: "Person" | "Fund" | "Company";
  updates: number;
  updatedAgo: string;
  updateType: string;
  hasLinkedIn?: boolean;
  hasWebsite?: boolean;
}

interface ProspectCardProps {
  prospect: Prospect;
  onClick: () => void;
  showHeat?: boolean;
}

export default function ProspectCard({
  prospect,
  onClick,
  showHeat = false,
}: ProspectCardProps) {
  return (
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
        {showHeat ? (
          <>
            <span className="text-gray-500 border border-gray-300 rounded-full px-2 py-0.5 text-xs">
              {prospect.updatedAgo}
            </span>
            <div className="text-blue-600 text-xs border border-gray-300 rounded-full px-2 py-0.5">
              {prospect.updateType}
            </div>
          </>
        ) : (
          <>
            <span className="text-gray-500 border border-gray-300 rounded-full px-2 py-0.5 text-xs">
              {prospect.type}
            </span>
            <div className="text-blue-600 text-xs border border-gray-300 rounded-full px-2 py-0.5">
              {prospect.updates} new updates
            </div>
          </>
        )}
        <div className="text-gray-400">›</div>
      </div>
    </div>
  );
}
