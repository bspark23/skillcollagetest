'use client';

import { ReduxProvider } from './redux-provider';
import { ThemeProvider } from './theme-provider';
import { AuthProvider } from './auth-provider';
import { ContentProvider } from './content-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute='class' defaultTheme="light" enableSystem={false}>
        <AuthProvider>
          <ContentProvider>
            {children}
          </ContentProvider>
        </AuthProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
