import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

import { RootState } from "../store";
import {
  GetGameByIdResponse,
  GetGamesByNameResponse,
  GetTopGamesResponse,
  SendWhisperData,
} from "./types";
import { setApiToken } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.twitch.tv/helix/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.apiToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Client-Id", import.meta.env.VITE_TWITCH_CLIENT_ID);

    return headers;
  },
});

const apiBaseQuery = fetchBaseQuery({ baseUrl: "http://localhost:3333/" });

interface AuthorizeResponse {
  access_token: string;
}

async function baseQueryWithReauthorization(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const authorizeResult = await apiBaseQuery(
      "/auth/authorize",
      api,
      extraOptions
    );

    if (authorizeResult.data) {
      api.dispatch(setApiToken(authorizeResult.data as AuthorizeResponse));

      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
}

export const twitchApi = createApi({
  reducerPath: "twitchApi",
  baseQuery: baseQueryWithReauthorization,
  endpoints: (builder) => ({
    getTopGames: builder.query<GetTopGamesResponse, void>({
      query: () => "games/top?first=100",
    }),
    getGamesByName: builder.query<GetGamesByNameResponse, string>({
      query: (gameName) => `games?name=${gameName}`,
    }),
    getGameById: builder.query<GetGameByIdResponse, string>({
      query: (id) => `games?id=${id}`,
    }),
    sendWhisper: builder.mutation<void, SendWhisperData>({
      query: ({ authenticatedUserId, targetUserId, message, accessToken }) => ({
        url: `whispers?from_user_id=${authenticatedUserId}&to_user_id=${targetUserId}`,
        method: "POST",
        body: {
          message,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": import.meta.env.VITE_TWITCH_CLIENT_ID,
        },
      }),
    }),
  }),
});

export const {
  useGetTopGamesQuery,
  useGetGamesByNameQuery,
  useGetGameByIdQuery,
  useSendWhisperMutation,
} = twitchApi;
