import { CButton, CCard, CCardBody, CCardHeader, CCol, CModal, CRow } from '@coreui/react'
import { Field, Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { apiUpdateEvent, apiUploadImg } from 'src/apiFunctions/Event';
import { IMAGE_URL } from 'src/constrants/action';
import AppTimePicker from 'src/views/components/AppTimePicker';
import { appToast } from 'src/views/components/AppToastContainer';
import ImagePicker from 'src/views/components/ImagePicker';
import InputField from 'src/views/components/InputField';
import Mappicker from 'src/views/components/Mappicker';
import TextAreaField from 'src/views/components/TextAreaField';
import { updateEventValidation } from '../validate';
import CartTable from './CartTable';
const EventUpdate = (props) => {
    const { isOpen, setIsOpen, data, setPageSize, pageSize, setLoading } = props;
    const [items, setItems] = useState([]);
    const [address, setAddress] = useState({});
    const [image, setImage] = useState(false);
    const [dataInfor, setDataInfor] = useState({});

    useEffect(() => {
        if (isOpen && data?.address) {
            // console.log(data.address, 'data.address');
            setAddress({
                GPS_lati: data.address?.GPS_lati || "",
                GPS_long: data.address?.GPS_long || "",
                city: data.address?.city.name || "",
                district: data.address?.district.name || "",
                subDistrict: data.address?.subDistrict.name || "",
            });
            setItems([...data.reliefInformations]);
            setDataInfor({ ...data });
            setImage('');
        }
    }, [isOpen, data]);

    const updateImg = () => {
        if (isEmpty(image)) {
            appToast({
                toastOptions: { type: "error" },
                description: "Bạn chưa chọn ảnh nào",
            });
            return;
        }

        const bodyImage = {
            imageName: image.file.name,
            encodedImage: image.base64,
            id: data.id
        }
        apiUploadImg(bodyImage).then((response) => {
            setLoading(true);
            if (response.status == 200) {
                if (response.data.code == '200') {
                    return;
                }

                appToast({
                    toastOptions: { type: "error" },
                    description: response?.data?.message,
                });
                return;
            }
            appToast({
                toastOptions: { type: "error" },
                description: 'Chức năng đang bảo trì',
            });
        }).finally(() => {
            setImage(false);
            setLoading(false);
        })
    }
    const callUpdate = (body) => {
        if (image) {
            updateImg();
        }
        apiUpdateEvent(body).then((e) => {
            if (e.status == 200) {
                if (e.data.code == '200') {
                    appToast({
                        toastOptions: { type: "success" },
                        description: "Cập nhật thành công",
                    });
                    setPageSize({ ...pageSize });
                    setIsOpen(false)
                } else {
                    appToast({
                        toastOptions: { type: "error" },
                        description: e?.data?.message,
                    });
                }
            } else {
                appToast({
                    toastOptions: { type: "error" },
                    description: 'Hệ thống đang bảo trì',
                });
            }
        })
    }

    return (
        <CModal
            show={isOpen}
            onClose={() => {
                setIsOpen(false)
            }}
            closeOnBackdrop={false}
            size='xl'
        >
            <CCard>
                <CCardHeader>Cập nhật điểm cứu trợ</CCardHeader>
                <CCardBody>
                    <CRow>
                        <CCol lg={6}>
                            <CRow>
                                <CCol lg={12}>
                                    <CartTable items={items} setItems={setItems} />
                                </CCol>
                            </CRow>
                        </CCol>
                        <CCol lg={6}>
                            <CRow>
                                <CCol lg={12}>
                                    <Formik
                                        validationSchema={updateEventValidation}
                                        initialValues={{
                                            open_time: dataInfor.open_time,
                                            close_time: dataInfor.close_time,
                                            name: dataInfor.name,
                                            description: dataInfor.description,
                                        }}
                                        enableReinitialize
                                        validateOnChange={false}
                                        validateOnBlur={false}
                                        onSubmit={(values) => {
                                            if (isEmpty(items)) {
                                                appToast({
                                                    toastOptions: { type: "error" },
                                                    description: "Chọn ít nhất một mặt hàng",
                                                });
                                                return;
                                            }
                                            const body = {
                                                ...values,
                                                id: dataInfor.id,
                                                reliefInformations: items.map((e) => {
                                                    return {
                                                        id: e.id,
                                                        quantity: e.quantity,
                                                        item: {
                                                            id: e.item.id
                                                        }
                                                    }
                                                }),
                                                address: {
                                                    id: dataInfor.address.id,
                                                    city: {
                                                        code: "",
                                                        id: "",
                                                        name: address.city
                                                    },
                                                    district: {
                                                        code: "",
                                                        id: "",
                                                        name: address?.district,
                                                    },
                                                    subDistrict: {
                                                        code: "",
                                                        id: "",
                                                        name: address?.subDistrict,
                                                    },
                                                    addressLine: "",
                                                    addressLine2: "",
                                                    GPS_lati: address?.GPS_lati,
                                                    GPS_long: address?.GPS_long
                                                },
                                            }
                                            delete body.adressString
                                            callUpdate(body);
                                        }}
                                    >
                                        {({ values, resetForm }) => (
                                            <Form>
                                                <CRow>
                                                    <CCol lg={12}>
                                                        <CRow>
                                                            <CCol lg={12}>
                                                                <div style={{ width: '100%', display: 'flex' }}>
                                                                    <div style={{ width: '50%', height: 235 }}>
                                                                        <ImagePicker image={image} setImage={setImage} imageUrl={`${IMAGE_URL}${dataInfor?.images?.img_url}`} />
                                                                    </div>
                                                                    <div style={{ width: '50%', paddingLeft: 20 }}>
                                                                        <Field
                                                                            maxTitle={170}
                                                                            component={InputField}
                                                                            name="name"
                                                                            title="Tên Điểm cứu trợ"
                                                                        />
                                                                        <Field
                                                                            component={AppTimePicker}
                                                                            name="open_time"
                                                                            title="thời gian mở cửa"
                                                                        />
                                                                        <Field
                                                                            component={AppTimePicker}
                                                                            name="close_time"
                                                                            title="thời gian đóng cửa"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </CCol>
                                                            <CCol lg={12}>
                                                                {
                                                                    data?.address && (
                                                                        <Field
                                                                            maxTitle={170}
                                                                            component={Mappicker}
                                                                            name="adressString"
                                                                            title="Địa chỉ"
                                                                            adress={address}
                                                                            setAdress={setAddress}
                                                                            iconName={"cil-map"}
                                                                        />
                                                                    )
                                                                }
                                                            </CCol>
                                                            <CCol lg={12}>
                                                                <div style={{ height: 110 }}>
                                                                    <Field
                                                                        title="Mô tả"
                                                                        component={TextAreaField}
                                                                        name="description"
                                                                        type="TextArea"
                                                                    />
                                                                </div>
                                                            </CCol>
                                                        </CRow>
                                                    </CCol>
                                                </CRow>
                                                <CRow>
                                                    <CCol md={12}>
                                                        <div className="d-flex justify-content-end align-items-end" style={{ width: "100%", paddingTop: 40 }}>
                                                            <CButton type="button" color="primary" style={{ marginRight: 10 }} onClick={() => { setIsOpen(false); resetForm() }}>Hủy</CButton>
                                                            {/* <CButton type="button" color="primary" style={{ marginRight: 10 }} onClick={() => { updateImg() }}>Cập nhật ảnh</CButton> */}
                                                            <CButton type="submit" color="primary" >Cập nhật thông tin</CButton>
                                                        </div>
                                                    </CCol>
                                                </CRow>
                                            </Form>
                                        )}
                                    </Formik>
                                </CCol>
                            </CRow>
                        </CCol>
                    </CRow>
                </CCardBody>
            </CCard>
        </CModal >
    )
}
export default React.memo(EventUpdate);