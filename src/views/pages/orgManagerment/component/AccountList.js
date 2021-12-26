import { CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CPagination, CRow } from "@coreui/react";
import { Field, Formik } from "formik";
import { debounce } from "lodash-es";
import React, { useCallback, useEffect, useState } from "react";
import { apiGetAccountAccepted } from 'src/apiFunctions/authencation';
import AppSelectAccountTypes from "src/views/components/AppSelectAccountTypes";
const size = 10;
const AccountList = (props) => {
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
            statusType: 'accept',
            search: key
        }
        apiGetAccountAccepted(params).then((res) => {
            console.log(res, "res");
            if (res?.status && res.data.code) {
                setData(res.data.obj);
            }
        });
    }

    const debounceSearch = useCallback(debounce((key) => setPageSize({ ...pageSize, page: 1, size: size }), 500), []);

    useEffect(() => {
        if (tabActive !== 'AccountList') return;
        callGetRequestRejected("");
    }, [tabActive]);

    useEffect(() => {
        callGetRequestRejected("");
    }, [pageSize])

    const onChange = (values) => {
        setKey(values.target.value);
        debounceSearch(values.target.value);
    }

    const pageChange = (newPage) => {
        setPageSize({ ...pageSize, page: newPage });
    };
    return (
        <CCard>
            <CCardHeader>
                <CRow>
                    <CCol md={6}>
                        Danh sách tài khoản đã được duyệt
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
                                        <td>{index + 1}</td>
                                        <td>{item?.user?.full_name}</td>
                                        <td>{item?.user?.username}</td>
                                        <td>{item?.user?.phone}</td>
                                        <td>{item?.user?.groups_user[0]?.name}</td>
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
                    pages={data?.totalPages || 1}
                    align="center"
                />
            </CCardBody>
        </CCard>
    )
}
export default AccountList
    ;