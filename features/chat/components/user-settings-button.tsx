"use client";

// core
import { useState } from "react";

// components
import { Button } from "@/core/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/core/components/ui/tooltip";
import { Settings } from "lucide-react";
import { UserSettingsDrawerDialog } from "@/features/chat/components/user-settings";

// types
import type { Session } from "next-auth";

interface UserSettingsButtonProps {
  user: Session["user"]; // replace with your User type
}

export default function UserSettingsButton({ user }: UserSettingsButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(true)}>
          <Settings />
        </Button>
      </TooltipTrigger>
      <TooltipContent>User Settings</TooltipContent>
      <UserSettingsDrawerDialog
        user={user}
        drawerDialogRootProps={{ open: isDialogOpen, onOpenChange: setIsDialogOpen }}
      />
    </Tooltip>
  );
}
