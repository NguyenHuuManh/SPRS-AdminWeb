import { CCol, CRow } from "@coreui/react";
import React from "react";
import CityChart from "./component/CityChart";
import FormSearch from "./component/FormSearch";
import Ranking from "./component/Ranking";

const Dashboard = () => {
    return (
        <>
            <CRow>
                <CCol lg={6} style={{ paddingBottom: 25 }}>
                    <div style={{ backgroundColor: "#FFFF", height: "100%" }}>
                        <CityChart />
                    </div>

                </CCol>
                <CCol lg={6} style={{ paddingBottom: 25 }}>
                    <div style={{ backgroundColor: "#FFFF", height: "100%" }}>
                        <Ranking />
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