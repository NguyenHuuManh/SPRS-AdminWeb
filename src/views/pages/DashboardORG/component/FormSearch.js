import { CButton, CCol, CRow } from "@coreui/react";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { apiGetReportMonth, apiGetReportMonthORG, apiGetReportYear, apiGetReportYearORG } from "src/apiFunctions/Dashboard";
import AppSelectTypeReport from "src/views/components/AppSelectTypeReport";
import { report } from "../validate";
import Barchart from "./Barchart";
import LineChart from "./LineChart";
const FormSearch = () => {
    const [data, setData] = useState({});
    const [body, setBody] = useState({ type_time: '1' });


    useEffect(() => {
        getReport(body);
    }, [body])

    const getReport = (values) => {
        const body = {
            type_point: [1, 2, 3, 4]
        }

        if (values.type_time == '1') {
            apiGetReportYearORG(body).then((e) => {
                if (e?.status == 200) {
                    if (e?.data.code == '200') {
                        setData({ lables: e.data.obj.label, dataChart: e.data.obj.data });
                    }
                }
            })
        } else {
            apiGetReportMonthORG(body).then((e) => {
                if (e?.status == 200) {
                    if (e?.data.code == '200') {
                        setData({ lables: e.data.obj.label, dataChart: e.data.obj.data });
                    }
                }
            })
        }

    }
    return (
        <Card>
            <Formik
                initialValues={{
                    type_time: "1",
                }}
                validationSchema={report}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={(values) => {
                    setBody({ ...values })
                }}
            >
                {({ submitForm }) => (
                    <CRow style={{ padding: 10, paddingLeft: 50 }}>

                        <CCol lg={3} md={3}>
                            <Field component={AppSelectTypeReport} name="type_time" title="Loại báo cáo" isClearable={false} functionProps={() => submitForm()} />
                        </CCol>
                    </CRow>
                )}
            </Formik>
            {/* <Barchart data={data} /> */}
            {body?.type_time == '1' ? (
                <Barchart data={data} />
            ) : (
                <LineChart data={data} />
            )}
        </Card>
    )
}
export default FormSearch;