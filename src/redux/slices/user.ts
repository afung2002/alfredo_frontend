import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppType } from '../../types';

interface User {
  jwtToken: string;
  refreshToken: string;
}



interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  savedApps: AppType[] | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  savedApps: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    addAppToUser: (state, action: PayloadAction<{ title: string; description: string; imageUrl: string; categoryValue: string; category: string; path: string }>) => {
      if (state.savedApps) {
        if (!state.savedApps.find((app) => app.title === action.payload.title)) {
          state.savedApps.push(action.payload);
        } else {
          state.savedApps = state.savedApps.filter((app) => app.title !== action.payload.title);
        }
      } else {
        state.savedApps = [action.payload];
      }
    }
  },
});

export const { setUser, removeUser, addAppToUser } = userSlice.actions;
export default userSlice.reducer;