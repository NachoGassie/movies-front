'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Provider({children}: {children: React.ReactNode}){
  const [queryClient] = useState(
    () => new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 24 * 60 * 60 * 1000, // 24 horas
            // refetchInterval: 6*1000,
            retry: 1 // default 3
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      { children }
    </QueryClientProvider>
  );

}

