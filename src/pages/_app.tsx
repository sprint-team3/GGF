import type { AppProps } from 'next/app';
import '@/styles/base/common.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
