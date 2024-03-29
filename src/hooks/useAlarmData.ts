import { useQuery } from '@tanstack/react-query';

import { getMyNotifications } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';

const useAlarmData = (accessToken: string) => {
  const {
    data: alarmData,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.myNotifications.get],
    queryFn: getMyNotifications,
    enabled: !!accessToken,
  });

  return { alarmData, isSuccess, isError };
};

export default useAlarmData;
