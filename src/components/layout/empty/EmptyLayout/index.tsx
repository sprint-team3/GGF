import { ReactNode } from 'react';

type EmptyLayoutProps = {
  children: ReactNode;
};

const EmptyLayout = ({ children }: EmptyLayoutProps) => {
  return <>{children}</>;
};

export default EmptyLayout;
