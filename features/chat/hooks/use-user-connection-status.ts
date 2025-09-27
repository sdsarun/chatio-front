"use client";

// hooks
import useSocketEvent from "@/core/hooks/use-socket-event";

// api
import chatSocketApi from "@/features/chat/services/chat-socket-api";

// constants
import { UserEvent } from "@/features/chat/constants/user-events.constant";
import { UserConnectionStatus } from "@/features/chat/constants/user-connection-status.constant";
import { useEffect, useState } from "react";

// hooks
import useIdle from "@/core/hooks/use-idle";
import { useSocket } from "@/core/components/providers/socket-io-client";
import { useSession } from "next-auth/react";

// types
import type { Session } from "next-auth";
import type { UserConnection } from "@/features/chat/types/get-user-status-by-user-id";

type UseUserConnectionStatusOptions = {
  user: Session["user"];
};

type UseUserConnectionStatusResult = UserConnectionStatus;

const useUserConnectionStatus = ({
  user
}: UseUserConnectionStatusOptions): UseUserConnectionStatusResult => {
  const { data } = useSession();
  const { socket } = useSocket();

  const isAfk = useIdle({ timeout: 1000 * 60 * 15 }); // 15 min to afk

  const currentSignedUser = data?.user;
  const isCurrentUser = user?.id === currentSignedUser?.id;

  const [userConnectionStatus, setUserConnectionStatus] = useState<UserConnectionStatus>(
    UserConnectionStatus.Offline
  );

  useSocketEvent({
    event: UserEvent.GetUserStatusByUserId,
    initial: async () => {
      const { data: userConnection } = await chatSocketApi.getUserStatusByUserId(socket, {
        userId: user?.id || ""
      });
      if (userConnection) {
        setUserConnectionStatus(userConnection.connectionStatus);
      }
    },
    onEvent: (userConnectionStatus: UserConnection) => {
      if (user?.id === userConnectionStatus?.userId) {
        setUserConnectionStatus(userConnectionStatus.connectionStatus);
      }
    }
  });

  useEffect(() => {
    let cancelled = false;
    const updateStatus = async () => {
      try {
        const { data: userConnection } = await chatSocketApi.updateUserConnectionStatus(socket, {
          userId: user?.id ?? "",
          connectionStatus: isAfk ? UserConnectionStatus.AFK : UserConnectionStatus.Online
        });

        if (!cancelled && userConnection?.connectionStatus) {
          setUserConnectionStatus(userConnection.connectionStatus);
        }
      } catch {}
    };

    if (isCurrentUser) {
      updateStatus();
    }
    return () => {
      cancelled = true;
    };
  }, [isAfk, isCurrentUser, socket, user?.id]);

  return userConnectionStatus;
};

export default useUserConnectionStatus;
