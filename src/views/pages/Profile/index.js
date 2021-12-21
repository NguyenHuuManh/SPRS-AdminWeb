import { CCard, CCardBody, CCardHeader, CCol, CNav, CNavItem, CRow, CTabContent, CTabPane } from '@coreui/react';
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import OrgTab from './Component/OrgTab';
import UserTab from './Component/UserTab';

const Profile = () => {
    const [tabActive, setTabActive] = useState("UserTab");
    const profile = useSelector((state) => state.profileReducer);
    const groupsId = profile.data?.profile?.groups_user?.map((e) => { return e.id });
    return (
        <CRow>
            <CCol lg={12}>
                <CCard>
                    {/* <CCardHeader> */}
                    <CNav variant="tabs">
                        <CNavItem
                            style={{ cursor: "pointer", padding: 10, border: "solid", borderWidth: 0, borderBottomWidth: tabActive === "UserTab" ? 1 : 0, borderColor: "coral" }}
                            onClick={() => { setTabActive("UserTab") }}>
                            Cá nhân
                        </CNavItem>
                        {
                            groupsId?.includes(4) && (
                                <CNavItem
                                    style={{ cursor: "pointer", padding: 10, border: "solid", borderWidth: 0, borderBottomWidth: tabActive === "OrgTab" ? 1 : 0, borderColor: "coral" }}
                                    onClick={() => { setTabActive("OrgTab") }}>
                                    Tổ chức
                                </CNavItem>
                            )
                        }
                    </CNav>
                    {/* </CCardHeader> */}
                    <CCardBody>
                        <CTabContent>
                            <CTabPane active={tabActive === "UserTab"}>
                                <UserTab />
                            </CTabPane>
                            {
                                groupsId?.includes(4) && (
                                    <CTabPane active={tabActive === "OrgTab"}>
                                        <OrgTab />
                                    </CTabPane>
                                )
                            }

                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow >
    );
}
export default Profile;