import { useQuery } from '@tanstack/react-query';

import { getMyNotifications } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';
import { getCSRCookie } from '@/utils';

const useAlarmData = () => {
  const { accessToken } = getCSRCookie();
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
