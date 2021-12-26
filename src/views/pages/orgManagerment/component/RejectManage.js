import { CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CPagination, CRow } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import { FaEye } from 'react-icons/fa';
import { apiGetRequestRejectedAdminORG } from 'src/apiFunctions/authencation';
import { debounce } from "lodash-es";
import { Field, Formik } from "formik";
import AppSelectAccountTypes from "src/views/components/AppSelectAccountTypes";
import { calcItemStart } from "src/helps/function";
const size = 10;
const RejectManage = (props) => {
    const { tabActive } = props
    const [itemSelected, setItemSelected] = useState({});
    const [data, setData] = useState([]);
    const [key, setKey] = useState("");
    const [pageSize, setPageSize] = useState({ page: 1, size: size });
    const [accountType, setAccountType] = useState('');


    const callGetRequestRejected = (key) => {
        const params = {
            pageIndex: pageSize.page,
            pageSize: pageSize.size,
            accountType: accountType,
            statusType: 'reject',
            search: key
        }
        apiGetRequestRejectedAdminORG(params).then((res) => {
            console.log(res, "res");
            if (res?.status && res.data.code) {
                setData(res.data.obj);
            }
        });
    }
    const debounceSearch = useCallback(debounce((key) => setPageSize({ ...pageSize, page: 1, size: size }), 500), []);

    const onChange = (values) => {
        setKey(values.target.value);
        debounceSearch(values.target.value);
    }
    useEffect(() => {
        if (tabActive !== 'RejectManage') return;
        callGetRequestRejected(key);
    }, [tabActive]);
    useEffect(() => {
        callGetRequestRejected(key);
    }, [pageSize]);
    const pageChange = (newPage) => {
        setPageSize({ ...pageSize, page: newPage });
    };
    return (
        <CCard>
            <CCardHeader>
                <CRow>
                    <CCol md={6}>
                        Danh sách tài khoản bị từ chối
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
                                        component={AppSelectAccountTypes}
                                        name='status'
                                        title="Trạng thái"
                                        functionProps={(item) => {
                                            if (item?.id == 'Store' || item?.id == 'Organization') {
                                                setAccountType(item?.id);
                                            } else {
                                                setAccountType('');
                                            }
                                            setPageSize({ ...pageSize, page: 1, size: size })
                                        }}
                                    />
                                </CCol>
                            </CRow>
                        </>
                    )}
                </Formik>
                <table className="table table-hover">
                    <thead className="table-active">
                        <th>STT</th>
                        <th>Tên đầy đủ</th>
                        <th>Tên tài khoản</th>
                        <th>Số điện thoại</th>
                        <th>Loại tài khoản</th>
                        <th>Địa chỉ</th>
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
                                        <td>{item?.user?.full_name}</td>
                                        <td>{item?.user?.username}</td>
                                        <td>{item?.user?.phone}</td>
                                        <td>{item?.user?.groups_user[0].name}</td>
                                        <td>{item?.user?.address?.subDistrict.name + '-' + item?.user?.address?.district.name + '-' + item?.user?.address?.city.name}</td>
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
    )
}
export default RejectManage;