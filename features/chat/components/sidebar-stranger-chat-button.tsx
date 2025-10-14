"use client";

// core
import { usePathname, useRouter } from "next/navigation";

// components
import { Button } from "@/core/components/ui/button";
import { Separator } from "@/core/components/ui/separator";
import { MessageSquareText } from "lucide-react";

export default function SidebarStrangerChatButton() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNewChat = () => {
    if (pathname !== "/c/new") {
      router.push(`/c/new`);
    }
  };

  return (
    <section className="flex flex-col gap-2">
      <Button
        className="w-full flex items-center justify-start"
        variant="secondary"
        size="lg"
        onClick={handleNewChat}
      >
        <MessageSquareText />
        New Chat
      </Button>
      <Separator contentClassName="text-sm font-bold">Direct Messages</Separator>
    </section>
  );
}
