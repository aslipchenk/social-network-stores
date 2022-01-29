import useAuth from '../../auth/context/use-auth';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import LogoutIcon from '@mui/icons-material/Logout';
import * as React from 'react';

export const LogoutBadge = () => {
  const auth = useAuth();

  const handleClick = () => {
    auth.logout();
  };
  return (
    <IconButton color="inherit" onClick={handleClick}>
      <LogoutIcon />
    </IconButton>
  );
};

export default LogoutBadge;
