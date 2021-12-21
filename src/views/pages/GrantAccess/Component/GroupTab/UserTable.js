import { CCol, CInput, CInputGroup, CPagination } from "@coreui/react";
import { Field, Formik } from "formik";
import { debounce, isEmpty } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { apiGetUersByName } from "src/apiFunctions/permission";
import InputField from "src/views/components/InputField";
const size = 10;
const UserTable = (props) => {
    const { itemSelected, setItemSelected } = props
    const [data, setData] = useState([]);
    const [key, setKey] = useState("");
    const [pageSize, setPageSize] = useState({ page: 1, size: size });
    const searchByName = (key) => {
        const body = {
            pageSize: pageSize.size,
            pageIndex: pageSize.page - 1,
            search: key,
            sort: true,
        }
        apiGetUersByName(body).then((e) => {
            if (e?.data?.code === '200') {
                setData(e?.data?.obj);
                setItemSelected({});
                console.log(e.data.obj, 'dfsfd')
            }
        })
    }
    useEffect(() => {
        searchByName(key);
    }, [pageSize]);

    const pageChange = (newPage) => {
        setPageSize({ ...pageSize, page: newPage });
    };

    const debounceSearch = useCallback(debounce((key) => { setPageSize({ ...pageSize, page: 1, size: size }) }, 500), []);

    const onChange = (values) => {
        setKey(values.target.value);
        debounceSearch(values.target.value);
    }
    return (
        <CCol lg={12}>
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
                    <thead className="table-active" >
                        <th>Tên tài khoản</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                    </thead>
                    <tbody >
                        {
                            data && data?.users?.map((item, index) => {
                                return (
                                    <tr
                                        key={item.id}
                                        className={`${item.id === itemSelected?.id && "table-active"}`}
                                        onClick={() => { setItemSelected(item) }}
                                    >
                                        <td>{item?.username}</td>
                                        <td>{item?.phone || "dasdasdas "}</td>
                                        <td>{item?.address.subDistrict?.name + ' ' + item?.address.district?.name + ' ' + item?.address.city?.name}</td>
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
                pages={data?.totalPages || 1}
                align="center"
            />
        </CCol>
    )
}
export default UserTable;