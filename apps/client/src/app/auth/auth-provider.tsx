import React, { useEffect, useReducer } from 'react';
import AuthContext from './context/auth-context';
import Constants from './config/constants';
import AuthService from '../services/auth-service';
import useDataLoad from '../hooks/use-data-load';

const ACTION_TYPES = {
  login: 'login',
  getData: 'getData',
  registration: 'registration',
  logout: 'logout',
  resetPassword: 'resetPassword'
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.getData:
      return { ...state, ...action.data, isAuthenticated: action.isAuthenticated };
    case ACTION_TYPES.login:
      return { ...state, data: { ...state.data, ...action.data }, isAuthenticated: true };
    case ACTION_TYPES.registration:
      return { ...state, data: { ...state.data, ...action.data }, isAuthenticated: true };
    case ACTION_TYPES.logout:
      return { ...state, isAuthenticated: false };
    case ACTION_TYPES.resetPassword:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

const AuthProvider = (props: any) => {

    const data = useDataLoad(AuthService.authMe);

    useEffect(() => {
      dispatch({
        type: ACTION_TYPES.getData,
        data: { ...data },
        isAuthenticated: data.state === Constants.HTTP_STATES.ready
      });
    }, [data.state]);

    const [state, dispatch] = useReducer(reducer, data);

    const login = async (dtoIn: any) => {
      const response = await AuthService.login(dtoIn);
      return dispatch({ type: ACTION_TYPES.login, data: response.data });
    };

    const registration = async (dtoIn: any) => {
      const response = await AuthService.registration(dtoIn);
      return dispatch({ type: ACTION_TYPES.registration, data: response.data });
    };

    const logout = async () => {
      const response = await AuthService.logout();
      return dispatch({ type: ACTION_TYPES.logout, data: response.data });
    };

    const sendResetPasswordMail = async (dtoIn: any) => {
      await AuthService.sendResetPasswordMail(dtoIn);
    };
    const resetPassword = async (dtoIn: any) => {
      await AuthService.resetPassword({ ...dtoIn, userId: state.id });
      return dispatch({ type: ACTION_TYPES.resetPassword, data: { status: 'active' } });
    };

    return <AuthContext.Provider
      value={{
        ...state,
        login,
        registration,
        logout,
        sendResetPasswordMail,
        resetPassword
      }}>{props.children}</AuthContext.Provider>;
  }
;

export { AuthProvider };
export default AuthProvider;
