import { useQuery } from '@tanstack/react-query';

import Activities from '@/apis/activities';
import { QUERY_KEYS } from '@/apis/queryKeys';

type useGetScheduleListProps = {
  activityId: number;
  year: string;
  month: string;
};

export const useGetScheduleList = ({ activityId, year, month }: useGetScheduleListProps) => {
  const { data: initialScheduleData, isSuccess } = useQuery({
    queryKey: QUERY_KEYS.activities.getScheduleList(activityId, year, month),
    queryFn: () => Activities.getScheduleList({ activityId, year, month }),
  });

  return { initialScheduleData, isSuccess };
};
