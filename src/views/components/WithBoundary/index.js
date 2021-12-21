import { isEmpty, isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { RouteBase } from "src/constrants/routeBaseUrl";
import ErrorBoundary from "../ErrorBoundary";

const specialLink = [
    RouteBase.Home,
    RouteBase.Profile,
    // RouteBase.CreateEvent,
    // RouteBase.EventManagement,
    // RouteBase.EventAssign,
    RouteBase.UpdatePassword,
];

const NoPermission = (props) => {
    useEffect(() => {
        // dispatch(getUserRequest());
        document.body.classList.remove("bg-login");
        document.body.classList.add("bg-home-index");
        return () => {
            document.body.classList.remove("bg-home-index");
        };
    }, []);
    return <div>Tài khoản của bạn không có quyền xem chức năng này</div>;
};


const menu = JSON.parse(localStorage.getItem('menu'));

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
const withErrorBoundary = (BaseComponent) => {
    return (props) => {
        const [state, setState] = useState({
            loading: true,
            havePermission: false,
        });
        const urlPath = window.location.hash;
        // console.log(urlPath, "urlPath");
        useEffect(() => {
            // get permission menu
            // const menu = getLocalMenu();
            const stringMenu = JSON.stringify(navi_menu);
            // get url
            const splitUrl = urlPath.split("/");
            // create url after split
            const reCreateUrl = `/${splitUrl?.[1] || ""}`;
            let sliceUrl = reCreateUrl;
            // check have search params
            if (urlPath.includes("?")) {
                // remove search params
                sliceUrl = reCreateUrl.split("?")?.[0];
            }

            // check permission view page
            // console.log(navi_menu.includes(sliceUrl), 'stringMenu.includes(sliceUrl)')
            if (navi_menu.includes(sliceUrl) || specialLink.includes(sliceUrl)) {
                // have permission view page
                setState({ loading: false, havePermission: true });
            } else {
                // no permission view page
                setState({ loading: false, havePermission: false });
            }
        }, [urlPath]);

        // while loading permission
        if (state.loading) {
            return null;
        }
        // while loaded permission
        if (state.havePermission) {
            // have permission view page
            return (
                <ErrorBoundary>
                    <BaseComponent {...props} />
                </ErrorBoundary>
            );
        } else {
            // no permission view page
            return <NoPermission />;
        }
    };
};

export default withErrorBoundary;
