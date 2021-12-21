import CIcon from "@coreui/icons-react";
import {
  CBreadcrumbRouter, CHeader, CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader, CToggler
} from "@coreui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sidebarShow } from "src/redux/modules/sidebar";
// routes config
import routes from "../routes";
import {
  TheHeaderDropdown
} from "./index";



const TheHeader = () => {
  const dispatch = useDispatch();
  const sideBarReducer = useSelector((state) => state.sideBarReducer);
  console.log("sideBar", sideBarReducer);
  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sideBarReducer?.status)
      ? false
      : "responsive";
    dispatch(sidebarShow(val));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sideBarReducer?.status)
      ? true
      : "responsive";
    dispatch(sidebarShow(val));
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
