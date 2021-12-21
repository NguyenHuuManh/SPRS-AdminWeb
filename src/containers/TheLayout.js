import { isEmpty, isNull, isUndefined } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { TheContent, TheFooter, TheHeader, TheSidebar } from "./index";

const TheLayout = () => {
  const auth = useSelector((state) => state.authReducer.auth);
  const user = JSON.parse(window.localStorage.getItem("userSPRS"));

  if (auth?.isLogin || (!isEmpty(user) && !isUndefined(user) && !isNull(user))) {

    return (
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
          <TheFooter />
        </div>
      </div>
    );

  }
  return <Redirect to="/login" />;
};

export default TheLayout;
