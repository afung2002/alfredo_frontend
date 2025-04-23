import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  PencilIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";

import { Button } from "@src/components/ui/button";
import { Card } from "@src/components/ui/card";
import { Routes } from "@src/constants/routes";

interface Update {
  id: string;
  timestamp: string;
  content: string;
  type: string;
}

export default function Prospect() {
  // Mock data - replace with real data later
  const prospect = {
    name: "Wayne Chang",
    type: "Person",
    sources: {
      linkedin: "https://www.linkedin.com/in/waynechang/",
      twitter: "https://x.com/Wayne",
      website: "chang.com",
    },
    description:
      "Serial entrepreneur and cofounder of Crashlytics (acq by Twitter). Likely going to start something new in B2B.",
  };

  const updates: Update[] = [
    {
      id: "1",
      timestamp: "3 hours ago",
      content:
        "Wayne Chang adjusted his linkedin title from Head of Product at Twitter to Cofounder at Stealth, and changed his current linkedin position to Stealth.",
      type: "Entered stealth mode",
    },
    {
      id: "2",
      timestamp: "5 days ago",
      content:
        "Featured in an article on Business Insider for his prior company Crashlytics, acquired by Twitter.",
      type: "Entered stealth mode",
    },
  ];

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
            <Card key={update.id} className="bg-white rounded-lg shadow-sm">
              <div className="flex items-start justify-between border-b border-gray-200 shadow-sm rounded-b-lg pb-4 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{prospect.name}</span>
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
          ))}
        </div>
      </div>
    </div>
  );
}
