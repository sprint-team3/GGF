import { useQuery } from '@tanstack/react-query';

import { getActivities } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { ListPageProps } from '@/pages/[game]';

import Banner from '@/components/layout/Banner';
import PostList from '@/components/listPage/PostList';

const ListPageContent = ({ category, isLoggedIn }: ListPageProps) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.activities.getList, category],
    queryFn: getActivities,
  });

  if (!data) return;

  return (
    <>
      <Banner />
      <PostList isLoggedIn={isLoggedIn} activitiesData={data.activities} />
    </>
  );
};

export default ListPageContent;
