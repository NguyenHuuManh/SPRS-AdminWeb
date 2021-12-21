import { CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CPagination, CRow } from "@coreui/react";
import { Field, Formik } from "formik";
import { debounce, isEmpty } from "lodash-es";
import React, { useCallback, useEffect, useState } from "react";
import { apiBanUser, apiGetUsers, apiUnBanUser } from "src/apiFunctions/AccountManagerment";
import { calcItemStart } from "src/helps/function";
import AppSelectStautusAccount from "src/views/components/AppSelectStautusAccount";
import { appToast } from "src/views/components/AppToastContainer";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const size = 10;
const AccountManagerment = () => {
    const [itemSelected, setItemSelected] = useState({});
    const [data, setData] = useState({});
    const [key, setKey] = useState("");
    const [pageSize, setPageSize] = useState({ page: 1, size: size });
    const [status, setStatus] = useState('');

    const searchByName = (key) => {
        const param = {
            pageSize: pageSize.size,
            pageIndex: pageSize.page,
            search: key,
            filterStatus: isEmpty(status) ? [] : [status]
        }
        apiGetUsers(param).then((e) => {
            if (e?.status == 200) {
                if (e.data.code === '200') {
                    setData(e.data.obj);
                    console.log(e.data, 'dataaa')
                }
            } else {
                appToast({
                    toastOptions: { type: "error" },
                    description: "Chức năng đang bảo trì",
                });
                setData({});
            }

        })
    }

    const apiBanAcc = (item) => {
        const param = {
            uId: item.id
        }
        confirmAlert({
            title: 'Khóa tài khoản',
            message: 'Bạn có chắc chắn khóa tài khoản này?',
            buttons: [
                {
                    label: 'Đồng',
                    onClick: () => {
                        apiBanUser(param).then((e) => {
                            console.log('eeBan', e)
                            if (e?.status == 200) {
                                if (e.data.code == '200') {
                                    appToast({
                                        toastOptions: { type: "success" },
                                        description: "Đã khóa tài khoản" + item.username,
                                    });
                                    setPageSize({ ...pageSize })
                                } else {
                                    appToast({
                                        toastOptions: { type: "error" },
                                        description: e.data.message,
                                    });
                                }
                            } else {
                                appToast({
                                    toastOptions: { type: "error" },
                                    description: 'chức năng đang bảo trì',
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

    const apiUnBanAcc = (item) => {
        const param = {
            uId: item.id
        }
        confirmAlert({
            title: 'Mở tài khoản',
            message: 'Bạn có chắc chắn mở khoá tài khoản này?',
            buttons: [
                {
                    label: 'Đồng',
                    onClick: () => {
                        apiUnBanUser(param).then((e) => {

                            if (e?.status == 200) {
                                if (e.data.code == '200') {
                                    appToast({
                                        toastOptions: { type: "success" },
                                        description: "Mở khóa tài khoản " + item.username,
                                    });
                                    setPageSize({ ...pageSize })
                                } else {
                                    appToast({
                                        toastOptions: { type: "error" },
                                        description: e.data.message,
                                    });
                                }
                            } else {
                                appToast({
                                    toastOptions: { type: "error" },
                                    description: 'chức năng đang bảo trì',
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

    const debounceSearch = useCallback(debounce((key) => { setPageSize({ ...pageSize, page: 1, size: size }) }, 500), []);


    useEffect(() => {
        searchByName(key);
    }, [pageSize]);

    const pageChange = (newPage) => {
        setPageSize({ ...pageSize, page: newPage });
    };

    const onChange = (values) => {
        setKey(values.target.value);
        debounceSearch(values.target.value);
    }
    return (
        <CCard>
            <CCardHeader>
                <CRow>
                    <CCol md={6}>
                        Danh sách tài khoản
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <Formik
                    initialValues={{
                        status: "",
                    }}
                >
                    {() => (
                        <>
                            <CRow>
                                <CCol md={3}>
                                    <label className="inputTitle">Tìm kiếm</label>
                                    <CInputGroup className="mb-3" style={{ display: "flex", borderRadius: 10 }}>
                                        <CInput
                                            placeholder="Nhập tên tài khoản . . ."
                                            onChange={onChange}
                                            value={key}
                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol md={3}>
                                    <Field
                                        component={AppSelectStautusAccount}
                                        name='status'
                                        title="Trạng thái"
                                        functionProps={(item) => {
                                            setStatus(item?.id || '');
                                            setPageSize({ ...pageSize, page: 1, size: size })
                                        }}
                                    />
                                </CCol>
                            </CRow>
                        </>
                    )}
                </Formik>
                <div class="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-hover">
                        <thead className="table-active">
                            <th>STT</th>
                            <th>Tên đầy đủ</th>
                            <th>Tên tài khoản</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </thead>
                        <tbody>
                            {
                                data?.object?.map((item, index) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            className={`${item.id == itemSelected?.id && "table-active"}`}
                                            onClick={() => { setItemSelected(item) }}
                                        >
                                            <td>{calcItemStart(pageSize.page, pageSize.size) + index}</td>
                                            <td>{item?.full_name}</td>
                                            <td>{item?.username}</td>
                                            <td>{item?.phone}</td>
                                            <td>{item?.status == 'Actived' ? 'Đang hoạt động' : 'Bị khóa'}</td>
                                            <td>
                                                {item?.status == 'Actived' ? (
                                                    <CButton color="secondary" onClick={() => { apiBanAcc(item) }} style={{ width: 200 }}>
                                                        Khóa tài khoản
                                                    </CButton>
                                                ) : (
                                                    <CButton color="success" onClick={() => { apiUnBanAcc(item) }} style={{ width: 200 }}>
                                                        Mở khóa tài khoản
                                                    </CButton>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <CPagination
                    activePage={pageSize.page}
                    onActivePageChange={pageChange}
                    pages={data?.totalPage || 1}
                    align="center"
                />
            </CCardBody>
        </CCard>
    )
}
export default AccountManagerment;