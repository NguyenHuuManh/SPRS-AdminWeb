import { CButton, CCardBody, CCol, CRow, CCardHeader, CInputGroup, CInput } from '@coreui/react';
import { isEmpty, debounce } from 'lodash-es';
import React, { useCallback, useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import { Card } from "reactstrap";
import { apiAssign, apiGetAssigned, apiGetUnAssigned, apiUnAssign } from 'src/apiFunctions/Event';
import UserTable from './UserTable';
const Group = () => {
    const [itemSelected, setItemSelected] = useState({});
    const [dataAssgined, setDataAssigned] = useState([]);
    const [dataUnAssigned, setDataUnAssigned] = useState([]);
    const [key1, setKey1] = useState('');
    const [key2, setKey2] = useState('');

    const getAssigned = (key) => {
        console.log('itemSelect', itemSelected)
        if (!itemSelected?.id) return;
        apiGetAssigned({ rp_id: itemSelected?.id, search: key }).then((e) => {
            setDataAssigned(e.data.obj);
        })
    }
    const getUnAssigned = (key) => {
        if (!itemSelected?.id) return;
        apiGetUnAssigned({ rp_id: itemSelected?.id, search: key }).then((e) => {
            setDataUnAssigned(e.data.obj);
        })
    }
    const debounceSearch1 = useCallback(debounce((key) => getAssigned(key), 500), []);
    const debounceSearch2 = useCallback(debounce((key) => getUnAssigned(key), 500), []);
    const onChange1 = (values) => {
        setKey1(values.target.value);
        debounceSearch1(values.target.value);
    }
    const onChange2 = (values) => {
        setKey2(values.target.value);
        debounceSearch2(values.target.value);
    }

    const getAssign = () => {
        getAssigned(key1);
        getUnAssigned(key2);
    }

    useEffect(() => {
        console.log(itemSelected, 'itemSelected')
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
                                                    <td><CButton onClick={() => { callAssign({ source_id: item.id, target_id: itemSelected.id }) }}>Thêm</CButton></td>
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
                                                    <td><CButton onClick={() => { callUnAssign({ source_id: item.id, target_id: itemSelected.id }) }}>Xóa</CButton></td>
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