import { CButton, CCard, CCardBody, CCol, CHeader, CRow } from "@coreui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { CardHeader } from "reactstrap";
import { apiSendNotification } from "src/apiFunctions/Notification";
import AppSelectHuyen from "src/views/components/AppSelectHuyen";
import AppSelectTinh from "src/views/components/AppSelectTinh";
import AppSelectXa from "src/views/components/AppSelectXa";
import { appToast } from "src/views/components/AppToastContainer";
import TextAreaField from "src/views/components/TextAreaField";
import InputField from "src/views/components/InputField";
import GroupTable from "./component/GroupTable";
import { trimmedObject } from "src/helps/function";
import AppLoading from "src/views/components/AppLoading";
import { isEmpty } from 'lodash'
import { createNotificaton } from "./validate";
const CreateNotificaton = () => {
    const [tinh, setTinh] = useState({});
    const [huyen, setHuyen] = useState({});
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false)

    const sendNotification = (body) => {
        setLoading(true)
        apiSendNotification(body).then((e) => {
            if (e?.status === 200) {
                if (e.data.code === '200') {
                    appToast({
                        toastOptions: { type: "success" },
                        description: "Gửi thông báo thành công",
                    });
                    return;
                }
                appToast({
                    toastOptions: { type: "error" },
                    description: e.data.message,
                });
                return;
            }
            appToast({
                toastOptions: { type: "error" },
                description: 'Chức năng đang bảo trì',
            });
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <CCard>
            <AppLoading isOpen={loading} />
            <CardHeader>Tạo thông báo</CardHeader>
            <CCardBody>
                <Formik
                    initialValues={{
                        title: "",
                        message: "",
                        city_id: "",
                        district_id: "",
                        subdistrict_id: ""
                    }}
                    validationSchema={createNotificaton}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        const objTrimmed = trimmedObject(values)
                        if (isEmpty(items)) {
                            appToast({
                                toastOptions: { type: "error" },
                                description: "Chọn ít nhất một nhóm người dùng",
                            });
                            return;
                        }
                        const body = {
                            ...objTrimmed,
                            groupUsers: items.map((e) => e.id)
                        }
                        sendNotification(body)
                    }}
                >
                    {({ values }) => (
                        <Form>
                            <CRow>
                                <CCol lg={6}>
                                    <GroupTable items={items} setItems={setItems} />
                                </CCol>
                                <CCol md={6}>
                                    <CRow>
                                        <CCol>
                                            <Field
                                                component={AppSelectTinh}
                                                title="Tỉnh/thành phố"
                                                name="city_id"
                                                functionProps={setTinh}
                                            />
                                        </CCol>
                                        <CCol>
                                            <Field
                                                component={AppSelectHuyen}
                                                title="Quận/huyện"
                                                name="district_id"
                                                idTinh={tinh?.id}
                                                functionProps={setHuyen}
                                            />
                                        </CCol>
                                        <CCol>
                                            <Field
                                                component={AppSelectXa}
                                                title="Xã phường"
                                                name="subdistrict_id"
                                                idHuyen={huyen?.id}
                                            />
                                        </CCol>
                                    </CRow>
                                    <CRow>
                                        <CCol lg={12}>
                                            <Field
                                                component={InputField}
                                                title="Tiêu đề"
                                                name="title"
                                                idHuyen={huyen?.id}
                                                maxLength={250}
                                            />
                                        </CCol>
                                    </CRow>
                                    <div style={{ height: 156 }}>
                                        <Field
                                            title="Nội dung"
                                            component={TextAreaField}
                                            name="message"
                                            type="TextArea"
                                        />
                                    </div>
                                </CCol>

                            </CRow>

                            <CRow>
                                <CCol md={12}>
                                    <div className="d-flex justify-content-end align-items-end" style={{ width: "100%", paddingTop: 28 }}>
                                        <CButton type="submit" color="primary" >Gửi</CButton>
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