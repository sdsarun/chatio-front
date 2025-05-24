import ClientEnv from "@/core/configs/client-env";
import ServerEnv from "@/core/configs/server-env";
import fetcherFactory from "@/core/utils/common/fetcher";

export const chatioRestApi = fetcherFactory(ClientEnv.hostChatioBackend, {
  defaultHeaders: {
    "public-api-key": ServerEnv.publicApiKey,
  }
});