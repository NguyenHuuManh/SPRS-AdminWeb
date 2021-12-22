import { CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CRow } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import { FaEye } from 'react-icons/fa';
import { apiGetRequestRejectedAdminORG } from 'src/apiFunctions/authencation';
import { debounce } from "lodash-es";
const RejectManage = (props) => {
    const { tabActive } = props
    const [itemSelected, setItemSelected] = useState({});
    const [data, setData] = useState([]);
    const [key, setKey] = useState("");


    const callGetRequestRejected = (key) => {
        apiGetRequestRejectedAdminORG({ search: key }).then((res) => {
            console.log(res, "res");
            if (res?.status && res.data.code) {
                setData(res.data.obj);
            }
        });
    }
    const debounceSearch = useCallback(debounce((key) => callGetRequestRejected(key), 500), []);

    const onChange = (values) => {
        setKey(values.target.value);
        debounceSearch(values.target.value);
    }
    useEffect(() => {
        if (tabActive !== 'RejectManage') return;
        callGetRequestRejected(key);
    }, [tabActive])
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
export default RejectManage;