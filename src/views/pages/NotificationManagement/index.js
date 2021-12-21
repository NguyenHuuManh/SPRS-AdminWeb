import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import AppSelectHuyen from "src/views/components/AppSelectHuyen";
import AppSelectTinh from "src/views/components/AppSelectTinh";
import AppSelectXa from "src/views/components/AppSelectXa";
const NotificationManagement = () => {
    const [tinh, setTinh] = useState({});
    const [huyen, setHuyen] = useState({});
    return (
        <>
            <CCard>
                <CCardHeader>
                    Điều kiện tìm kiếm
                </CCardHeader>
                <CCardBody>
                    <Formik
                        initialValues={{
                            datefrom: "",
                            tinh: "",
                            huyen: "",
                            xa: "",
                        }}
                        onSubmit={(values) => {
                            // setbody({ ...values })
                        }}
                    >
                        {({ values }) => (
                            <Form>
                                <CRow>
                                    <CCol md={3}>
                                        <Field
                                            component={AppSelectTinh}
                                            title="Tỉnh/thành phố"
                                            name="tinh"
                                            functionProps={setTinh}
                                        />
                                    </CCol>
                                    <CCol md={3}>
                                        <Field
                                            component={AppSelectHuyen}
                                            title="Quận/huyện"
                                            name="huyen"
                                            idTinh={tinh?.id}
                                            functionProps={setHuyen}
                                        />
                                    </CCol>
                                    <CCol md={3}>
                                        <Field
                                            component={AppSelectXa}
                                            title="Xã phường"
                                            name="xa"
                                            idHuyen={huyen?.id}
                                        />
                                    </CCol>
                                    <CCol md={3} className="d-flex justify-content-center align-items-center">
                                        <CButton type="submit" color="secondary" >Tìm kiếm</CButton>
                                    </CCol>
                                </CRow>
                            </Form>
                        )}
                    </Formik>
                </CCardBody>
            </CCard>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <CCol md={6}>
                            Danh sách thông báo
                        </CCol>
                    </CRow>
                </CCardHeader>
                <CCardBody>
                    <table className="table table-hover">
                        <thead className="table-active">
                            <th>STT</th>
                            <th>Tên thông báo</th>
                            <th>Loại người dùng được gửi</th>
                            <th>Nội dung</th>
                            <th>Khu vực gửi</th>
                            <th></th>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </CCardBody>
            </CCard>
        </>

    )
}
export default NotificationManagement;