import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import MuiLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useAuth from './context/use-auth';
import { useAlert } from '../components/alerts/alert-message';
import { useProgressBar } from '../components/progress/linear-progress';


export default function AuthLogin() {
  const auth = useAuth();
  const alert = useAlert();
  const progress = useProgressBar();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //todo fix this auth login
    progress.toggleProgressBar();
    if (auth.login) {
      try {
        await auth.login({
          email: data.get('email'),
          password: data.get('password')
        });
      } catch (e) {
        alert.showAlert(e.response.data.message);
      } finally {
        progress.toggleProgressBar();
      }
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
          Sign in
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <MuiLink variant="body2">
                <Link to="/reset">
                  Forgot password?
                </Link>
              </MuiLink>
            </Grid>
            <Grid item>
              <MuiLink variant="body2">
                <Link to="/registration">
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </MuiLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
