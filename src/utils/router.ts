import Router from 'next/router';

export const replaceToPage = (path: string) => {
  Router.replace(path);
};

export const redirectToPage = (path: string) => {
  Router.push(path);
};
