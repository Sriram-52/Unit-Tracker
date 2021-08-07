import { Backdrop } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { onAuthStateChanged } from "../../middleware/auth";
import Departments from "../Departments";
import Subjects from "../Subjects";
import Units from "../Units";
import Topics from "../Topics";
import Login from "../Login";
import SignUp from "../SignUp";

export default function App() {
  const { user, isLoading } = useSelector((state) => state.auth.login);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onAuthStateChanged());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Backdrop open={isLoading} />;

  if (user === null) {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/" component={Departments} />
        <Route exact path="/subjects/:deptId" component={Subjects} />
        <Route exact path="/units/:deptId/:subjectId" component={Units} />
        <Route
          exact
          path="/topics/:deptId/:subjectId/:unitId"
          component={Topics}
        />
      </Switch>
    );
  }
}
