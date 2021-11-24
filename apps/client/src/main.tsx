import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './app/auth/auth-provider';
import AuthContext from './app/auth/context/auth-context';

import App from './app/app';
import AuthStateResolver from './app/auth/auth-state-resolver';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AuthContext.Consumer>
          {(data) => {
            return <AuthStateResolver state={data.state}><App /></AuthStateResolver>;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
