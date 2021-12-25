import { CButton, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Field, Formik } from "formik";
import { findIndex } from "lodash";
import React, { useState } from "react";
import AppSelectItem from "src/views/components/AppSelectItem";
import InputField from "src/views/components/InputField";
import { addCard } from "../validate";
const GroupTable = (props) => {
    const { items, setItems } = props
    const [itemSelected, setItemSelected] = useState({});
    // console.log('items', items)
    const deleteItem = (item) => {
        const arr = items.filter(e => e.item.id !== item.item.id);
        setItems(arr);
    }
    return (
        <CCard>
            <CCardBody>
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-hover">
                        <thead className="table-active">
                            <th>Tên mặt hàng</th>
                            <th>Số lượng</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {
                                items?.map((e, index) => {
                                    console.log(e, 'eeeee');
                                    return (
                                        <tr
                                            key={e.item.id}
                                            className={`${e?.item?.id == itemSelected?.item?.id && "table-active"}`}
                                            onClick={() => { setItemSelected(e) }}
                                        >
                                            <td>{e.item.name}</td>
                                            <td>{e.quantity + ' ' + e.item.unit}</td>
                                            <td>
                                                <CButton onClick={() => { deleteItem(e) }}>Xóa</CButton>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </CCardBody>
            <CCardBody>
                <Formik
                    validationSchema={addCard}
                    validateOnChange={false}
                    validateOnBlur={false}
                    initialValues={{
                        quantity: "",
                        id: "",
                        name: '',
                        unit: ''
                    }}
                    onSubmit={(values) => {
                        console.log('values', values);
                        const itemObj = {
                            id: null,
                            item: {
                                id: values.id,
                                unit: values.unit,
                                name: values.name,
                            },
                            quantity: Number(values.quantity),
                        }
                        const id = findIndex(items, (e) => {
                            return Number(e.item.id) == Number(itemObj.item.id)
                        })
                        if (id >= 0) {
                            items[id] = {
                                ...items[id],
                                quantity: Number(itemObj.quantity) + Number(items[id].quantity)
                            }
                            setItems([...items]);
                            return;
                        }
                        items.push(itemObj);
                        setItems([...items]);
                    }}
                >
                    {({ submitForm, setFieldValue }) => (
                        <>
                            <CRow>
                                <CCol md={4}>
                                    <Field
                                        component={AppSelectItem}
                                        title="Mặt hàng"
                                        name="id"
                                        functionProps={(item) => {
                                            setFieldValue('name', item.name)
                                            setFieldValue('unit', item.unit)
                                        }}
                                    />
                                </CCol>
                                <CCol md={4}>
                                    <Field
                                        component={InputField}
                                        title="Số lượng"
                                        name="quantity"
                                        type="number"
                                    />
                                </CCol>
                                <CCol md={4} style={{ justifyContent: 'flex-start', alignItems: "center", display: 'flex', paddingTop: 10 }}>
                                    <CButton color="primary" onClick={submitForm}>Thêm vào giỏ</CButton>
                                </CCol>
                            </CRow>
                        </>
                    )}
                </Formik>
            </CCardBody>
        </CCard>
    )
}
export default React.memo(GroupTable);