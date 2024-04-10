import { useQuery } from '@tanstack/react-query';

import { getActivityDetail } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { EditPageContentProps } from '@/pages/[game]/edit/[postId]';

import EditForm from '../EditForm';

import Banner from '@/components/layout/Banner';

const EditPageContent = ({ postId, category }: EditPageContentProps) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.activities.get, postId],
    queryFn: getActivityDetail,
  });

  if (!data) return;

  return (
    <>
      <Banner />
      <EditForm category={category} activityDetailData={data} />
    </>
  );
};

export default EditPageContent;
