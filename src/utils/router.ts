import Router from 'next/router';

export const replaceToPage = (path: string) => {
  Router.replace(path);
};

export const redirectToPage = (path: string) => {
  if (typeof window !== 'undefined') {
    Router.push(path);
  } else {
    console.error('Cannot redirect on server side');
  }
};

export const navigateBack = () => {
  Router.back();
};
