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
import { useHistory } from 'react-router-dom';
import { useAlert } from '../../alerts/alert-message';
import { useProgressBar } from '../../progress/linear-progress';


export default function SendResetPasswordMailForm() {
  const auth = useAuth();
  const alert = useAlert();
  const history = useHistory();
  const progress = useProgressBar();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    progress.toggleProgressBar();
    try {
      await auth.sendResetPasswordMail({
        email: data.get('email')
      });
    } catch (e) {
      return alert.showAlert(e.response.data.message);
    } finally {
      progress.toggleProgressBar();
    }
    alert.showAlert('We are sent to your email temporary password.');
    history.push('/');
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
