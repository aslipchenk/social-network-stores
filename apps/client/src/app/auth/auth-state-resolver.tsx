import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export const AuthStateResolver = (props: any) => {
  switch (props.state) {
    case 'loading':
      return <CircularProgress />;
    case 'ready':
      return props.children;
    case 'error':
      return props.children;
    default:
      return <CircularProgress />;
  }
};

export default AuthStateResolver;
