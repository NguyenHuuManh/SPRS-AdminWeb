import { CButton, CInputGroupPrepend, CInputGroupText, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { apiPhoneVerify, apiSigup, apiSigupUserORG } from "src/apiFunctions/authencation";
import CountDown from "src/views/components/AppCountdown";
import { appToast } from "src/views/components/AppToastContainer";
import InputField from "src/views/components/InputField";
const OtpVerify = (props) => {
    const history = useHistory();
    const { isOpen, setIsOpen, body, getOtp, timeStart, disableOTP, setDisableOTP } = props;
    const singup = (values) => {
        apiSigupUserORG(values).then((res) => {
            if (res.status == 200 && res.data.code == "200") {
                appToast({
                    toastOptions: { type: "success" },
                    description: "Đăng ký thành công",
                });
                setIsOpen(false);
            } else {
                appToast({
                    toastOptions: { type: "error" },
                    description: res?.data?.message || "Đăng ký không thành công, hệ thống đang bảo trì",
                });
            }
        })
    }

    const otpVerify = (values) => {
        apiPhoneVerify(values).then((e) => {
            if (e?.status == 200) {
                if (e?.data?.code == '200') {
                    singup(body);
                    return;
                }
                appToast({
                    toastOptions: { type: "error" },
                    description: e.data?.description,
                });

            } else {
                appToast({
                    toastOptions: { type: "error" },
                    description: "hệ thống đang bảo trì",
                });
            }
        })
    }
    return (
        isOpen && (
            <CModal
                show={isOpen}
                closeOnBackdrop={false}
            >
                <Formik
                    initialValues={{
                        to: '+84' + body?.phone?.substring(1),
                        message: "",
                        otp: "",
                        username: body?.username
                    }}
                    enableReinitialize
                    onSubmit={(values) => {
                        otpVerify(values);
                    }}
                >
                    {({ submitForm }) => (
                        <Form>
                            <CModalHeader>
                                <CModalTitle>Xác minh số điện thoại</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                                <Field
                                    component={InputField}
                                    name="otp"
                                    // iconName="cil-barcode"
                                    title="Mã OTP: "
                                    leftView={() => {
                                        return (
                                            <div style={{ marginRight: -1, width: "20%" }}>
                                                <CInputGroupPrepend style={{ width: "100%" }}>
                                                    <CInputGroupText style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, width: "100%", display: "flex", justifyContent: "center" }} >
                                                        {timeStart && (
                                                            <CountDown
                                                                minuteStart={timeStart}
                                                                onClick={() => {
                                                                    getOtp(body);
                                                                }}
                                                                onStop={() => setDisableOTP(true)}
                                                            />
                                                        )}
                                                    </CInputGroupText>
                                                </CInputGroupPrepend>
                                            </div>
                                        )
                                    }}
                                />
                            </CModalBody>
                            <CModalFooter>
                                <CButton color="secondary" onClick={() => setIsOpen(false)} type="button">
                                    Hủy
                                </CButton>
                                <CButton color="primary" disabled={disableOTP} onClick={submitForm}>Gửi</CButton>
                            </CModalFooter>
                        </Form>
                    )}
                </Formik>
            </CModal>
        )
    )
}
export default React.memo(OtpVerify);