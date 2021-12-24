import { CCard, CCardBody, CCol, CNav, CNavItem, CRow, CTabContent, CTabPane } from '@coreui/react'
import React, { useState } from 'react'
import AccountList from './component/AccountList'
import RejectManage from './component/RejectManage'
import RequestManage from './component/RequestManage'
const OrgManagerment = () => {
    const [tabActive, setTabActive] = useState("RequestManage");
    return (
        <CRow>
            <CCol lg={12}>

                <CCard>
                    <CNav variant="tabs">
                        <CNavItem
                            style={{ cursor: "pointer", padding: 10, border: "solid", borderWidth: 0, borderBottomWidth: tabActive === "RequestManage" ? 1 : 0, borderColor: "coral" }}
                            onClick={() => { setTabActive("RequestManage") }}>
                            Yêu cầu đăng ký
                        </CNavItem>
                        <CNavItem
                            style={{ cursor: "pointer", padding: 10, border: "solid", borderWidth: 0, borderBottomWidth: tabActive === "RejectManage" ? 1 : 0, borderColor: "coral" }}
                            onClick={() => { setTabActive("RejectManage") }}>
                            Danh sách bị từ chối
                        </CNavItem>
                        <CNavItem
                            style={{ cursor: "pointer", padding: 10, border: "solid", borderWidth: 0, borderBottomWidth: tabActive === "AccountList" ? 1 : 0, borderColor: "coral" }}
                            onClick={() => { setTabActive("AccountList") }}>
                            Danh sách được phê duyệt
                        </CNavItem>
                    </CNav>
                    {/* </CCardHeader> */}
                    <CCardBody>
                        <CTabContent>
                            <CTabPane active={tabActive === "RequestManage"}>
                                <RequestManage />
                            </CTabPane>
                            <CTabPane active={tabActive === "RejectManage"}>
                                <RejectManage tabActive={tabActive} />
                            </CTabPane>
                            <CTabPane active={tabActive === "AccountList"}>
                                <AccountList tabActive={tabActive} />
                            </CTabPane>
                        </CTabContent>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default OrgManagerment;