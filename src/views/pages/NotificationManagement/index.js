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
                            <th>Ngày gửi</th>
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
                                            <td>{item.create_time}</td>
                                            <td>{item.message}</td>
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