import useRoutes from './routes/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import useAuth from './auth/context/use-auth';
import * as React from 'react';
import ToggleColorMode from './theme-switcher';
import ConsecutiveSnackbars from './components/alerts/alert-message';
import LinearProgressBar from './components/progress/linear-progress';
import "./main.css"


export function App() {

  const authData = useAuth();
  const routes = useRoutes(authData.isAuthenticated, authData.data.status);

  return (
    // <ToggleColorMode>
      <Router>
        <ConsecutiveSnackbars>
          <LinearProgressBar>
            {routes}
          </LinearProgressBar>
        </ConsecutiveSnackbars>
      </Router>
    // </ToggleColorMode>
  );
}

export default App;
