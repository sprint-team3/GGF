import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/apis/queryFunctions';
import { QUERY_KEYS } from '@/apis/queryKeys';

const useUserData = (accessToken: string) => {
  const {
    data: userData,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.users.get, accessToken],
    queryFn: getUser,
    enabled: !!accessToken,
  });

  return { userData, isSuccess, isError };
};

export default useUserData;
