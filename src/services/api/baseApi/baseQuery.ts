// api/baseQueryWithReauth.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from '@redux/store';
import { removeUser } from '@redux/slices/user';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL_DEV,
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
