import React from "react";
import QueryProvider from "@/core/components/providers/query";
import ThemeProvider from "@/core/components/providers/theme";
import { SessionProvider } from "next-auth/react";
import SocketIOClientProvider from "@/core/components/providers/socket-io-client";
import { Toaster } from "@/core/components/ui/sonner";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryProvider>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SocketIOClientProvider>{children}</SocketIOClientProvider>
          <Toaster position="top-center" />
        </ThemeProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
