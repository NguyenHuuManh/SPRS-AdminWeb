import React, { useState } from "react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { updateProfile } from "../validate";
import InputField from "src/views/components/InputField";
import AppDatePicker from "src/views/components/AppDatePicker";
import AppSelectTinh from "src/views/components/AppSelectTinh";
import AppSelectHuyen from "src/views/components/AppSelectHuyen";
import AppSelectXa from "src/views/components/AppSelectXa";
import CIcon from "@coreui/icons-react";
import { appToast } from "src/views/components/AppToastContainer";
import { getProfileRequest } from "src/redux/modules/profile";
import { apiUpdate } from "src/apiFunctions/authencation";
import { trimmedObject } from "src/helps/function";
import AppTimePicker from "src/views/components/AppTimePicker";
const UserTab = () => {
    const profile = useSelector((state) => state.profileReducer);
    const [tinh, setTinh] = useState(profile.data.profile?.address?.city);
    const [huyen, setHuyen] = useState(profile.data.profile?.address?.district);
    const [editAble, setEditAble] = useState(false);
    const distpatch = useDispatch();
    const upateProfile = (values) => {
        apiUpdate(values).then((res) => {
            if (res.status == 200) {
                if (res.data.code == "200") {
                    appToast({
                        toastOptions: { type: "success" },
                        description: "Cập nhật thông tin thành công",
                    });
                    distpatch(getProfileRequest());
                    setEditAble(false);
                    return;
                }
                appToast({
                    toastOptions: { type: "error" },
                    description: res.data.message,
                });
                return;
            }
            appToast({
                toastOptions: { type: "error" },
                description: "Chức năng đang bảo trì",
            });
        })
    }
    return (
        <CRow>
            <CCol lg={12}>
                <Formik
                    initialValues={{
                        username: profile.data.profile.username,
                        phone: profile.data.profile.phone,
                        full_name: profile.data.profile?.full_name,
                        dob: profile.data.profile?.dob,
                        city: profile.data.profile?.address?.city.id || "",
                        district: profile.data.profile?.address?.district.id || "",
                        subDistrict: profile.data.profile?.address?.subDistrict.id || "",
                        addressLine: "",
                        adresslineORG: "",
                        adressString: "",
                    }}
                    validationSchema={updateProfile}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onSubmit={(values) => {
                        const objTrimmed = trimmedObject(values)
                        const { city, district, subDistrict, addressLine, groupsId, ...body } = objTrimmed

                        const dataBody = {
                            ...body,
                            address: {
                                city: {
                                    code: "",
                                    id: values.city,
                                    name: ""
                                },
                                district: {
                                    code: "",
                                    id: values?.district,
                                    name: ""
                                },
                                subDistrict: {
                                    code: "",
                                    id: values?.subDistrict,
                                    name: "",
                                },
                                addressLine: values?.addressLine,
                            },
                        }
                        upateProfile(dataBody);
                    }}
                >
                    {({ values, submitForm, resetForm }) => (
                        <CCard>
                            <CCardHeader className="d-flex">
                                <span style={{ paddingRight: 10, cursor: "pointer" }}> Thông tin tài khoản</span>
                                <CIcon name="cil-pen" />
                                <span onClick={() => {
                                    if (editAble) {
                                        resetForm();
                                        setEditAble(false);
                                        setTinh(profile.data.profile?.address?.city);
                                        setHuyen(profile.data.profile?.address?.district);
                                    } else {
                                        setEditAble(true);
                                    }
                                }} style={{ paddingRight: 10, paddingLeft: 10, cursor: "pointer" }}>
                                    {editAble ? "Hủy" : "Chỉnh sửa"}
                                </span>
                            </CCardHeader>
                            <CCardBody>
                                <Form>
                                    <div style={{ width: "80%" }}>
                                        <CRow>
                                            <CCol md={4}>Họ và tên</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={InputField}
                                                    name="full_name"
                                                    disabled={!editAble}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol md={4}>Tên tài khoản</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={InputField}
                                                    name="username"
                                                    disabled={true}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol md={4}>Số điện thoại</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={InputField}
                                                    name="phone"
                                                    // isPhone
                                                    disabled={!editAble}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol md={4}>Ngày sinh</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={AppTimePicker}
                                                    name="dob"
                                                    disabled={!editAble}
                                                    formatDate="DD-MM-YYYY"
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol md={4}>Tỉnh/Thành phố</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={AppSelectTinh}
                                                    name="city"
                                                    functionProps={setTinh}
                                                    disabled={!editAble}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol md={4}>Quận/Huyện</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={AppSelectHuyen}
                                                    name="district"
                                                    idTinh={tinh?.id}
                                                    functionProps={setHuyen}
                                                    disabled={!editAble}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol md={4}>Xã/Phường</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={AppSelectXa}
                                                    name="subDistrict"
                                                    idHuyen={huyen?.id}
                                                    disabled={!editAble}
                                                />
                                            </CCol>
                                        </CRow>
                                    </div>
                                    {editAble && (
                                        <CButton color="primary" onClick={() => { submitForm() }}>
                                            Lưu
                                        </CButton>
                                    )}
                                </Form>
                            </CCardBody>
                        </CCard>
                    )}
                </Formik>

            </CCol>
        </CRow>
    )
}
export default UserTab;