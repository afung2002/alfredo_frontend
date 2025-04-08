import { RootState } from '../store';

export const selectUserApps = (state: RootState) => state.user.savedApps;