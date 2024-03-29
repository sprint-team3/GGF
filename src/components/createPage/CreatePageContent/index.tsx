import { CreatePageContentProps } from '@/pages/[game]/create';

import PostForm from '@/components/createPage/PostForm';
import Banner from '@/components/layout/Banner';

const CreatePageContent = ({ gameName, category }: CreatePageContentProps) => {
  return (
    <>
      <Banner gameName={gameName} />
      <PostForm type='등록' category={category} />
    </>
  );
};

export default CreatePageContent;
