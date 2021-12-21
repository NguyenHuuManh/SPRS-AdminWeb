import {
    CButton,
    CCard,
    CCardBody, CCardHeader, CCardTitle, CCol,
    CContainer,
    CForm, CRow
} from '@coreui/react'
import { Field, Formik } from 'formik'
import React, { useState } from 'react'
import { apiUpdatePass } from 'src/apiFunctions/authencation'
import { appToast } from 'src/views/components/AppToastContainer'
import InputField from 'src/views/components/InputField'
import { updatePass } from './validate'

const UpdatePassword = () => {
    const OnchangePass = (values) => {
        apiUpdatePass(values).then((e) => {
            console.log("e update P", e);
            if (e?.status == 200) {
                if (e.data.code == "200") {
                    appToast({
                        toastOptions: { type: "success" },
                        description: "Cập nhật mật khẩu thành công",
                    });
                } else {
                    appToast({
                        toastOptions: { type: "error" },
                        description: e.data.message,
                    });
                }
            } else {
                appToast({
                    toastOptions: { type: "success" },
                    description: "Chức năng đang bảo trì",
                });
            }
        })
    }
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="9" lg="7" xl="6">
                        <CCard className="mx-4">
                            <CCardHeader>
                                <h1>Thay đổi mật khẩu</h1>
                            </CCardHeader>
                            <CCardBody className="p-4">
                                <CForm>
                                    <Formik
                                        initialValues={{
                                            oldPassword: "password",
                                            newPassword: "",
                                            reNewPassword: "",
                                        }}
                                        validateOnBlur={false}
                                        validateOnChange={false}
                                        validationSchema={updatePass}
                                        onSubmit={(values) => {
                                            OnchangePass(values);
                                        }}
                                    >
                                        {({ submitForm }) => (
                                            <>
                                                <Field
                                                    horizontal
                                                    component={InputField}
                                                    name="oldPassword"
                                                    maxTitle={200}
                                                    title="Mật khẩu cũ"
                                                    type="password"
                                                />
                                                <Field
                                                    horizontal
                                                    component={InputField}
                                                    name="newPassword"
                                                    title="Mật khẩu mới"
                                                    maxTitle={200}
                                                    type="password"
                                                    security
                                                />
                                                <Field
                                                    horizontal
                                                    component={InputField}
                                                    name="reNewPassword"
                                                    maxTitle={200}
                                                    title="Nhập lại mật khẩu mới"
                                                    type="password"
                                                    security
                                                />
                                                <CRow>
                                                    <CCol>
                                                        <CButton color="success" block onClick={submitForm}>Cập nhật</CButton>
                                                    </CCol>
                                                </CRow>
                                            </>
                                        )}
                                    </Formik>
                                </CForm>
                            </CCardBody>

                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div >
    )
}

export default UpdatePassword
