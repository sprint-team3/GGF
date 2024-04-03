import { useRouter } from 'next/router';

const useRouteToPage = () => {
  const router = useRouter();

  const redirectToPage = (path: string) => {
    router.push(path);
  };

  const navigateBack = () => {
    router.back();
  };

  const reloadPage = () => {
    router.reload();
  };

  return { redirectToPage, navigateBack, reloadPage };
};

export default useRouteToPage;
