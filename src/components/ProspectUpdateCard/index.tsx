import { ChevronRightIcon } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import { Card } from "../ui/card";
import { Update } from "@src/constants/fake-data";

export default function ProspectUpdateCard({
  update,
  name,
}: {
  update: Update;
  name: string;
}) {
  return (
    <Card key={update.id} className="bg-white rounded-lg shadow-sm">
      <div className="flex items-start justify-between border-b border-gray-200 shadow-bottom rounded-b-lg pb-4 px-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">{name}</span>
          <FaLinkedin className="text-[#0077b5] w-5 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-blue-600 bg-white px-3 py-0.5 rounded-full border border-gray-200">
            {update.type}
          </span>
          <ChevronRightIcon className="w-4 h-4" />
        </div>
      </div>
      <div className="px-4 space-y-2">
        <div className="text-sm text-gray-500">{update.timestamp}</div>
        <p className="text-sm">{update.content}</p>
      </div>
    </Card>
  );
}
