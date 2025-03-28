import React from "react";
import QueryProvider from "@/core/components/providers/query";
import ThemeProvider from "@/core/components/providers/theme";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
