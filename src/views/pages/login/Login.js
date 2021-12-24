import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow
} from "@coreui/react";
import { Field, Form, Formik } from "formik";
import { isEmpty } from "lodash-es";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { trimmedObject } from "src/helps/function";
import { loginRequest } from "src/redux/modules/auth";
import AppLoading from "src/views/components/AppLoading";
import InputField from "src/views/components/InputField";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer.auth);
  const user = localStorage.getItem("userSPRS");
  if (auth.isLogin || !isEmpty(user)) {
    return <Redirect to="/" />;
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <AppLoading isOpen={auth.isLoading} />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <h1>Đăng nhập</h1>
                  <p className="text-muted">đăng nhập với tài khoản của quản lý hệ thống hoặc tổ chức</p>
                  <Formik
                    initialValues={{
                      username: "",
                      password: "",
                    }}
                    onSubmit={(values) => {
                      const objTrimmed = trimmedObject(values)
                      dispatch(loginRequest(objTrimmed));
                    }}
                  >
                    {({ submitForm }) => (
                      <Form>
                        <Field
                          component={InputField}
                          name="username"
                          iconName="cil-user"
                        />
                        <Field
                          component={InputField}
                          name="password"
                          iconName="cil-lock-locked"
                          type="password"
                        />
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              color="primary"
                              className="px-4"
                              onClick={() => {
                                submitForm();
                              }}
                              type="submit"
                            >
                              Đăng nhập
                            </CButton>
                          </CCol>
                          <CCol xs="6" className="text-right">

                            <Link to="/forgot">
                              <CButton color="link" className="px-0">
                                Quên mật khẩu?
                              </CButton>
                            </Link>
                          </CCol>
                        </CRow>
                      </Form>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 "
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Đăng ký</h2>
                    <p>
                      Quản lý tổ chức dễ dàng hơn với SPRS site
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Đăng ký ngay!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
