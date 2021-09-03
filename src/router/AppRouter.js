import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoutes';
import { PublicRoute } from './PublicRoutes';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);
  if (checking) {
    return (<h4>Espere...</h4>);
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            isAuthenticated={!!uid}
            path="/login"
            component={LoginScreen}
          />
          <PrivateRoute
            isAuthenticated={!!uid}
            exact
            path="/"
            component={CalendarScreen}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}
