import CIcon from "@coreui/icons-react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from "@coreui/react";
import { Field, Formik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { apiOtpPassword, apiResetPass } from "src/apiFunctions/authencation";
import CountDown from "src/views/components/AppCountdown";
import AppLoading from "src/views/components/AppLoading";
import { appToast } from "src/views/components/AppToastContainer";
import InputField from "src/views/components/InputField";
import { checkPhone } from "./validate";

const ForgotPassword = () => {
    const history = useHistory();
    const [isOtp, setIsOtp] = useState(false);
    const [isPhone, setIsPhone] = useState(true);
    const [phone, setPhone] = useState();
    const [timeStart, setTimeStart] = useState({});
    const [disableOTP, setDisableOTP] = useState(true);
    const [loading, setLoading] = useState(false);

    const getOtp = (values) => {
        setLoading(true);
        apiOtpPassword(values).then((e) => {
            console.log("e", e);
            if (e?.status == 200 && e.data.code == "200") {
                setIsOtp(true);
                setIsPhone(false);
                setPhone(values.to);
                setTimeStart({ value: 1 });
                setDisableOTP(false)
            }
        }).finally(() => { setLoading(false) })
    }
    const checkOTP = (values) => {
        setLoading(true);
        apiResetPass(values).then((res) => {
            if (res.status == 200) {
                if (res.data.code == "200") {
                    appToast({
                        toastOptions: { type: "success" },
                        description: "Mật khẩu mới được gửi vào số điện thoại của bạn",
                        title: "Cấp lại khẩu thành công"
                    });
                    history.replace("/Login");
                } else {
                    appToast({
                        toastOptions: { type: "error" },
                        description: res.data.description,
                    });
                }
            }
        }).finally(() => { setLoading(false); })
    }
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <AppLoading isOpen={loading} />
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="5">

                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <a href="/login">Đăng nhập</a>
                                </CCardBody>
                                <CCardBody>
                                    <h1>Quên mật khẩu</h1>
                                    <p className="text-muted">Cấp lại mật khẩu</p>
                                    {isPhone && (
                                        <Formik
                                            validationSchema={checkPhone}
                                            initialValues={{
                                                to: "",
                                            }}
                                            onSubmit={(values) => {
                                                getOtp({ to: "+84" + values.to })
                                            }}
                                        >
                                            {({ submitForm }) => (
                                                <>
                                                    <Field
                                                        component={InputField}
                                                        name="to"
                                                        iconName="cil-phone"
                                                        title="Số điện thoại: "
                                                        isPhone
                                                    />

                                                    <div className="d-flex justify-content-start align-items-center" >
                                                        <CButton color="success" onClick={submitForm}>Gửi</CButton>
                                                    </div>
                                                </>
                                            )}
                                        </Formik>
                                    )}
                                    {isOtp && (
                                        <Formik
                                            initialValues={{
                                                otp: "",
                                            }}
                                            onSubmit={(values) => {
                                                checkOTP({ otp: values.otp, to: phone })
                                            }}
                                        >
                                            {({ submitForm }) => (
                                                <>
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
                                                                                        getOtp({ to: phone })
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
                                                    <div className="d-flex justify-content-start align-items-center" >
                                                        <CButton color="success" onClick={submitForm} disabled={disableOTP}>Gửi</CButton>
                                                    </div>
                                                </>
                                            )}
                                        </Formik>
                                    )}
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default ForgotPassword;
