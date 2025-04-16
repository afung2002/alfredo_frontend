import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigsState {
  token: string | null;
}
const initialState: ConfigsState = { token: null };

const configsSlice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
});

export const { setToken } = configsSlice.actions;
export default configsSlice.reducer;