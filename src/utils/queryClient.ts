import { QueryClient } from '@tanstack/react-query';

import { QUERY_CLIENT_STALE_TIME } from '@/constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CLIENT_STALE_TIME,
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      retry: false,
    },
  },
});
