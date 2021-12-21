import { CButton, CCardBody, CCol, CRow } from '@coreui/react';
import { Field, Formik } from "formik";
import { isEmpty } from 'lodash-es';
import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import { Card } from "reactstrap";
import { apiGetPermission, apiGetUnPermission, apiGrantUserPermission, apiGrantUserUnPermission } from 'src/apiFunctions/permission';
import AppSelectGroups from 'src/views/components/AppSelectGroups';
import { appToast } from 'src/views/components/AppToastContainer';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const UserTab = () => {
    const [itemSelected, setItemSelected] = useState({});
    const [dataPermisstion, setDataPermission] = useState([]);
    const [dataUnPermisstion, setDataUnPermission] = useState([]);

    const getPermission = (id) => {
        apiGetPermission(id).then((e) => {
            console.log("apiGetGroupAuthoried", e.data.lstObj);
            setDataPermission(e.data.lstObj);
        })
        apiGetUnPermission(id).then((e) => {
            console.log("apiGetGroupUnAuthoried", e.data.lstObj)
            setDataUnPermission(e.data.lstObj)
        })
    }

    useEffect(() => {
        if (isEmpty(itemSelected) || !itemSelected) {
            setDataPermission([]);
            setDataUnPermission([]);
            return;
        };
        getPermission(itemSelected.id)

    }, [itemSelected])

    const grantPermission = ({ source_id, target_id }) => {
        confirmAlert({
            title: 'Thêm quyền',
            message: 'Bạn có chắc chắn thêm quyền cho nhóm người này?',
            buttons: [
                {
                    label: 'Đồng',
                    onClick: () => {
                        apiGrantUserPermission({ source_id, target_id }).then((e) => {
                            if (e?.status === 200) {
                                if (e?.data?.code === '200') {
                                    getPermission(itemSelected.id);
                                }
                            }
                        })
                    }
                },
                {
                    label: 'Hủy',
                    onClick: () => { }
                }
            ]
        });

    }

    const grantUnPermission = ({ source_id, target_id }) => {
        confirmAlert({
            title: 'Gỡ quyền',
            message: 'Bạn có chắc chắn gỡ quyền nhóm người dùng này?',
            buttons: [
                {
                    label: 'Đồng',
                    onClick: () => {
                        apiGrantUserUnPermission({ source_id: source_id, target_id: target_id }).then((e) => {
                            if (e?.status === 200) {
                                if (e?.data?.code === '200') {
                                    getPermission(itemSelected.id);
                                } else {
                                    appToast({
                                        toastOptions: { type: "error" },
                                        description: e?.data?.message,
                                    });
                                }
                            }
                        })
                    }
                },
                {
                    label: 'Hủy',
                    onClick: () => { }
                }
            ]
        });

    }
    return (
        <CRow>
            <CCol lg={12}>
                <CCol lg={4} style={{ paddingLeft: 0 }}>
                    <Formik
                        initialValues={{

                        }}
                        onSubmit={(values) => {

                        }}
                    >
                        {({ values, submitForm, resetForm }) => (
                            <Field
                                component={AppSelectGroups}
                                name="group"
                                functionProps={setItemSelected}
                            />
                        )}
                    </Formik>
                </CCol>
            </CCol>
            <CCol lg={6}>
                <Card>
                    <CCardBody>
                        <div class="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-hover">
                                <thead className="table-active">
                                    <th>Nhóm quyền chưa được phân</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    {
                                        dataUnPermisstion && dataUnPermisstion.map((item, index) => {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    style={{ border: "none" }}
                                                >
                                                    <td><CButton onClick={() => { grantPermission({ source_id: itemSelected.id, target_id: item.id }) }}>Cấp quyền</CButton></td>
                                                    <td>{item?.name}</td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </CCardBody>
                </Card>
            </CCol>

            <CCol lg={6}>
                <Card>
                    <CCardBody>
                        <div class="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-hover">
                                <thead className="table-active">
                                    <th>Nhóm quyền được phân</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    {
                                        dataPermisstion && dataPermisstion.map((item, index) => {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    style={{ border: "none" }}
                                                >
                                                    <td><CButton onClick={() => { grantUnPermission({ source_id: itemSelected.id, target_id: item.id }) }}>xóa quyền</CButton></td>
                                                    <td>{item?.name}</td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </CCardBody>
                </Card>
            </CCol>
        </CRow>
    )
}
export default UserTab;