import React, { Suspense, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes from "../routes";
import PrivateRoute from "src/views/PrivateRoute";
import { useDispatch } from "react-redux";
import { isEmpty, isNull, isUndefined } from "lodash";
import { getProfileRequest } from "src/redux/modules/profile";
import httpServices from "src/services/httpServices";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = () => {
  const user = JSON.parse(window.localStorage.getItem("userSPRS"));
  const menu = JSON.parse(localStorage.getItem('menu'));
  const history = useHistory();
  const distpatch = useDispatch();
  let arrtemp = [];
  const loopMap = (array) => {
    array.forEach(element => {
      if (isEmpty(element.children)) {
        arrtemp.push(element.to);
      } else {
        loopMap(element.children)
      }
    });
    return arrtemp;
  }
  const navi_menu = isNull(menu) ? [] : loopMap(menu);

  useEffect(() => {
    if (!isEmpty(user) && !isUndefined(user) && !isNull(user)) {
      httpServices.attachTokenToHeader(user);
      distpatch(getProfileRequest());
    }
  }, []);

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <PrivateRoute
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />

                )
              );
            })}
            {!isEmpty(navi_menu) && (
              <Redirect from="/" to={navi_menu.includes('/dashboard') ? '/dashboard' : '/dashboard-org'} />
              // <Redirect to={navi_menu.includes('/dashboard') ? '/dashboard' : '/dashboard-org'} />
            )}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

// export default React.memo(TheContent);
export default TheContent;
