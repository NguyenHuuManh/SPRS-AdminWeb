import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Field, Form, Formik } from "formik";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { CardHeader, CardTitle } from "reactstrap";
import { apiCreateEvent } from "src/apiFunctions/Event";
import { trimmedObject } from "src/helps/function";
import AppDatePicker from "src/views/components/AppDatePicker";
import AppTimePicker from "src/views/components/AppTimePicker";
import { appToast } from "src/views/components/AppToastContainer";
import InputField from "src/views/components/InputField";
import Mappicker from "src/views/components/Mappicker";
import TextAreaField from "src/views/components/TextAreaField";
import GroupTable from "./component/GroupTable";
import { addEvent, createEventValidation } from "./validate";
const CreateNotificaton = () => {

    const [items, setItems] = useState([]);
    const [addressPoint, setAddressPoint] = useState({});
    const createEvent = (body) => {
        apiCreateEvent(body).then((e) => {
            if (e?.status === 200) {
                if (e.data.code === '200') {
                    appToast({
                        toastOptions: { type: "success" },
                        description: "Gửi thông báo thành công",
                    });
                }
            }
        })
    }

    return (
        <CCard>
            <CardHeader>Tạo điểm cứu trợ</CardHeader>
            <CCardBody>
                <Formik
                    initialValues={{
                        open_time: "",
                        close_time: "",
                        status: "",
                        name: "SPRS",
                        description: "",
                        address: "",
                        adressString: ''
                    }}
                    validationSchema={createEventValidation}
                    validateOnChange={false}
                    onSubmit={(values) => {
                        const objTrimmed = trimmedObject(values);
                        console.log('objTrimmed', objTrimmed)
                        if (isEmpty(items)) {
                            appToast({
                                toastOptions: { type: "error" },
                                description: "Chọn ít nhất một mặt hàng",
                            });
                            return;
                        }
                        const body = {
                            ...values,
                            // open_time: moment(objTrimmed.open_time).format('DD-MM-YYYY HH:mm'),
                            // close_time: moment(objTrimmed.close_time).format('DD-MM-YYYY HH:mm'),
                            reliefInformations: items.map((e) => {
                                return {
                                    id: e.id,
                                    quantity: e.quantity,
                                    item: {
                                        id: e.item.id
                                    }
                                }
                            }),
                            address: {
                                city: {
                                    code: "",
                                    id: "",
                                    name: addressPoint.city
                                },
                                district: {
                                    code: "",
                                    id: "",
                                    name: addressPoint?.district,
                                },
                                subDistrict: {
                                    code: "",
                                    id: "",
                                    name: addressPoint?.subDistrict,
                                },
                                addressLine: "",
                                addressLine2: "",
                                GPS_lati: addressPoint?.GPS_Lati,
                                GPS_long: addressPoint?.GPS_long
                            },
                        }
                        console.log('body', body);
                        createEvent(body);
                    }}
                >
                    {({ values }) => (
                        <Form>
                            <CRow>
                                <CCol lg={6}>
                                    <GroupTable items={items} setItems={setItems} />
                                </CCol>

                                <CCol lg={6}>
                                    <CRow>
                                        <CCol lg={12}>
                                            <Field
                                                maxTitle={170}
                                                component={InputField}
                                                name="name"
                                                title="Tên Điểm cứu trợ"
                                            />
                                        </CCol>

                                        <CCol md={6}>
                                            <Field
                                                component={AppTimePicker}
                                                name="open_time"
                                                title="thời gian mở cửa"
                                            />
                                        </CCol>
                                        <CCol md={6}>
                                            <Field
                                                component={AppTimePicker}
                                                name="close_time"
                                                title="thời gian đóng cửa"
                                            />
                                        </CCol>
                                        <CCol lg={12}>
                                            <Field
                                                maxTitle={170}
                                                component={Mappicker}
                                                name="adressString"
                                                title="Địa chỉ"
                                                adress={addressPoint}
                                                setAdress={setAddressPoint}
                                                iconName={"cil-map"}
                                            />
                                        </CCol>
                                        <CCol lg={12}>
                                            <div style={{ height: 110 }}>
                                                <Field
                                                    title="Nội dung"
                                                    component={TextAreaField}
                                                    name="description"
                                                    type="TextArea"
                                                />
                                            </div>
                                        </CCol>

                                    </CRow>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md={12}>
                                    <div className="d-flex justify-content-end align-items-end" style={{ width: "100%" }}>
                                        <CButton type="submit" color="primary" >Thêm mới</CButton>
                                    </div>
                                </CCol>
                            </CRow>
                        </Form>
                    )}
                </Formik>
            </CCardBody>
        </CCard>
    )
}
export default CreateNotificaton;