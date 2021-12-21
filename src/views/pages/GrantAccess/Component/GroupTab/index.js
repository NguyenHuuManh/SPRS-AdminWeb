import { CButton, CCardBody, CCol, CRow } from '@coreui/react';
import { isEmpty } from 'lodash-es';
import React, { useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Card } from "reactstrap";
import { apiGetGroupAuthoried, apiGetGroupUnAuthoried, apiGrantGroupPermission, apiGrantGroupUnPermission } from 'src/apiFunctions/permission';
import { appToast } from 'src/views/components/AppToastContainer';
import UserTable from './UserTable';
const Group = () => {
    const [itemSelected, setItemSelected] = useState(1);
    const [dataPermisstion, setDataPermission] = useState([]);
    const [dataUnPermisstion, setDataUnPermission] = useState([]);

    const getPermission = (id) => {
        apiGetGroupAuthoried(id).then((e) => {
            setDataPermission(e.data.lstObj);
        })
        apiGetGroupUnAuthoried(id).then((e) => {
            setDataUnPermission(e.data.lstObj)
        })
    }

    useEffect(() => {
        if (isEmpty(itemSelected) || !itemSelected) {
            setDataPermission([]);
            setDataUnPermission([]);
            return;
        };
        getPermission(itemSelected.id);

    }, [itemSelected])



    const grantPermission = ({ source_id, target_id }) => {
        confirmAlert({
            title: 'Thêm quyền',
            message: 'Bạn có chắc chắn thêm quyền cho tài khoản này?',
            buttons: [
                {
                    label: 'Đồng',
                    onClick: () => {
                        apiGrantGroupPermission({ source_id, target_id }).then((e) => {
                            if (e?.status === 200) {
                                if (e?.data?.code === '200') {
                                    getPermission(itemSelected.id);
                                } else {
                                    appToast({
                                        toastOptions: { type: "error" },
                                        description: e?.data?.message,
                                    });
                                }
                            } else {
                                appToast({
                                    toastOptions: { type: "error" },
                                    description: 'Hệ thống đang bảo trì',
                                });
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
            message: 'Bạn có chắc chắn gỡ quyền cho tài khoản này?',
            buttons: [
                {
                    label: 'Đồng',
                    onClick: () => {
                        apiGrantGroupUnPermission({ source_id: source_id, target_id: target_id }).then((e) => {
                            if (e?.status === 200) {
                                if (e?.data?.code === '200') {
                                    getPermission(itemSelected.id);
                                } else {
                                    appToast({
                                        toastOptions: { type: "error" },
                                        description: e?.data?.message,
                                    });
                                }
                            } else {
                                appToast({
                                    toastOptions: { type: "error" },
                                    description: 'Hệ thống đang bảo trì',
                                });
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
            <UserTable itemSelected={itemSelected} setItemSelected={setItemSelected} />
            <CCol lg={6}>
                <Card>
                    <CCardBody>
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
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
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
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
        </CRow >
    )
}
export default Group;