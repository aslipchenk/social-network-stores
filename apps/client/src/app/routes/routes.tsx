import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SignIn from '../auth/auth-login';
import RegistrationForm from '../components/forms/registration/registration-form';
import SendResetPasswordMailForm from '../components/forms/reset-password/send-reset-password-mail-form';
import ResetPasswordForm from '../components/forms/reset-password/reset-password-form';
import ToggleColorMode from '../theme-switcher';
import NavBar from '../components/navbar/navbar';
import PeoplesList from '../components/peoples/peoples-list';
import Home from '../components/home/home';

export const useRoutes = (
  isAuthenticated: boolean | undefined,
  accountStatus?: string | undefined
) => {
  if (isAuthenticated) {
    if (accountStatus === 'banned') {
      return (
        <Switch>
          <Route path="/">
            <div>Oops Your account was banned</div>
          </Route>
          <Redirect to="/" />
        </Switch>
      );
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
      <NavBar>
        <Switch>
          <Route path="/about">{/*<About />*/}</Route>
          <Route path="/news">{/*<About />*/}</Route>
          <Route path="/friends" exact>
            {/*<Users />*/}
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/messages" exact>
            {/*<Home />*/}
          </Route>
          <Route path="/music" exact>
            {/*<Home />*/}
          </Route>
          <Route path="/videos" exact>
            {/*<Home />*/}
          </Route>
          <Route path="/settings" exact>
            {/*<Home />*/}
          </Route>
          <Route path="/applications" exact>
            {/*<Home />*/}
          </Route>
          <Route path="/peoples" exact>
            <PeoplesList />
          </Route>
          <Redirect to="/home" />
        </Switch>
      </NavBar>
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
