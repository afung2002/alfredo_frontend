import { RootState } from '../store';

export const selectConfigs = (state: RootState) => state.configs;

export const selectToken = (state: RootState) => state.configs.token;