'use client'

import { queryClient } from '@/utils/react-query-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
