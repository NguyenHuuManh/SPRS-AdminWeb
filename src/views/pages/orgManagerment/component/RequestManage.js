import { CButton, CCard, CCardBody, CCol, CRow, CCardHeader, CInputGroup, CInput } from "@coreui/react";
import { debounce } from "lodash-es";
import React, { useCallback, useEffect, useState } from "react";
import { FaEye } from 'react-icons/fa';
import { apiAcceptRequestAdminORG, apiGetRequestAdminORG, apiRejectRequestAdminORG } from 'src/apiFunctions/authencation';
import { addAllItemOfPage, addAnItems, isAllItemOnPageChecked, removeCheckAllItems } from 'src/helps/checklistFunction';
import { appToast } from 'src/views/components/AppToastContainer';
const RequestManage = () => {
    const [items, setItems] = useState([]);
    const [itemSelected, setItemSelected] = useState({});
    const [data, setData] = useState([]);
    const [key, setKey] = useState("");
    const callGetReques = (value) => {
        apiGetRequestAdminORG({ search: value }).then((res) => {
            console.log(res, "res");
            if (res.status && res.data.code) {
                setData(res.data.obj);
            }
        });
    }

    const debounceSearch = useCallback(debounce((nextValue) => callGetReques(nextValue), 500), []);

    useEffect(() => {
        callGetReques("");
    }, [])

    useEffect(() => {
        setItems([]);
    }, [data])

    const accpetRequestORG = () => {
        const ids = items.map((e) => e.id);
        apiAcceptRequestAdminORG(ids).then((e) => {
            if (e.status == 200 && e.data.code == "200") {
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
            if (e.status == 200 && e.data.code == "200") {
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
                        <CButton type="submit" color="secondary" onClick={accpetRequestORG} >Duyệt</CButton>
                    </div>
                </div>

                <table className="table table-hover">
                    <thead className="table-active">
                        <th>STT</th>
                        <th>
                            <input type="checkbox"
                                onChange={handleCheckAll}
                                checked={Boolean(isAllItemOnPageChecked(items, data, "id"))}
                            /></th>
                        <th>Tên đầy đủ</th>
                        <th>Tên tài khoản</th>
                        <th>Số điện thoại</th>
                        <th>Tên tổ chức</th>
                        <th>Địa chỉ tổ chức</th>
                        <th>Trạng thái</th>
                        <th></th>
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
                                        <td>
                                            <input type="checkbox"
                                                checked={Boolean(items.filter((elm) => elm.id === item.id).length > 0)}
                                                onChange={(e) => onSelectedItem(e, item)}
                                            />
                                        </td>
                                        <td>{item?.user?.full_name}</td>
                                        <td>{item?.user?.username}</td>
                                        <td>{item?.user?.phone}</td>
                                        <td>{item?.user?.organization?.name}</td>
                                        <td>{item?.user?.organization?.address?.addressLine}</td>
                                        <td>{item?.status}</td>
                                        <td>
                                            <CButton color="secondary" onClick={() => { rejectRequestORG(item) }}>
                                                Từ chối
                                            </CButton>
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