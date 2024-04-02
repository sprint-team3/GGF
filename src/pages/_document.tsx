import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { DEFAULT_META_DATA } from '@/constants';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <link rel='canonical' href={DEFAULT_META_DATA.siteUrl} key='canonical' />
        <title>{DEFAULT_META_DATA.title}</title>
        <meta name='description' content={DEFAULT_META_DATA.description} />
        <meta name='keywords' content={DEFAULT_META_DATA.keywords} />
        <meta name='robots' content='index, follow' />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='GGF' />
        <meta property='og:title' content={DEFAULT_META_DATA.title} />
        <meta property='og:description' content={DEFAULT_META_DATA.ogDescription} />
        <meta property='og:locale' content='ko_KR' />
        <meta property='og:url' content={DEFAULT_META_DATA.siteUrl} />
        <meta property='og:image' content={DEFAULT_META_DATA.imageUrl} />
        <meta property='og:image:secure_url' content={DEFAULT_META_DATA.imageUrl} />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:width' content={DEFAULT_META_DATA.ogImageWidth} />
        <meta property='og:image:height' content={DEFAULT_META_DATA.ogImageHeight} />
        <meta property='og:image:alt' content={DEFAULT_META_DATA.ogImageAlt} />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={DEFAULT_META_DATA.siteUrl} />
        <meta name='twitter:title' content={DEFAULT_META_DATA.title} />
        <meta name='twitter:description' content={DEFAULT_META_DATA.ogDescription} />
        <meta name='twitter:image' content={DEFAULT_META_DATA.twitterImageUrl} />
      </Head>

      <body>
        <Main />
        <NextScript />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&libraries=services,clusterer&autoload=false`}
          strategy='beforeInteractive'
        />
      </body>
    </Html>
  );
}
