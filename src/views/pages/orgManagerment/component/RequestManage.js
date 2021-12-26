import { CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CPagination, CRow } from "@coreui/react";
import { Field, Formik } from "formik";
import { debounce, isEmpty } from "lodash-es";
import React, { useCallback, useEffect, useState } from "react";
import { apiAcceptRequestAdminORG, apiGetRequestAdminORG, apiRejectRequestAdminORG } from 'src/apiFunctions/authencation';
import { addAllItemOfPage, addAnItems, isAllItemOnPageChecked, removeCheckAllItems } from 'src/helps/checklistFunction';
import { calcItemStart } from "src/helps/function";
import AppSelectAccountTypes from "src/views/components/AppSelectAccountTypes";
import { appToast } from 'src/views/components/AppToastContainer';
const size = 10;
const RequestManage = (props) => {
    const { tabActive } = props
    const [items, setItems] = useState([]);
    const [itemSelected, setItemSelected] = useState({});
    const [data, setData] = useState([]);
    const [key, setKey] = useState("");
    const [pageSize, setPageSize] = useState({ page: 1, size: size });
    const [accountType, setAccountType] = useState('');

    const callGetReques = (value) => {
        const params = {
            pageIndex: pageSize.page,
            pageSize: pageSize.size,
            accountType: accountType,
            statusType: 'uncheck',
            search: key
        }
        apiGetRequestAdminORG(params).then((res) => {
            console.log(res, "res");
            if (res?.status && res.data.code) {
                setData(res.data.obj);
            }
        });
    }

    const debounceSearch = useCallback(debounce((nextValue) => setPageSize({ ...pageSize, page: 1, size: size }), 500), []);

    useEffect(() => {
        if (tabActive !== 'RequestManage') return;
        setPageSize({ ...pageSize, page: 1, size: size })
    }, [tabActive]);

    useEffect(() => {
        callGetReques(key);
    }, [pageSize])

    useEffect(() => {
        setItems([]);
    }, [data])

    const accpetRequestORG = () => {
        if (isEmpty(items)) {
            appToast({
                toastOptions: { type: "error" },
                description: "Chọn ít nhất một tài khoản để duyệt",
            });
            return
        }
        const ids = items.map((e) => e.id);
        apiAcceptRequestAdminORG(ids).then((e) => {
            if (e?.status == 200 && e.data.code == "200") {
                appToast({
                    toastOptions: { type: "success" },
                    description: "Active success!",
                });
                callGetReques("");
            }
        })
    }

    const rejectRequestORG = (item) => {
        apiRejectRequestAdminORG([item.id]).then((e) => {
            if (e?.status == 200 && e.data.code == "200") {
                appToast({
                    toastOptions: { type: "success" },
                    description: "Reject success!",
                });
                callGetReques();
            }
        })
    }

    const handleCheckAll = () => {
        // checkDcThaoTac();
        if (isAllItemOnPageChecked(items, data?.object, "id")) {
            setItems(removeCheckAllItems(items, data?.object, "id"));
        } else {
            setItems(addAllItemOfPage(items, data?.object, "id"));
        }
    };

    const onSelectedItem = (e, item) => {
        setItems(addAnItems(items, item, "id"));
        e.stopPropagation();
    };

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
                        Danh sách tổ chức
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
                                <CCol md={6}>
                                    <div style={{ width: "100%", paddingTop: 34, justifyContent: "flex-end", display: "flex", alignItems: "flex-end" }}>
                                        <CButton type="submit" color="secondary" onClick={accpetRequestORG} disabled={isEmpty(items)}>Duyệt</CButton>
                                    </div>
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
                        <th>Từ chối</th>
                        <th>
                            <input type="checkbox"
                                onChange={handleCheckAll}
                                checked={Boolean(isAllItemOnPageChecked(items, data?.object || [], "id"))}
                            /></th>
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
                                        <td>
                                            <CButton color="danger" onClick={() => { rejectRequestORG(item) }}>
                                                Từ chối
                                            </CButton>
                                        </td>
                                        <td>
                                            <input type="checkbox"
                                                checked={Boolean(items.filter((elm) => elm.id === item.id).length > 0)}
                                                onChange={(e) => onSelectedItem(e, item)}
                                            />
                                        </td>
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
export default RequestManage;