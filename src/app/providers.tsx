"use client";

import { queryClient } from "@/shared/lib/reactQuery";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider } from "react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
