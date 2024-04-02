import Head from 'next/head';

type MetaDataProps = {
  title: string;
  description: string;
  keywords: string;
  isRobotsNoIndex?: boolean;
};

const MetaData = ({ title, description, keywords, isRobotsNoIndex = false }: MetaDataProps) => {
  return (
    <Head>
      <title>GGF | {title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      {isRobotsNoIndex && <meta name='robots' content='noindex, nofollow' />}
    </Head>
  );
};

export default MetaData;
