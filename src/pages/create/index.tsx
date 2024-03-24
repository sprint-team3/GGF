import Banner from '@/components/layout/Banner';
import Layout from '@/components/layout/Layout';
import PostForm from '@/components/layout/postForm/PostForm';

const CreatePage = () => {
  return (
    <>
      <Banner gameName='BATTLEGROUNDS' />
      <PostForm type='등록' category='스포츠' />
    </>
  );
};

export default CreatePage;

CreatePage.FullLayout = Layout;
