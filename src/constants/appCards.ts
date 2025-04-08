import AppImage1 from '@assets/appImage1.svg';
import AppImage2 from '@assets/appImage2.svg';
import AppImage3 from '@assets/appImage3.svg';
import AppImage4 from '@assets/appImage4.svg';
import AppImage5 from '@assets/appImage5.svg';
import AppImage6 from '@assets/appImage6.svg';
import { Routes } from '@constants/routes';

export const APP_CARDS = [
  {
    title: 'Fundmanager.ai',
    description: 'AI-powered fund admin for nimble funds & super angels',
    imageUrl: AppImage1,
    category: 'For Investors',
    categoryValue: 'investors',
    path: Routes.FUND_MANAGER,
  },
  {
    title: 'Limitedpartner.ai',
    description: 'AI-powered control panel for high-performing limited partners ',
    imageUrl: AppImage2,
    category: 'For Limited Partners',
    categoryValue: 'limited-partners',
    path: '/pitch-deck-analyzer',
  },
  {
    title: 'Findintros.ai',
    description: 'Harness your investor ecosystem to pinpoint customers & request intros',
    imageUrl: AppImage3,
    category: 'For Founders',
    categoryValue: 'founders',
    path: '/lp-portfolio-insights',
  },
  {
    title: 'Companytracker.ai',
    description: 'Input investment prospects and track all relevant updates, in real-time',
    imageUrl: AppImage4,
    category: 'For Investors',
    categoryValue: 'investors',
    path: '/lp-portfolio-insights',
  },
  {
    title: 'VCassociate.ai',
    description: 'Enter characteristics and comb target websites for relevant prospects',
    imageUrl: AppImage5,
    category: 'For Investors',
    categoryValue: 'investors',
    path: '/lp-portfolio-insights',
  },
  {
    title: 'Memogenerator.ai',
    description: 'AI-powered investment memo generation',
    imageUrl: AppImage6,
    category: 'For Investors',
    categoryValue: 'investors',
    path: '/lp-portfolio-insights',
  },
];