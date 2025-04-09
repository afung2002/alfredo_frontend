import { RootState } from '../store';

export const selectUserApps = (state: RootState) => state.user.savedApps;

export const selectUserInvestments = (state: RootState) => state.user.investments;