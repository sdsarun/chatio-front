import { publicEnv } from "@/core/constants/env";
import fetcherFactory from "@/core/utils/common/fetcher";

export const googleOAuthApi = fetcherFactory("https://oauth2.googleapis.com");
export const chatioGraphQLApi = fetcherFactory(publicEnv.hostChatioBackend, {
  defaultHeaders: {
    'Content-Type': 'application/json',
    Accept: 'application/graphql-response+json'
  }
});
export const chatioRestApi = fetcherFactory(publicEnv.hostChatioBackend);