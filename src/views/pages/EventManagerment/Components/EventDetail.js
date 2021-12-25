import { CCardBody, CCol, CModal, CModalBody, CModalFooter, CModalHeader, CRow } from '@coreui/react';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { IMAGE_URL } from 'src/constrants/action';
import AppTimePicker from 'src/views/components/AppTimePicker';
import ImagePicker from 'src/views/components/ImagePicker';
import InputField from 'src/views/components/InputField';
import Mappicker from 'src/views/components/Mappicker';
import TextAreaField from 'src/views/components/TextAreaField';
const EventDetail = (props) => {
    const { isOpen, setIsOpen, data } = props;
    const [address, setAddress] = useState({});
    useEffect(() => {
        if (isOpen && data?.address) {
            setAddress({
                GPS_lati: data.address?.GPS_lati || "",
                GPS_long: data.address?.GPS_long || "",
                city: data.address?.city.name || "",
                district: data.address?.district.name || "",
                subDistrict: data.address?.subDistrict.name || "",
            });
        }
    }, [isOpen, data]);
    // console.log(address, 'address')
    return (
        <CModal
            show={isOpen}
            onClose={setIsOpen}
            size='xl'
        >
            <CModalHeader>Thông tin sự kiện</CModalHeader>
            <CModalBody>
                <Formik
                    initialValues={{
                        open_time: data.open_time,
                        close_time: data.close_time,
                        name: data.name,
                        description: data.description,
                    }}
                    enableReinitialize
                    onSubmit={(values) => { }}
                >
                    {({ values }) => (
                        <>
                            <CRow>
                                <CCol lg={6}>
                                    <CCardBody>
                                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                                            <table className="table table-hover">
                                                <thead className="table-active">
                                                    <th>Tên mặt hàng</th>
                                                    <th>Số lượng</th>
                                                    <th></th>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.reliefInformations?.map((e, index) => {
                                                            return (
                                                                <tr
                                                                    key={e.item.id}
                                                                >
                                                                    <td>{e.item.name}</td>
                                                                    <td>{e.quantity + ' ' + e.item.unit}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </CCardBody>
                                </CCol>

                                <CCol lg={6}>
                                    <CRow>
                                        <CCol lg={12}>
                                            <div style={{ width: '100%', display: 'flex' }}>
                                                <div style={{ width: '50%', height: 235 }}>
                                                    <ImagePicker imageUrl={`${IMAGE_URL}${data?.images?.img_url}`} disabled />
                                                </div>
                                                <div style={{ width: '50%', paddingLeft: 20 }}>
                                                    <Field
                                                        maxTitle={170}
                                                        component={InputField}
                                                        name="name"
                                                        title="Tên Điểm cứu trợ"
                                                        disabled={true}
                                                    />
                                                    <Field
                                                        component={AppTimePicker}
                                                        name="open_time"
                                                        title="thời gian mở cửa"
                                                        disabled={true}
                                                    />
                                                    <Field
                                                        component={AppTimePicker}
                                                        name="close_time"
                                                        title="thời gian đóng cửa"
                                                        disabled={true}
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
                                                        readOnly
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
                                                    disabled={true}
                                                />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </>
                    )}
                </Formik>
            </CModalBody>
            <CModalFooter></CModalFooter>
        </CModal >
        // <></>
    )
}
export default React.memo(EventDetail);