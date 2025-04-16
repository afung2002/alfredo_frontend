// api/baseQueryWithReauth.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from '@redux/store';
import { removeUser, setUser } from '@redux/slices/user';
import { setToken } from '../../../redux/slices/configs';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).configs.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    // 🔁 Handle token refresh or other side-effect
    const token = await window.Clerk?.session?.getToken();
    console.log('Token:', token); // Log the token for debugging
    if (token) {
      api.dispatch(setToken(token)); // Dispatch the new token to the store
    } else {
      api.dispatch(removeUser()); // Remove user if token is not available
    }
    console.warn('403 detected — attempting token refresh or logout');

    // Example: call your refreshToken logic or dispatch logout
    // await refreshToken(); or:
    api.dispatch(removeUser()); // optional

    // Optionally retry the original query:
    // const newToken = await getNewToken(); // your logic here
    // api.dispatch(setToken(newToken));
    // result = await baseQuery(args, api, extraOptions);
  }

  return result;
};
