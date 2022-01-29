import useAuth from '../auth/context/use-auth';
import { useCallback, useEffect, useState } from 'react';

export const useLongPoll = (pollCallback: any) => {
  const auth = useAuth();
  const [data, setData] = useState(null as any);

  const poll = useCallback(() => {
    pollCallback()
      .then((data: any) => {
        setData(data);
        poll();
      })
      .catch(() => setTimeout(() => poll(), 10000));
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      poll();
    }
  }, [auth.isAuthenticated]);

  return data?.data;
};
