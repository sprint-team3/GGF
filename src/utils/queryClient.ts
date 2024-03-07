import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 & (60 * 30),
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      retry: false,
    },
  },
});
