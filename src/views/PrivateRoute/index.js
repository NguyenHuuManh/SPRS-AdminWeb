import { isEmpty, isNull, isUndefined } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  const auth = useSelector((state) => state.authReducer.auth);
  const user = JSON.parse(window.localStorage.getItem("userSPRS"));

  // Render
  console.log('isAuthen', auth?.isLogin || (!isEmpty(user) && !isUndefined(user) && !isNull(user)));
  if (auth?.isLogin || (!isEmpty(user) && !isUndefined(user) && !isNull(user))) {
    // httpServices.attachTokenToHeader(user)
    return <Route {...props} />;
  }

  return <Redirect to="/login" />;
};

export default PrivateRoute;
