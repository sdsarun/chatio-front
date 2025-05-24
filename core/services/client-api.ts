import ClientEnv from "@/core/configs/client-env";
import fetcherFactory from "@/core/utils/common/fetcher";

export const googleOAuthApi = fetcherFactory("https://oauth2.googleapis.com");
export const chatioGraphQLApi = fetcherFactory(ClientEnv.hostChatioBackend, {
  defaultHeaders: {
    'Content-Type': 'application/json',
    Accept: 'application/graphql-response+json'
  }
});