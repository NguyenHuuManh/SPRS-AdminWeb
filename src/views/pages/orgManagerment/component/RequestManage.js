import { CButton, CCard, CCardBody, CCol, CRow, CCardHeader, CInputGroup, CInput } from "@coreui/react";
import { debounce, isEmpty } from "lodash-es";
import React, { useCallback, useEffect, useState } from "react";
import { FaEye } from 'react-icons/fa';
import { apiAcceptRequestAdminORG, apiGetRequestAdminORG, apiRejectRequestAdminORG } from 'src/apiFunctions/authencation';
import { addAllItemOfPage, addAnItems, isAllItemOnPageChecked, removeCheckAllItems } from 'src/helps/checklistFunction';
import { appToast } from 'src/views/components/AppToastContainer';
const RequestManage = (props) => {
    const { tabActive } = props
    const [items, setItems] = useState([]);
    const [itemSelected, setItemSelected] = useState({});
    const [data, setData] = useState([]);
    const [key, setKey] = useState("");
    const callGetReques = (value) => {
        apiGetRequestAdminORG({ search: value }).then((res) => {
            console.log(res, "res");
            if (res?.status && res.data.code) {
                setData(res.data.obj);
            }
        });
    }

    const debounceSearch = useCallback(debounce((nextValue) => callGetReques(nextValue), 500), []);

    useEffect(() => {
        if (tabActive !== 'RequestManage') return;
        callGetReques("");
    }, [tabActive])

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
        if (isAllItemOnPageChecked(items, data, "id")) {
            setItems(removeCheckAllItems(items, data, "id"));
        } else {
            setItems(addAllItemOfPage(items, data, "id"));
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
                <div style={{ width: "100%", display: "flex" }}>
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
                    <div style={{ width: "70%", paddingTop: 34, justifyContent: "flex-end", display: "flex", alignItems: "flex-start" }}>
                        <CButton type="submit" color="secondary" onClick={accpetRequestORG} disabled={isEmpty(items)}>Duyệt</CButton>
                    </div>
                </div>

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
                                checked={Boolean(isAllItemOnPageChecked(items, data, "id"))}
                            /></th>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => {
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
                                        <td>{item?.user?.groups_user[0].name}</td>
                                        <td>{item?.user?.address?.subDistrict.name + '-' + item?.user?.address?.district.name + '-' + item?.user?.address?.city.name}</td>
                                        <td>
                                            <CButton color="secondary" onClick={() => { rejectRequestORG(item) }}>
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
            </CCardBody>
        </CCard>
    )
}
export default RequestManage;