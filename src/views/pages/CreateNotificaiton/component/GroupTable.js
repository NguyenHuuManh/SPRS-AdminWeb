import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { apiGetGroups } from "src/apiFunctions/permission";
import { addAllItemOfPage, addAnItems, isAllItemOnPageChecked, removeCheckAllItems } from 'src/helps/checklistFunction';
const GroupTable = (props) => {
    const { items, setItems } = props
    const [itemSelected, setItemSelected] = useState({})
    const [data, setData] = useState([])

    const callGetGroup = () => {
        apiGetGroups().then((res) => {
            if (res?.status == 200) {
                if (res.data.code == "200") {
                    setData(res?.data?.lstObj);
                    setItems([]);
                }
                return;
            }
        })
    }

    useEffect(() => {
        callGetGroup();
    }, [])

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
    return (
        <CCard>
            <CCardBody>
                <table className="table table-hover">
                    <thead className="table-active">
                        <th>
                            <input type="checkbox"
                                onChange={handleCheckAll}
                                checked={Boolean(isAllItemOnPageChecked(items, data, "id"))}
                            /></th>
                        <th>Tên nhóm</th>
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
                                        <td>
                                            <input type="checkbox"
                                                checked={Boolean(items.filter((elm) => elm.id === item.id).length > 0)}
                                                onChange={(e) => onSelectedItem(e, item)}
                                            />
                                        </td>
                                        <td>{item.name}</td>
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
export default GroupTable;