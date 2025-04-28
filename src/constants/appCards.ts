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
    title: "Fund Manager",
    description: "AI-powered fund admin for nimble funds & super angels",
    imageUrl: AppImage1,
    category: "For Investors",
    categoryValue: "investors",
    path: Routes.FUND_MANAGER,
  },
  {
    title: "Limited Partner",
    description:
      "AI-powered control panel for high-performing limited partners ",
    imageUrl: AppImage2,
    category: "For Limited Partners",
    categoryValue: "limited-partners",
    path: Routes.LIMITED_PARTNER_FUNDS,
  },
  {
    title: "Find Intros",
    description:
      "Harness your investor ecosystem to pinpoint customers & request intros",
    imageUrl: AppImage3,
    category: "For Founders",
    categoryValue: "founders",
    path: "/apps",
  },
  {
    title: "Company Tracker",
    description:
      "Input investment prospects and track all relevant updates, in real-time",
    imageUrl: AppImage4,
    category: "For Investors",
    categoryValue: "investors",
    path: Routes.PROSPECT_TRACKER,
  },
  {
    title: "VC Associate",
    description:
      "Enter characteristics and comb target websites for relevant prospects",
    imageUrl: AppImage5,
    category: "For Investors",
    categoryValue: "investors",
    path: "/apps",
  },
  {
    title: "Memo Generator",
    description: "AI-powered investment memo generation",
    imageUrl: AppImage6,
    category: "For Investors",
    categoryValue: "investors",
    path: "/apps",
  },
  {
    title: "Automate Social Media Content Creation",
    description: "AI-powered Linkedin and Twitter post creation",
    imageUrl: AppImage7,
    category: "For Investors",
    categoryValue: "investors",
    path: "/apps",
  },
  {
    title: "AI Powered Investment Scoring",
    description:
      "Harness our proprietary investment rubric to score investment prospect characteristics",
    imageUrl: AppImage8,
    category: "For Investors",
    categoryValue: "investors",
    path: "/apps",
  },
];
