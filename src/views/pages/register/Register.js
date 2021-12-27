import {
  CButton,
  CCard,
  CCardBody, CCardHeader, CCol,
  CContainer,
  CForm, CRow
} from '@coreui/react'
import { Field, Formik } from 'formik'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { apiGetOtpSignup, apiOtpPassword, apiSigup } from 'src/apiFunctions/authencation'
import AppDatePicker from 'src/views/components/AppDatePicker'
import AppSelectGroupsRegister from 'src/views/components/AppSelectGroupsRegister'
import AppSelectHuyen from 'src/views/components/AppSelectHuyen'
import AppSelectTinh from 'src/views/components/AppSelectTinh'
import AppSelectXa from 'src/views/components/AppSelectXa'
import AppTimePicker from 'src/views/components/AppTimePicker'
import { appToast } from 'src/views/components/AppToastContainer'
import InputField from 'src/views/components/InputField'
import InputMaskField from 'src/views/components/InputMaskField'
import InputPasswordField from 'src/views/components/InputPasswordField'
import Mappicker from 'src/views/components/Mappicker'
import OtpVerify from './OtpVerify'
import { register } from './validate'

const Register = () => {
  const [orgAdress, setOrgAdress] = useState({});
  const [tinh, setTinh] = useState({});
  const [huyen, setHuyen] = useState({});
  const history = useHistory();
  const [otpModal, setOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({});
  const [timeStart, setTimeStart] = useState({});
  const [disableOTP, setDisableOTP] = useState(true);
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
                <h1>Đăng ký</h1>
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
                      nameOrg: "",
                      city: "",
                      province: "",
                      district: "",
                      subDistrict: "",
                      addressLine: "",
                      groupsId: "",
                      adresslineORG: "",
                      adressString: "",
                      description: "",
                    }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={register}
                    onSubmit={(values) => {
                      let user = {
                        username: values.username,
                        phone: values.phone,
                        password: values.password,
                        full_name: values.full_name.replace(/\s\s+/g, ' '),
                        dob: values.dob,
                        address: {
                          city: {
                            code: "",
                            id: values.city,
                            name: "Hà Nội"
                          },
                          district: {
                            code: "",
                            id: values?.district,
                            name: "Thạch Thất"
                          },
                          subDistrict: {
                            code: "",
                            id: values?.subDistrict,
                            name: "Tân Xã",
                          },
                          addressLine: values?.addressLine,
                        },
                        groups_user: [{ id: values.groupsId }],
                        organization: {
                          name: values.nameOrg.replace(/\s\s+/g, ' '),
                          founded: "",
                          description: values?.description || "",
                          address: {
                            city: {
                              code: "",
                              id: 0,
                              name: orgAdress.city
                            },
                            district: {
                              code: "",
                              id: 0,
                              name: orgAdress?.district,
                            },
                            subDistrict: {
                              code: "",
                              id: 0,
                              name: orgAdress?.subDistrict,
                            },
                            addressLine: values?.adresslineORG,
                            GPS_lati: orgAdress?.GPS_lati + "",
                            GPS_long: orgAdress?.GPS_long + "",
                          },

                        }
                      }
                      setBody(user);
                      getOtp(values);
                    }}
                  >
                    {({ submitForm, values }) => (
                      <>
                        {/* {console.log('valuess', values)} */}
                        <Field
                          horizontal
                          component={AppSelectGroupsRegister}
                          name="groupsId"
                          maxTitle={170}
                          title="Loại tài khoản"
                        />
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
                          name="nameOrg"
                          title="Tên tổ chức"
                        />
                        <Field
                          maxTitle={170}
                          horizontal
                          component={Mappicker}
                          name="adressString"
                          title="Địa chỉ tổ chức"
                          adress={orgAdress}
                          setAdress={setOrgAdress}
                          iconName={"cil-map"}
                        />
                        <Field
                          maxTitle={170}
                          horizontal
                          component={InputField}
                          name="description"
                          title="Mô tả"
                        />
                        <Field
                          maxTitle={170}
                          horizontal
                          component={InputPasswordField}
                          name="password"
                          title="Mật khẩu"
                          type="password"
                          isPassword
                        />
                        <Field
                          maxTitle={170}
                          horizontal
                          component={InputPasswordField}
                          name="rePassWord"
                          title="Nhập lại mật khẩu"
                          type="password"
                          isPassword
                        />
                        <CRow>
                          <CCol>
                            <CButton color="success" block onClick={submitForm}>Đăng ký</CButton>
                          </CCol>
                        </CRow>
                        <CRow className="d-flex justify-content-center align-items-center">
                          <div style={{ paddingTop: 10 }}>
                            <a href="/login">Đăng nhập</a>
                          </div>
                        </CRow>
                      </>
                    )}
                  </Formik>
                  <OtpVerify
                    isOpen={otpModal}
                    setIsOpen={setOtpModal}
                    body={body} getOtp={getOtp}
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
    </div >
  )
}

export default Register
