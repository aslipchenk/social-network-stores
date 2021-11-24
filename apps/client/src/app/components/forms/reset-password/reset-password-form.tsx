import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useAuth from '../../../auth/context/use-auth';
import { useAlert } from '../../alerts/alert-message';
import { useProgressBar } from '../../progress/linear-progress';


export default function ResetPasswordForm() {
  const auth = useAuth();
  const alert = useAlert();
  const progress = useProgressBar();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (password !== confirmPassword) {
      return alert.showAlert('Passwords are not equal');
    }
    progress.toggleProgressBar();

    try {
      await auth.resetPassword({
        password: data.get('password')
      });
    } catch (e) {
      return alert.showAlert(e.response.data.message);
    } finally {
      progress.toggleProgressBar();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoFocus
          />
          <TextField
            type="password"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
