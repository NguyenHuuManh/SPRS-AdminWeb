import CIcon from "@coreui/icons-react";
import { CButton, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CModal, CRow } from "@coreui/react";
import { Field, Formik } from "formik";
import { isEmpty } from "lodash";
import React, { memo, useEffect, useState, useRef } from "react";
import { Marker } from "react-google-maps";
import { API_KEY } from "src/constrants/action";
import { apiPlaceDetailById, apiPlaceDetailByLongLat } from "../../../apiFunctions/mapPlace";
import AppSearchLocation from "../AppSearchLocation";
import { appToast } from "../AppToastContainer";
import Map from "../Map";
export default memo((props) => {
    const [isOpen, setIsOpen] = useState(false);
    const { form, field, title, maxTitle, horizontal, iconName, adress, setAdress, disabled, readOnly } = props
    const [marker, setMarker] = useState({});
    const { errors, touched, setFieldValue } = form;
    const { name, value } = field;
    const ref = useRef();
    useEffect(() => {
        if (!isOpen) return;
        if (adress && !isEmpty(adress)) {
            setMarker({ ...marker, lat: Number(adress.GPS_lati), lng: Number(adress?.GPS_long) })
            return;
        }
        navigator.geolocation.getCurrentPosition((e) => {
            setMarker({ ...marker, lat: e?.coords?.latitude, lng: e?.coords?.longitude })
        })
    }, [isOpen])

    useEffect(() => {
        setFieldValue(name, isEmpty(adress) ? `` : `${adress?.city}-${adress?.district}-${adress?.subDistrict}`);
    }, [adress]);

    const getDetailPlace = () => {
        apiPlaceDetailByLongLat(marker?.lng, marker?.lat)
            .then(res => {
                if (res.status !== 200) {
                    appToast({
                        toastOptions: { type: "error" },
                        description: "hệ thống đang bảo trì",
                    });
                    return;
                }

                return res.json();
            })
            .then((e) => {
                if (e?.status == "OK") {
                    const place = e?.results[0]?.address_components;
                    setAdress({
                        ...adress,
                        city: place[place.length - 1]?.long_name,
                        province: place[place.length - 2]?.long_name,
                        district: place[place.length - 2]?.long_name,
                        subDistrict: place[place.length - 3]?.long_name,
                        GPS_lati: marker?.lat + "",
                        GPS_long: marker?.lng + "",
                    })
                } else {
                    appToast({
                        toastOptions: { type: "error" },
                        description: "hệ thống đang bảo trì",
                    });
                    return;
                }
            })
    }

    const getDetailPlaceById = (place_id) => {
        apiPlaceDetailById(place_id)
            .then(res => {
                if (res.status !== 200) {
                    appToast({
                        toastOptions: { type: "error" },
                        description: "hệ thống đang bảo trì",
                    });
                    return;
                }

                return res.json();
            })
            .then((e) => {
                // console.log("e", e)
                if (e?.status == "OK") {
                    setMarker({ ...marker, lat: e?.result?.geometry.location.lat, lng: e?.result?.geometry.location.lng });
                    ref.current.panTo({ lat: e?.result?.geometry.location.lat, lng: e?.result?.geometry.location.lng });
                } else {
                    appToast({
                        toastOptions: { type: "error" },
                        description: "hệ thống đang bảo trì",
                    });
                    return;
                }
            })
    }

    useEffect(() => {
        if (isEmpty(marker) || readOnly) return;
        getDetailPlace();
    }, [marker])
    return (
        <>
            {(!horizontal) && title && (
                <label className="inputTitle">{title}</label>
            )}
            <div style={{ display: "flex" }}>
                {
                    horizontal && (
                        <label className="inputTitle" style={{ width: maxTitle || 150 }}>{title}</label>
                    )
                }
                <CInputGroup className="mb-3" style={{ display: "flex" }}>
                    <div style={{ width: "100%", display: "block", flex: 1 }}>
                        <CInput
                            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                            readOnly
                            style={{ backgroundColor: "#FFF" }}
                            onClick={() => {
                                if (disabled) return;
                                setIsOpen(!isOpen)
                            }}
                            value={isEmpty(adress) ? `` : `${adress?.city}-${adress?.district}-${adress?.subDistrict}`}
                        />
                        {errors[name] && <div className="err-text" >{errors[name]}</div>}
                    </div>
                    <div>
                        {
                            iconName && (
                                <CInputGroupPrepend style={{ marginLeft: -2 }}>
                                    <CInputGroupText style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                                        <CIcon name={iconName} height={21} />
                                    </CInputGroupText>
                                </CInputGroupPrepend>
                            )
                        }
                    </div>
                </CInputGroup>
            </div>
            <CModal
                show={isOpen}
                onClose={setIsOpen}
                id="MapPicker"
            >
                <CCardHeader>Tìm kiếm địa điểm</CCardHeader>
                {
                    isOpen && !readOnly && (
                        <Formik
                            initialValues={{
                                placeID: ""
                            }}
                            onSubmit={(values) => {
                                getDetailPlaceById(values.placeID);
                            }}
                        >
                            {({ submitForm }) => (
                                <div style={{ paddingLeft: 50, paddingRight: 50 }}>
                                    <Field
                                        component={AppSearchLocation}
                                        name="placeID"
                                        defaultKey={adress?.subDistrict}
                                        functionProps={(e) => {
                                            submitForm()
                                        }}
                                        mapRef={ref}
                                    />
                                </div>
                            )}
                        </Formik>
                    )
                }
                <CCardBody>
                    <CRow>
                        <CCol md={4}>
                            <CLabel>Tỉnh/Thành phố: </CLabel>
                        </CCol>
                        <CCol md={8}>
                            <CLabel>{adress?.city}</CLabel>
                        </CCol>
                        <CCol md={4}>
                            <CLabel>Quận/Huyện: </CLabel>
                        </CCol>
                        <CCol md={8}>
                            <CLabel>{adress?.district}</CLabel>
                        </CCol>
                        <CCol md={4}>
                            <CLabel>Xã/Phường: </CLabel>
                        </CCol>
                        <CCol md={8}>
                            <CLabel>{adress?.subDistrict}</CLabel>
                        </CCol>
                        <CCol md={2}>
                            <CLabel>Lat: </CLabel>
                        </CCol>
                        <CCol md={4}>
                            <CLabel>{marker?.lat}</CLabel>
                        </CCol>
                        <CCol md={2}>
                            <CLabel>Lng: </CLabel>
                        </CCol>
                        <CCol md={4}>
                            <CLabel>{marker?.lng}</CLabel>
                        </CCol>
                    </CRow>
                </CCardBody>
                <CCardBody>
                    {isOpen && (
                        <Map
                            refMap={ref}
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `40vh`, margin: `auto`, border: '2px solid black' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            onClick={(res) => { !readOnly && setMarker({ lat: res.latLng.lat(), lng: res.latLng.lng() }) }}
                            defaultCenter={marker}
                            cernter={marker}
                        >
                            <Marker
                                position={marker}
                            />
                        </Map>
                    )}
                </CCardBody>
                <CButton onClick={() => { setIsOpen(false) }}>Xong</CButton>
            </CModal>

        </>
    )
})