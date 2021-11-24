import { useEffect, useState } from 'react';
import Constants from '../auth/config/constants';

interface httpInterface {
  state: string,
  data: object,
  status?: number
  isAuthenticated?: boolean,
}

export const useDataLoad = (fetchCallback: any) => {
  const initialState: httpInterface = {
    state: Constants.HTTP_STATES.loading,
    data: {}
  };
  const [responseData, setResponseData] = useState(initialState);

  useEffect(() => {
    (async function() {
      try {
        const response = await fetchCallback();
        setResponseData({ state: Constants.HTTP_STATES.ready, data: response.data, isAuthenticated: true });
      } catch (e) {
        setResponseData({ state: Constants.HTTP_STATES.error, data: {} });
      }
    })();
  }, []);

  return responseData;
};

export default useDataLoad;
