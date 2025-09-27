/* eslint-disable react-hooks/exhaustive-deps */

// core
import { useEffect } from "react";
import { useSocket } from "@/core/components/providers/socket-io-client";

type UseSocketEventOptions = {
  initial?: () => void;
  onEvent: (...args: any[]) => void;
  event: string;
};

type UseSocketEventResult = void;

const useSocketEvent = ({ event, initial, onEvent }: UseSocketEventOptions): UseSocketEventResult => {
  const { socket } = useSocket();

  useEffect(() => {
    initial?.();
  }, []);

  useEffect(() => {
    function attachEvents() {
      socket.on(event, onEvent);
    }

    function detachEvents() {
      socket.off(event, onEvent);
    }

    attachEvents();
    return () => detachEvents();
  }, []);
};

export default useSocketEvent;
