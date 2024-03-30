import Echo from '@/components/landing/Echo';
import Layout from '@/components/layout/Layout';

const LandingPage = () => {
  return (
    <div>
      <Echo />
    </div>
  );
};

export default LandingPage;

LandingPage.FullLayout = Layout;
