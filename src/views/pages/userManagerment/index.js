import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CPagination, CRow } from '@coreui/react'
import { debounce } from 'lodash-es';
import React, { useCallback, useEffect, useState } from 'react'
import { apiActiveMembers, apiGetMembers, apiUnActiveMembers } from 'src/apiFunctions/orgManagerment'
import { calcItemStart, countPage } from 'src/helps/function';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { appToast } from 'src/views/components/AppToastContainer';
const size = 10;
const UserManager = () => {
    const [itemSelected, setItemSelected] = useState({});
    const [pageSize, setPageSize] = useState({ page: 1, size: size });
    const [sort, setSort] = useState(true);
    const [key, setKey] = useState("");
    const [data, setData] = useState({});

    const getUsers = (keySearch) => {
        const body = {
            pageSize: pageSize.size,
            pageIndex: pageSize.page - 1,
            sort: sort,
            search: keySearch,
        }
        apiGetMembers(body).then((e) => {
            if (e?.status == 200) {
                if (e.data.code == '200') {
                    setData(e.data.obj);
                }
            } else {

            }
        })
    };


    const debounceSearch = useCallback(debounce((key) => { setPageSize({ ...pageSize, page: 1, size: size }) }, 500), []);

    const onChange = (values) => {
        setKey(values.target.value);
        debounceSearch(values.target.value);
    }

    useEffect(() => {
        getUsers(key);
    }, [pageSize]);

    const unActive = (id) => {
        apiUnActiveMembers(id).then((e) => {
            if (e?.status == 200) {
                if (e.data.code == '200') {
                    setPageSize({ ...pageSize });
                } else {
                    appToast({
                        toastOptions: { type: "error" },
                        description: e.data.message,
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

    const active = (id) => {
        apiActiveMembers(id).then((e) => {
            if (e?.status == 200) {
                if (e.data.code == '200') {
                    setPageSize({ ...pageSize });
                } else {
                    appToast({
                        toastOptions: { type: "error" },
                        description: e.data.message,
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

    const pageChange = (newPage) => {
        setPageSize({ ...pageSize, page: newPage });
    };

    return (
        <CRow>
            <CCol lg={12}>
                <CCard>
                    <CCardHeader>
                        Danh sách thành viên
                    </CCardHeader>
                    <CCardBody>
                        <div style={{ width: "30%" }}>
                            <label className="inputTitle">Tìm kiếm</label>
                            <CInputGroup className="mb-3" style={{ display: "flex", borderRadius: 10 }}>
                                <CInput
                                    placeholder="Nhập tên tài khoản . . ."
                                    onChange={onChange}
                                    value={key}
                                />
                            </CInputGroup>
                        </div>
                        <div class="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-hover">
                                <thead className="table-active">
                                    <th>STT</th>
                                    <th>
                                        {sort ?
                                            <FaSortAlphaDown onClick={() => { setSort(false); setPageSize({ ...pageSize }) }} />
                                            :
                                            <FaSortAlphaUp onClick={() => { setSort(true); setPageSize({ ...pageSize }) }} />
                                        }
                                        <span style={{ marginLeft: 10 }}>Tên tài khoản</span>
                                    </th>
                                    <th>Họ và tên</th>
                                    <th>Số điện thoại</th>
                                    <th>Trạng thái</th>
                                    <th>Khóa tài khoản</th>
                                </thead>
                                <tbody>
                                    {
                                        data?.users?.map((item, index) => {
                                            return (
                                                <tr
                                                    key={item.id}
                                                    className={`${item.id == itemSelected?.id && "table-active"}`}
                                                    onClick={() => { setItemSelected(item) }}
                                                >
                                                    <td>{calcItemStart(pageSize.page, pageSize.size) + index}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.full_name}</td>
                                                    <td>{item.phone}</td>
                                                    <td>
                                                        {item?.status == 'Actived' ? "Đang hoạt động" : "Tài khoản bị khóa"}
                                                    </td>
                                                    <td>
                                                        {item?.status == 'Actived' ? (
                                                            <CButton color="secondary" onClick={() => { unActive(item?.id) }} style={{ width: 200 }}>
                                                                Khóa tài khoản
                                                            </CButton>
                                                        ) : (
                                                            <CButton color="success" onClick={() => { active(item.id) }} style={{ width: 200 }}>
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
                            pages={data?.totalPages}
                            align="center"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}
export default UserManager;