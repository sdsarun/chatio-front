"use client"

// core
import { useEffect, useState } from 'react';
import { useSocket } from '@/core/components/providers/socket-io-client';
import { useRouter } from 'next/navigation';

// components
import { Button } from '@/core/components/ui/button';
import { MessagesSquare } from 'lucide-react';

// constants
import { ChatEvent } from '@/features/chat/constants/chat-events';

// types
import type { MatchingStrangerResponse } from '@/features/chat/types/matching';

type MatchingChatProps = any;

type MatchingStatus = "idle" | "matching" | "matched"

export default function MatchingChat({ }: MatchingChatProps) {
  const router = useRouter();
  const { socket } = useSocket();

  const [matchingStatus, setMatchingStatus] = useState<MatchingStatus>("idle");

  useEffect(() => {
    function onMatchedStranger({ status, conversation }: MatchingStrangerResponse) {
      setMatchingStatus(status as MatchingStatus);
      router.replace(`/c/${conversation.id}`);
    }

    function attachEvents() {
      socket.on(ChatEvent.MatchedStranger, onMatchedStranger);
    }

    function detachEvents() {
      socket.off(ChatEvent.MatchedStranger, onMatchedStranger);
    }

    attachEvents();
    return () => detachEvents();
  }, [socket, router]);

  return (
    <section>
      <Button
        className='h-14 w-80 text-lg'
        onClick={async () => {
          setMatchingStatus("matching");
          const response = await socket.emitWithAck(ChatEvent.MatchingStranger) as Pick<MatchingStrangerResponse, "status">;
          setMatchingStatus(response?.status as MatchingStatus);
        }}
        isLoading={matchingStatus === "matching"}
      >
        <MessagesSquare />
        Spin the Stranger!
      </Button>
    </section>
  )
}
