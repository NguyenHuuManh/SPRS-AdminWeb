import { CButton, CCardBody, CCol, CRow, CCardHeader, CInputGroup, CInput } from '@coreui/react';
import { isEmpty, debounce } from 'lodash-es';
import React, { useCallback, useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Card } from "reactstrap";
import { apiAssign, apiGetAssigned, apiGetUnAssigned, apiUnAssign } from 'src/apiFunctions/Event';
import { appToast } from 'src/views/components/AppToastContainer';
import UserTable from './UserTable';
const Group = () => {
    const [itemSelected, setItemSelected] = useState({});
    const [dataAssgined, setDataAssigned] = useState([]);
    const [dataUnAssigned, setDataUnAssigned] = useState([]);
    const [key1, setKey1] = useState('');
    const [key2, setKey2] = useState('');

    const getAssigned = (key, itemSelected) => {
        if (!itemSelected?.id) return;
        apiGetAssigned({ rp_id: itemSelected?.id, search: key }).then((e) => {
            if (e?.data?.code == 200) {
                setDataAssigned(e.data.obj);
            }
        })
    }
    const getUnAssigned = (key, itemSelected) => {
        if (!itemSelected?.id) return;
        apiGetUnAssigned({ rp_id: itemSelected?.id, search: key }).then((e) => {
            if (e?.data?.code == 200) {
                setDataUnAssigned(e.data.obj);
            }
        })
    }
    const debounceSearch1 = useCallback(debounce((key, itemSelected) => getAssigned(key, itemSelected), 500), []);
    const debounceSearch2 = useCallback(debounce((key, itemSelected) => getUnAssigned(key, itemSelected), 500), []);
    const onChange1 = (values) => {
        setKey1(values.target.value);
        debounceSearch1(values.target.value, itemSelected);
    }
    const onChange2 = (values) => {
        setKey2(values.target.value);
        debounceSearch2(values.target.value, itemSelected);
    }

    const getAssign = () => {
        getAssigned(key1, itemSelected);
        getUnAssigned(key2, itemSelected);
    }

    useEffect(() => {
        setKey1('');
        setKey2('')
        if (isEmpty(itemSelected) || !itemSelected) {
            setDataAssigned([]);
            setDataUnAssigned([]);
            return;
        };
        getAssign();

    }, [itemSelected])



    const callAssign = ({ source_id, target_id }) => {
        confirmAlert({
            title: 'Thêm thành viên vào sự kiện',
            message: 'Bạn có chắc chắn thêm thành viên vào sự kiện đang chọn?',
            buttons: [
                {
                    label: 'Đồng',
                    onClick: () => {
                        apiAssign({ source_id, target_id }).then((e) => {
                            if (e?.status === 200) {
                                if (e?.data?.code === '200') {
                                    getAssign();
                                    return;
                                }
                                appToast({
                                    toastOptions: { type: "error" },
                                    description: e?.data?.message,
                                });
                                return;
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

    const callUnAssign = ({ source_id, target_id }) => {
        confirmAlert({
            title: 'Xóa thành viên sự kiện',
            message: 'Bạn có chắc chắn xóa thành viên khỏi sự kiện đang chọn?',
            buttons: [
                {
                    label: 'Đồng',
                    onClick: () => {
                        apiUnAssign({ source_id: source_id, target_id: target_id }).then((e) => {
                            if (e?.status === 200) {
                                if (e?.data?.code === '200') {
                                    getAssign();
                                    return;
                                }
                                appToast({
                                    toastOptions: { type: "error" },
                                    description: e?.data?.message,
                                });
                                return;
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
                <UserTable itemSelected={itemSelected} setItemSelected={setItemSelected} />
            </CCol>
            <CCol lg={6}>
                <Card>
                    <CCardHeader>Thành viên chưa thuộc sự kiện</CCardHeader>
                    <CCardBody>
                        <div style={{ width: "30%" }}>
                            <label className="inputTitle">Tìm kiếm</label>
                            <CInputGroup className="mb-3" style={{ display: "flex", borderRadius: 10 }}>
                                <CInput
                                    placeholder="Nhập tên tài khoản . . ."
                                    onChange={onChange2}
                                    value={key2}
                                    disabled={isEmpty(itemSelected)}
                                />
                            </CInputGroup>
                        </div>
                        <div class="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-hover">
                                <thead className="table-active">
                                    <th>Tên tài khoản</th>
                                    <th>Họ và tên</th>
                                    <th>Số điện thoại</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    {
                                        dataUnAssigned && dataUnAssigned.map((item, index) => {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    style={{ border: "none" }}
                                                >
                                                    <td>{item?.username}</td>
                                                    <td>{item?.full_name}</td>
                                                    <td>{item?.phone}</td>
                                                    <td>
                                                        <CButton color={item.isAvailable == 0 ? 'secondary' : 'primary'}
                                                            onClick={() => { callAssign({ source_id: item.id, target_id: itemSelected.id }) }}
                                                            disabled={item.isAvailable == 0}
                                                        >
                                                            Thêm
                                                        </CButton>
                                                    </td>
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
                    <CCardHeader>Thành viên thuộc sự kiện</CCardHeader>
                    <CCardBody>
                        <div style={{ width: "30%" }}>
                            <label className="inputTitle">Tìm kiếm</label>
                            <CInputGroup className="mb-3" style={{ display: "flex", borderRadius: 10 }}>
                                <CInput
                                    placeholder="Nhập tên tài khoản . . ."
                                    onChange={onChange1}
                                    value={key1}
                                    disabled={isEmpty(itemSelected)}
                                />
                            </CInputGroup>
                        </div>
                        <div class="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-hover">
                                <thead className="table-active">
                                    <th>Tên tài khoản</th>
                                    <th>Họ và tên</th>
                                    <th>Số điện thoại</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    {
                                        dataAssgined && dataAssgined.map((item, index) => {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    style={{ border: "none" }}
                                                >
                                                    <td>{item?.username}</td>
                                                    <td>{item?.full_name}</td>
                                                    <td>{item?.phone}</td>
                                                    <td>
                                                        <CButton
                                                            color='danger'
                                                            onClick={() => { callUnAssign({ source_id: item.id, target_id: itemSelected.id }) }}>
                                                            Xóa
                                                        </CButton></td>
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