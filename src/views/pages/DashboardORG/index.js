import { CCardTitle, CCol, CRow } from "@coreui/react";
import React from "react";
import CityChart from "./component/CityChart";
import FormSearch from "./component/FormSearch";
import Ranking from "./component/Ranking";

const Dashboard = () => {
    return (
        <>
            <CRow>
                <CCol lg={6} style={{ paddingBottom: 25 }}>
                    <div style={{ backgroundColor: "#FFFF" }}>
                        <div style={{ backgroundColor: "#FFFF", height: 400, overflowY: 'scroll' }}>
                            <CityChart />
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <CCardTitle>Biểu đồ thống kê điểm tại các tỉnh thành</CCardTitle>
                        </div>
                    </div>

                </CCol>
                <CCol lg={6} style={{ paddingBottom: 25 }}>
                    <div style={{ backgroundColor: "#FFFF" }}>
                        <div style={{ backgroundColor: "#FFFF", height: 400 }}>
                            <Ranking />
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <CCardTitle>5 thành viên hoạt động nhiều nhất</CCardTitle>
                        </div>
                    </div>

                </CCol>
                <CCol lg={12}>
                    <FormSearch />
                </CCol>

            </CRow>
        </>
    )
}
export default Dashboard;