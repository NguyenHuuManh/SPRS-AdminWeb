import { CButton, CCard, CCardBody, CCardHeader, CCol, CPagination, CRow } from "@coreui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { apiGetNotifications } from "src/apiFunctions/Notification";
import AppSelectHuyen from "src/views/components/AppSelectHuyen";
import AppSelectTinh from "src/views/components/AppSelectTinh";
import AppSelectXa from "src/views/components/AppSelectXa";
const size = 10;
const NotificationManagement = () => {
    const [tinh, setTinh] = useState({});
    const [huyen, setHuyen] = useState({});
    const [pageSize, setPageSize] = useState({ page: 1, size: size });
    const [data, setData] = useState({});

    const getNotifications = () => {
        const body = {
            pageSize: pageSize.size,
            pageIndex: pageSize.page,
        }
        apiGetNotifications(body).then((e) => {
            console.log(e, "eEEE");
            if (e?.status == 200) {
                if (e.data.code == '200') {
                    setData(e.data.obj);
                }
            } else {

            }
        })
    };
    useEffect(() => {
        getNotifications();
    }, [pageSize]);


    const pageChange = (newPage) => {
        setPageSize({ ...pageSize, page: newPage });
    };
    return (
        <>
            {/* <CCard>
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
            </CCard> */}
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
                            <th>Tên thông báo</th>
                            <th>Loại người dùng được gửi</th>
                            <th>Nội dung</th>
                        </thead>
                        <tbody>
                            {
                                data?.object?.map((item, index) => {
                                    return (
                                        <tr
                                            key={item.id}
                                        >
                                            <td>{item.title}</td>
                                            <td>{item.message}</td>
                                            <td>{item.create_time}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <CPagination
                        activePage={pageSize.page}
                        onActivePageChange={pageChange}
                        pages={data?.totalPage || 1}
                        align="center"
                    />
                </CCardBody>
            </CCard>
        </>

    )
}
export default NotificationManagement;