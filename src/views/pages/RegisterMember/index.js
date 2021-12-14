import {
  CButton,
  CCard,
  CCardBody, CCardHeader, CCol,
  CContainer,
  CForm, CRow
} from '@coreui/react'
import { Field, Formik } from 'formik'
import React, { useState } from 'react'
import { apiSigupUserORG } from 'src/apiFunctions/authencation'
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
import { register } from './validate'

const RegisterMember = () => {
  const [orgAdress, setOrgAdress] = useState({});
  const [tinh, setTinh] = useState({});
  const [huyen, setHuyen] = useState({});
  const singup = (values) => {
    apiSigupUserORG(values).then((res) => {
      console.log("resSignup", res);
      if (res.status == 200 && res.data.code == "200") {
        appToast({
          toastOptions: { type: "success" },
          description: "Đăng ký thành công",
        });
      } else {
        appToast({
          toastOptions: { type: "error" },
          description: res?.data?.message || "Đăng ký không thành công, hệ thống đang bảo trì",
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
                      singup(user);
                    }}
                  >
                    {({ submitForm, errors }) => (
                      <>
                        {console.log("error", errors)}
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
