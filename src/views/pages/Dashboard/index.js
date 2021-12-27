import { CCardTitle, CCol, CRow } from "@coreui/react";
import React from "react";
import CityChart from "./component/CityChart";
import FormSearch from "./component/FormSearch";
import Piechart from "./component/PieChart";

const Dashboard = () => {
    return (
        <>
            <CRow>
                <CCol lg={6} style={{ paddingBottom: 25 }}>
                    <div style={{ backgroundColor: "#FFFF" }}>
                        <div style={{ backgroundColor: "#FFFF", height: 400, overflowY: 'scroll' }}>
                            <CityChart />
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', height: 50 }}>
                            <CCardTitle>Biểu đồ thống kê điểm tại các tỉnh thành</CCardTitle>
                        </div>
                    </div>
                </CCol>
                <CCol lg={6} style={{ paddingBottom: 25 }}>
                    <div style={{ backgroundColor: "#FFFF" }}>
                        <div style={{ backgroundColor: "#FFFF", height: 400, }}>
                            <Piechart />
                        </div>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <CCardTitle>Biểu đồ tổng các điểm của toàn hệ thống</CCardTitle>
                        </div>
                    </div>
                </CCol>
            </CRow>
            <CRow>
                <CCol lg={12}>
                    <FormSearch />
                </CCol>
            </CRow>

        </>
    )
}
export default Dashboard;