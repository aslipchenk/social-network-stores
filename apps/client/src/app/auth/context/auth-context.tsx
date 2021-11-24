import React from 'react';

interface authDataInterface {
  email?: string,
  firstName?: string,
  id?: string,
  lastName?: string,
  status?: string,
}

interface AuthContextInterface {
  state: string,
  data: authDataInterface,
  status?: number
  isAuthenticated?: boolean,
  login: (dtoIn: any) => any,
  logout: () => any,
  registration: (dtoIn: any) => any,
  sendResetPasswordMail: (dtoIn: any) => any,
  resetPassword: (dtoIn: any) => any,
}

const value: AuthContextInterface = {
  state: '',
  data: {},
  login: () => {
  },
  logout: () => {
  },
  registration: () => {
  },
  sendResetPasswordMail: () => {
  },
  resetPassword: () => {
  }
};

const context = React.createContext(value);

export { context };
export default context;
