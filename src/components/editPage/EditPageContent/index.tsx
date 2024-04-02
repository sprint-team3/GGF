import { useQuery } from '@tanstack/react-query';

import { getActivityDetail } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { EditPageContentProps } from '@/pages/[game]/edit/[activityId]';

import EditForm from '../EditForm';

import Banner from '@/components/layout/Banner';

const EditPageContent = ({ activityId, category }: EditPageContentProps) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.activities.get, activityId],
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
