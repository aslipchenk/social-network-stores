import { useEffect, useState } from 'react';
import Constants from '../auth/config/constants';

interface httpInterface {
  state: string,
  data: object,
  status?: number
  isAuthenticated?: boolean,
}

export const useHttp = (method = 'Get', useCase = '', body = '', headers = { 'Content-Type': 'application/json' }) => {
  const initialState: httpInterface = {
    state: 'loading',
    data: {}
  };
  const [responseData, setResponseData] = useState(initialState);
  useEffect(() => {
    (async function() {
      try {
        const response = await fetch(`${Constants.server}/${useCase}`, {
          method,
          body,
          headers,
          credentials: 'include'
        });
        if (!response.ok)
          setResponseData({ state: 'error', data: {}, status: response.status, isAuthenticated: false });
        else
          setResponseData({ state: 'ready', data: response, isAuthenticated: true });
      } catch (e) {
        setResponseData({ state: 'error', data: {} });
      }
    })();
  }, []);

  return responseData;
};

export default useHttp;
