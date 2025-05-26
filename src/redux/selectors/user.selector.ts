import { RootState } from '../store';

export const selectUserApps = (state: RootState) => state.user.savedApps;

export const selectUserInvestments = (state: RootState) => state.user.investments;

export const selectUserTicket = (state: RootState) => state.user.ticket;
export const selectUserInvitationId = (state: RootState) => state.user.invitationId;
