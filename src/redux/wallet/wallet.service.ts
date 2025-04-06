import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { WalletResponse } from "./types";

const baseUrl = import.meta.env.VITE_API_AUTH_BASE_URL;
export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getWallet: build.query<WalletResponse, null>({
      query: () => `/wallet`,
    }),
  }),
});

export const { useGetWalletQuery } = walletApi;
