import { CreatePageContentProps } from '@/pages/[game]/create';

import PostForm from '@/components/createPage/PostForm';
import Banner from '@/components/layout/Banner';

const CreatePageContent = ({ category }: CreatePageContentProps) => {
  return (
    <>
      <Banner />
      <PostForm type='등록' category={category} />
    </>
  );
};

export default CreatePageContent;
