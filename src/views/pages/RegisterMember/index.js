import {
  CButton,
  CCard,
  CCardBody, CCardHeader, CCol,
  CContainer,
  CForm, CRow
} from '@coreui/react'
import { Field, Formik } from 'formik'
import React, { useState } from 'react'
import { apiGetOtpSignup, apiSigupUserORG } from 'src/apiFunctions/authencation'
import { trimmedObject } from 'src/helps/function'
import AppDatePicker from 'src/views/components/AppDatePicker'
import AppSelectHuyen from 'src/views/components/AppSelectHuyen'
import AppSelectTinh from 'src/views/components/AppSelectTinh'
import AppSelectXa from 'src/views/components/AppSelectXa'
import AppTimePicker from 'src/views/components/AppTimePicker'
import { appToast } from 'src/views/components/AppToastContainer'
import InputField from 'src/views/components/InputField'
import InputMaskField from 'src/views/components/InputMaskField'
import Mappicker from 'src/views/components/Mappicker'
import OtpVerify from './OtpVerify'
import { register } from './validate'

const RegisterMember = () => {
  const [tinh, setTinh] = useState({});
  const [huyen, setHuyen] = useState({});
  const [body, setBody] = useState({});
  const [timeStart, setTimeStart] = useState({});
  const [disableOTP, setDisableOTP] = useState(true);
  const [otpModal, setOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const getOtp = (values) => {
    const bodyOTP = {
      to: '+84' + values.phone.substring(1),
      username: values.username,
    }
    setLoading(true);
    apiGetOtpSignup(bodyOTP).then((e) => {
      console.log("GET_OTP", e);
      if (e?.status == 200) {
        if (e.data.code == "200") {
          setOtpModal(true);
          setTimeStart({ value: 1 });
          setDisableOTP(false)
          return;
        }
        appToast({
          toastOptions: { type: "error" },
          description: e.data?.message,
        });
      } else {
        appToast({
          toastOptions: { type: "error" },
          description: 'Hệ thống đang bảo trì',
        });
      }
    }).finally(() => { setLoading(false) })
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardHeader>
                <h1>Đăng ký tài khoản thành viên</h1>
              </CCardHeader>
              <CCardBody className="p-4">
                <CForm>
                  <Formik
                    initialValues={{
                      username: "",
                      phone: "",
                      password: "",
                      rePassWord: "",
                      full_name: "",
                      dob: "",
                      city: "",
                      district: "",
                      subDistrict: "",
                      addressLine: "",
                      adressString: "",
                    }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={register}
                    onSubmit={(values) => {
                      const objTrimmed = trimmedObject(values)
                      let user = {
                        username: objTrimmed.username,
                        phone: objTrimmed.phone,
                        password: objTrimmed.password,
                        full_name: objTrimmed.full_name,
                        dob: objTrimmed.dob,
                        address: {
                          city: {
                            code: "",
                            id: objTrimmed.city,
                            name: ""
                          },
                          district: {
                            code: "",
                            id: objTrimmed?.district,
                            name: ""
                          },
                          subDistrict: {
                            code: "",
                            id: objTrimmed?.subDistrict,
                            name: "",
                          },
                          addressLine: objTrimmed?.adresslineORG,
                          GPS_Lati: "",
                          GPS_long: "",
                        },

                      }
                      setBody(user);
                      getOtp(values);
                    }}
                  >
                    {({ submitForm, errors }) => (
                      <>
                        {/* {console.log("error", errors)} */}
                        <Field
                          horizontal
                          component={InputField}
                          name="username"
                          maxTitle={170}
                          title="Tên tài khoản"
                        />
                        <Field
                          horizontal
                          component={InputField}
                          name="full_name"
                          title="Họ và tên"
                          maxTitle={170}
                        />
                        <Field
                          horizontal
                          component={InputMaskField}
                          name="phone"
                          maxTitle={170}
                          title="Số điện thoại"
                        />
                        <Field
                          maxTitle={170}
                          horizontal
                          component={AppTimePicker}
                          name="dob"
                          title="Ngày sinh"
                          formatDate="DD-MM-YYYY"
                        />
                        <Field
                          component={AppSelectTinh}
                          title="Tỉnh/thành phố"
                          name="city"
                          functionProps={setTinh}
                          maxTitle={170}
                          horizontal
                        />
                        <Field
                          component={AppSelectHuyen}
                          title="Quận/huyện"
                          name="district"
                          idTinh={tinh?.id}
                          functionProps={setHuyen}
                          maxTitle={170}
                          horizontal
                        />
                        <Field
                          component={AppSelectXa}
                          title="Xã phường"
                          name="subDistrict"
                          idHuyen={huyen?.id}
                          maxTitle={170}
                          horizontal
                        />
                        <Field
                          maxTitle={170}
                          horizontal
                          component={InputField}
                          name="password"
                          title="Mật khẩu"
                          type="password"
                        />
                        <Field
                          maxTitle={170}
                          horizontal
                          component={InputField}
                          name="rePassWord"
                          title="Nhập lại mật khẩu"
                          type="password"
                        />
                        <CRow>
                          <CCol>
                            <CButton color="success" block onClick={submitForm}>Đăng ký</CButton>
                          </CCol>
                        </CRow>
                      </>
                    )}
                  </Formik>
                  <OtpVerify
                    isOpen={otpModal}
                    setIsOpen={setOtpModal}
                    body={body}
                    getOtp={getOtp}
                    setTimeStart={setTimeStart}
                    timeStart={timeStart}
                    disableOTP={disableOTP}
                    setDisableOTP={setDisableOTP}
                  />
                </CForm>
              </CCardBody>

            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default RegisterMember;
