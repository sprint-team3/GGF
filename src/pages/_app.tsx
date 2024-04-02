import type { AppProps } from 'next/app';

import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Modal from 'react-modal';

import '@/styles/base/common.scss';
import { queryClient } from '@/utils';

import EmptyLayout from '@/components/layout/empty/EmptyLayout';
import FullLayout from '@/components/layout/FullLayout';

Modal.setAppElement('#__next');

type ComponentType<P = object> = React.FC<P> & {
  FullLayout: React.ComponentType<P>;
};

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Component as ComponentType).FullLayout || EmptyLayout;

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <FullLayout>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FullLayout>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
