import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import * as type from "../redux/type";
import { Logout } from "src/redux/modules/auth";
import { useHistory } from "react-router";

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const profile = useSelector((state) => state.profileReducer);
  const groupsId = profile.data?.profile?.groups_user?.map((e) => { return e.id });
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/6.jpg"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem
          onClick={() => {
            history.push("./profile");
          }}
        >
          <CIcon name="cil-user" className="mfe-2" />
          Profile
        </CDropdownItem>
        {
          groupsId?.includes(4) && (
            <CDropdownItem
              onClick={() => {
                history.push("./update-password");
              }}
            >
              <CIcon name="cil-lock-locked" className="mfe-2" />
              Đổi mật khẩu
            </CDropdownItem>
          )
        }
        <CDropdownItem divider />
        <CDropdownItem
          onClick={() => {
            dispatch(Logout());
          }}
        >
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
