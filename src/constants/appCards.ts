import AppImage1 from "@assets/image-1.png";
import AppImage2 from "@assets/image-2.png";
import AppImage3 from "@assets/image-3.png";
import AppImage4 from "@assets/image-4.png";
import AppImage5 from "@assets/image-5.png";
import AppImage6 from "@assets/image-6.png";
import AppImage7 from "@assets/image-7.png";
import AppImage8 from "@assets/image-8.png";
import { Routes } from "@constants/routes";

export const APP_CARDS = [
  {
    title: "Fund Manager — Manage LP Communications",
    description: "AI-powered fund admin for nimble funds & super angels.",
    imageUrl: AppImage1,
    category: "For Investors",
    categoryValue: "investors",
    path: Routes.FUND_MANAGER,
    id: 'fund-manager'
  },
  {
    title: "Limited Partner — Receive LP Updates",
    description:
      "AI-powered fund portfolio tracking, update collection, and document management.",
    imageUrl: AppImage2,
    category: "For Limited Partners",
    categoryValue: "limited-partners",
    path: Routes.LIMITED_PARTNER_FUNDS,
    id: 'limited-partner'
  },
  {
    title: "Find Intros — Pinpoint Customer Intros",
    description:
      "Harness your entire ecosystem of investors, collaborators, portfolio founders, and more to pinpoint first degree customers.",
    imageUrl: AppImage3,
    category: "For Founders",
    categoryValue: "founders",
    path: "/apps",
    id: 'find-intros'
  },
  {
    title: "Company Tracker — Track Investment Prospects",
    description:
      "Input hundreds of people, companies, and funds and track when they’re ripe for engagement, in real-time.",
    imageUrl: AppImage4,
    category: "For Investors",
    categoryValue: "investors",
    // path: Routes.PROSPECT_TRACKER,
    path: "/apps",
    id: 'company-tracker'
  },
  {
    title: "VC Associate — Source Deals Autonomously",
    description:
      "Enter characteristics and precisely comb target websites for relevant investment prospects.",
    imageUrl: AppImage5,
    category: "For Investors",
    categoryValue: "investors",
    path: "/apps",
    id: 'vc-associate'
  },
  {
    title: "Memo Generator — Automate Memo Creation",
    description: "AI-powered investment memo generation. Input decks, files, Q&A, and more.",
    imageUrl: AppImage6,
    category: "For Investors",
    categoryValue: "investors",
    path: "/apps",
    id: 'memo-generator'
  },
  {
    title: "Content Creator — Automate Social Posts",
    description: "AI-powered LinkedIn and Twitter post creation with configurable guardrails.",
    imageUrl: AppImage7,
    category: "For Investors",
    categoryValue: "investors",
    path: "/apps",
    id: 'content-creator'
  },
  {
    title: "Deal Screener — Screen Top of Funnel Autonomously",
    description:
      "Harness Predictive’s proprietary investment framework to score investment prospects and sift from the noise.",
    imageUrl: AppImage8,
    category: "For Investors",
    categoryValue: "investors",
    path: "/apps",
    id: 'deal-screener'
  },
];
