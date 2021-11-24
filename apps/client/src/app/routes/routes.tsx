import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SignIn from '../auth/auth-login';
import RegistrationForm from '../components/forms/registration/registration-form';
import SendResetPasswordMailForm from '../components/forms/reset-password/send-reset-password-mail-form';
import ResetPasswordForm from '../components/forms/reset-password/reset-password-form';
import ToggleColorMode from '../theme-switcher';
import NavBar from '../components/navbar/navbar';

export const useRoutes = (isAuthenticated: boolean | undefined, accountStatus?: string | undefined) => {
  if (isAuthenticated) {
    if (accountStatus === 'banned') {
      return (
        <Switch>
          <Route path="/">
            <div>Oops Your account was banned</div>
          </Route>
          <Redirect to="/" />
        </Switch>
      )
        ;
    }

    if (accountStatus === 'loginByTemporaryPassword') {
      return (
        <ToggleColorMode>
          <Switch>
            <Route path="/" exact>
              <ResetPasswordForm />
            </Route>
            <Redirect to="/" />
          </Switch>
        </ToggleColorMode>
      );
    }

    if (accountStatus === 'created') {
      return (
        <Switch>
          <Route path="/">
            <div>We send letter to your mail please activate your account</div>
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <>
      <NavBar />
      <Switch>
        <Route path="/about">
          {/*<About />*/}
        </Route>
        <Route path="/users" exact>
          {/*<Users />*/}
        </Route>
        <Route path="/home" exact>
          {/*<Home />*/}
        </Route>
        <Redirect to="/home" />
      </Switch>
        </>
    );
  }

  return (
    <ToggleColorMode>
      <Switch>
        <Route path="/" exact>
          <SignIn />
        </Route>
        <Route path="/reset">
          <SendResetPasswordMailForm />
        </Route>
        <Route path="/registration" exact>
          <RegistrationForm />
        </Route>
        <Redirect to="/" />
      </Switch>
    </ToggleColorMode>
  );
};

export default useRoutes;
// export const Routes = () => {
// export default Routes;
