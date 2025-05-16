// services/baseQueryWithReauth.ts
import { fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setToken } from '@redux/slices/configs'; // adjust path if needed
import { getClerkToken } from '@utils/index'; // you’ll create this next

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).configs.token;
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);
  console.log('result', result);
  if (result.error && (result.error.status === 401)) {
    console.log('401 detected — attempting token refresh or logout');
    try {
      const token = await getClerkToken('access_token'); // Adjust the template as needed
      console.log('token', token);
      if (token) {
        api.dispatch(setToken(token))
        console.log('api.dispatch(setToken(token))');
        result = await rawBaseQuery(args, api, extraOptions); // retry
        console.log('result', result);
      }
    } catch (e) {
      console.error('Token refresh failed', e);
    }
  }
  return result
};
