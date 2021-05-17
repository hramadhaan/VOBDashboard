import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthLayout from "./Auth";
import AdminLayout from "./Admin";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const App = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(authActions.authCheckState());
  }, [dispatch]);

  let render = (
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin" />
    </Switch>
  );

  if (!auth.authenticated && !auth.loading) {
    render = (
      <Switch>
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="/" to="/auth" />
      </Switch>
    );
  }

  return <div>{render}</div>;
};

export default App;
