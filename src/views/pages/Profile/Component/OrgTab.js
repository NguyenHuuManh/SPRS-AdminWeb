import CIcon from "@coreui/icons-react";
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTimesCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { apiGetORG, apiUpdateORG } from "src/apiFunctions/authencation";
import { trimmedObject } from "src/helps/function";
import { getProfileRequest } from "src/redux/modules/profile";
import AppTimePicker from "src/views/components/AppTimePicker";
import { appToast } from "src/views/components/AppToastContainer";
import InputField from "src/views/components/InputField";
import Mappicker from "src/views/components/Mappicker";
import { updateORG } from "../validate";
const UserTab = () => {
    const [editAble, setEditAble] = useState(false);
    const distpatch = useDispatch();
    const [org, setOrg] = useState({});
    const [orgAdress, setOrgAdress] = useState({});
    const [temAddres, setTemAddress] = useState({});
    const upateProfile = (values) => {
        apiUpdateORG(values).then((res) => {
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

    const getORG = () => {
        apiGetORG().then((res) => {
            if (res?.status === 200) {
                if (res?.data?.code === "200") {
                    setOrg(res?.data?.obj);
                    // console.log("res", res?.data?.obj.address)
                    setOrgAdress({
                        GPS_lati: res.data.obj.address?.GPS_lati || "",
                        GPS_long: res.data.obj.address?.GPS_long || "",
                        city: res.data.obj.address?.city.name || "",
                        district: res.data.obj.address?.district.name || "",
                        subDistrict: res.data.obj.address?.subDistrict.name || "",
                    });
                    setTemAddress({
                        GPS_lati: res.data.obj.address?.GPS_lati || "",
                        GPS_long: res.data.obj.address?.GPS_long || "",
                        city: res.data.obj.address?.city.name || "",
                        district: res.data.obj.address?.district.name || "",
                        subDistrict: res.data.obj.address?.subDistrict.name || "",
                    })
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

    useEffect(() => {
        getORG();
    }, [])



    return (
        <CRow>
            <CCol lg={12}>
                <Formik
                    initialValues={{
                        id: org.id,
                        name: org?.name || "",
                        founded: org?.founded || "",
                        description: org?.description || "",
                        adressString: "",
                        addressLine: org?.address?.addressLine || ""
                    }}
                    validationSchema={updateORG}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize
                    onSubmit={(values) => {
                        const objTrimmed = values
                        const body = {
                            id: objTrimmed.id,
                            name: objTrimmed.name || "",
                            founded: objTrimmed.founded || "",
                            description: objTrimmed.description || "",
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
                                addressLine: "",
                                GPS_lati: orgAdress?.GPS_lati + "",
                                GPS_long: orgAdress?.GPS_long + "",
                                gps_lati: orgAdress?.GPS_lati + "",
                                gps_long: orgAdress?.GPS_long + "",
                            },
                        }
                        upateProfile(body);
                    }}
                >
                    {({ values, submitForm, resetForm }) => (
                        <CCard>
                            <CCardHeader className="d-flex">
                                <span style={{ paddingRight: 10, cursor: "pointer" }}> Thông tin tổ chức</span>
                                <CIcon name="cil-pen" />
                                <span onClick={() => {
                                    if (editAble) {
                                        resetForm();
                                        setOrgAdress({ ...temAddres });
                                        setEditAble(false);
                                    } else {
                                        setEditAble(true);
                                    }
                                }} style={{ paddingRight: 10, paddingLeft: 10, cursor: "pointer", color: 'Highlight', justifyContent: 'center' }}>
                                    {editAble ? "Hủy" : "Chỉnh sửa"}
                                    {editAble ? <FaTimesCircle size={20} style={{ marginLeft: 10 }} /> : <FaEdit size={20} style={{ marginLeft: 10 }} />}
                                </span>
                            </CCardHeader>
                            <CCardBody>
                                <Form>
                                    <div style={{ width: "80%" }}>
                                        <CRow>
                                            <CCol md={4}>Tên tổ chức</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={InputField}
                                                    name="name"
                                                    disabled={!editAble}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol md={4}>Ngày thành lập</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={AppTimePicker}
                                                    name="founded"
                                                    disabled={!editAble}
                                                    formatDate="DD-MM-YYYY"
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol md={4}>Mô tả</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={InputField}
                                                    name="description"
                                                    disabled={!editAble}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol md={4}>Địa chỉ</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={Mappicker}
                                                    name="adressString"
                                                    adress={orgAdress}
                                                    setAdress={setOrgAdress}
                                                    iconName={"cil-map"}
                                                    disabled={!editAble}
                                                />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol md={4}>Địa chỉ chi tiết</CCol>
                                            <CCol md={4}>
                                                <Field
                                                    component={InputField}
                                                    name="addressLine"
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
        </CRow >
    )
}
export default UserTab;