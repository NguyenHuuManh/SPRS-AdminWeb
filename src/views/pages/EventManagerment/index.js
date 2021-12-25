import { CButton, CCard, CCardBody, CCardHeader, CCol, CInput, CInputGroup, CPagination, CRow } from "@coreui/react";
import { Field, Formik } from "formik";
import { debounce } from "lodash-es";
import React, { useCallback, useEffect, useState } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { apiDeleteEvent, apiUpdateStatusReliefPoint, getEvents } from "src/apiFunctions/Event";
import { calcItemStart } from "src/helps/function";
import AppSelectStautusEvent from "src/views/components/AppSelectStautusEvent";
import { appToast } from "src/views/components/AppToastContainer";
import EventDetail from "./Components/EventDetail";
import EventUpdate from "./Components/EventUpdate";
import AppLoading from "src/views/components/AppLoading";
const size = 10;
const page = 1
const EventManagerment = () => {
    const [itemSelected, setItemSelected] = useState({});
    const [data, setData] = useState({});
    const [key, setKey] = useState("");
    const [pageSize, setPageSize] = useState({ page: page, size: size });
    const [status, setStatus] = useState(2);
    const [sort, setSort] = useState(true);
    const [detail, setDetail] = useState(false);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);

    const searchByName = (key) => {
        const param = {
            pageSize: pageSize.size,
            pageIndex: pageSize.page - 1,
            search: key,
            sort: sort,
            status_store: status
        }
        setLoading(true);
        getEvents(param).then((e) => {
            if (e?.status == 200) {
                if (e.data.code === '200') {
                    setData(e.data.obj);
                    const clone = e.data.obj?.reliefs?.filter((e) => e.id == itemSelected?.id)?.[0];
                    setItemSelected({ ...clone });
                }
            } else {
                appToast({
                    toastOptions: { type: "error" },
                    description: "Chức năng đang bảo trì",
                });
                setData({});
            }

        }).finally(() => { setLoading(false) })
    }
    const deleteEvent = (item) => {
        confirmAlert({
            title: 'Xóa Sự kiện',
            message: 'Bạn có chắc chắn xóa sự kiện ' + item?.name,
            buttons: [
                {
                    label: 'Đồng ý',
                    onClick: () => {
                        apiDeleteEvent({ id: item?.id }).then((e) => {
                            if (e?.status == 200) {
                                if (e?.data?.code == '200') {
                                    appToast({
                                        toastOptions: { type: "success" },
                                        description: "Xóa thành công sự kiện",
                                    });
                                    setPageSize({ ...pageSize, page: page, size: size });
                                    return;
                                }
                                appToast({
                                    toastOptions: { type: "error" },
                                    description: e?.data?.message,
                                });
                                return;
                            }
                            appToast({
                                toastOptions: { type: "error" },
                                description: "Chức năng đang bảo trì",
                            });
                        })
                    }
                },
                {
                    label: 'Hủy',
                    onClick: () => { }
                }
            ]
        });
        // return;

    }

    const debounceSearch = useCallback(debounce((key) => { setPageSize({ ...pageSize, page: page, size: size }) }, 500), []);

    useEffect(() => {
        searchByName(key);
    }, [pageSize]);

    const ChangeStatusPoint = (item) => {
        confirmAlert({
            title: `${item.status == 1 ? "Bật điểm sự kiện" : "Tắt điểm sự kiện"}`,
            message: `${item.status == 1 ? "Hệ thống sẽ tự động cập nhật lại ngày giờ mở cửa của điểm cứu trợ là ngày giờ hiện tại " : "Hệ thống sẽ tự động cập nhật lại ngày giờ đóng cửa của điểm cứu trợ là ngày giờ hiện tại"}`,
            buttons: [
                {
                    label: 'Đồng ý',
                    onClick: () => {
                        apiUpdateStatusReliefPoint({ id: item.id, status: item.status }).then((response) => {
                            if (response.status == 200) {
                                if (response.data.code == "200") {
                                    setPageSize({ ...pageSize })
                                    return
                                }
                                appToast({
                                    toastOptions: { type: "error" },
                                    description: response.data.message,
                                });
                                return
                            }
                            appToast({
                                toastOptions: { type: "error" },
                                description: "Chức năng đang bảo trì",
                            });

                        })
                    }
                },
                {
                    label: 'Hủy',
                    onClick: () => { }
                }
            ]
        });

    }

    const pageChange = (newPage) => {
        setPageSize({ ...pageSize, page: newPage });
    };

    const onChange = (values) => {
        setKey(values.target.value);
        debounceSearch(values.target.value);
    }

    return (
        <CCard>
            <AppLoading isOpen={loading} />
            <CCardHeader>
                <CRow>
                    <CCol md={6}>
                        Danh sách sự kiện
                    </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
                <Formik
                    initialValues={{
                        status: "",
                    }}
                >
                    {() => (
                        <>
                            <CRow>
                                <CCol md={3}>
                                    <label className="inputTitle">Tìm kiếm</label>
                                    <CInputGroup className="mb-3" style={{ display: "flex", borderRadius: 10 }}>
                                        <CInput
                                            placeholder="Nhập tên tài khoản . . ."
                                            onChange={onChange}
                                            value={key}
                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol md={3}>
                                    <Field
                                        component={AppSelectStautusEvent}
                                        name='status'
                                        title="Trạng thái"
                                        functionProps={(item) => {
                                            if (item?.id == 0 || item?.id == 1) {
                                                setStatus(item?.id);
                                            } else {
                                                setStatus(2);
                                            }
                                            setPageSize({ ...pageSize, page: 1, size: size })
                                        }}
                                    />
                                </CCol>
                            </CRow>
                        </>
                    )}
                </Formik>
                <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <table className="table table-hover">
                        <thead className="table-active">
                            <th>STT</th>
                            <th>Tên Điểm</th>
                            <th>Ngày tạo</th>
                            <th>Ngày mở cửa</th>
                            <th>Ngày đóng cửa</th>
                            <th>Địa chỉ</th>
                            <th>Trạng thái</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </thead>
                        <tbody>
                            {
                                data?.reliefs?.map((item, index) => {
                                    return (
                                        <tr
                                            key={item.id}
                                            className={`${item.id == itemSelected?.id && "table-active"}`}
                                            onClick={() => { setItemSelected(item) }}
                                        >
                                            <td>{calcItemStart(pageSize.page, pageSize.size) + index}</td>
                                            <td>{item?.name}</td>
                                            <td>{item?.create_time}</td>
                                            <td>{item?.open_time}</td>
                                            <td>{item?.close_time}</td>
                                            <td>{item?.address?.subDistrict.name + ' ' + item?.address?.district.name + ' ' + item?.address?.city.name}</td>
                                            <td
                                                style={{
                                                    color: item?.status == 0 ? 'orange'
                                                        : item?.status == 1 ? '#32a864' :
                                                            item?.status == 2 ? 'gray' :
                                                                item?.status == 3 ? 'red' : ''
                                                }}>
                                                {
                                                    item?.status == 0 ? 'Đã kết thúc'
                                                        : item?.status == 1 ? 'Đang hoạt động' :
                                                            item?.status == 2 ? 'Chưa diễn ra' :
                                                                item?.status == 3 ? 'Ngừng hoạt động' : ''}
                                            </td>
                                            <td>
                                                <CButton
                                                    color="info"
                                                    onClick={() => { setDetail(true) }}
                                                    style={{ minWidth: 100 }}
                                                >Xem chi tiết</CButton>
                                            </td>
                                            <td>
                                                <CButton
                                                    color={item?.status == 1 ? "warning" : "secondary"}
                                                    onClick={() => {
                                                        if (item.status + '' == '0') {
                                                            confirmAlert({
                                                                title: 'Bật điểm cứu trợ',
                                                                message: 'Thời gian kết thúc của điểm đã vượt quá ngày hiện tại, cập nhật lại thời gian nếu bạn muốn bật lại điểm',
                                                                buttons: []
                                                            });
                                                            return;
                                                        }
                                                        if (item.status + '' == '2') {
                                                            confirmAlert({
                                                                title: 'Bật điểm cứu trợ',
                                                                message: 'Thời gian bắt đầu của điểm chưa đến ngày hiện tại, cập nhật lại thời gian nếu bạn muốn bật điểm',
                                                                buttons: []
                                                            });
                                                            return;
                                                        }
                                                        ChangeStatusPoint({ ...item, status: item.status + '' == '3' ? 1 : 3 });
                                                    }}
                                                    style={{ minWidth: 100 }}
                                                >
                                                    {item?.status == 1 ? 'Tắt điểm' : 'Bật điểm'}
                                                </CButton>
                                            </td>
                                            <td>
                                                <CButton
                                                    color="primary"
                                                    onClick={() => { setUpdate(true) }}
                                                    style={{ minWidth: 100 }}
                                                >Cập nhật</CButton>
                                            </td>
                                            <td>
                                                <CButton
                                                    color="danger"
                                                    onClick={() => { deleteEvent(item) }}
                                                    style={{ minWidth: 100 }}
                                                >Xóa
                                                </CButton>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <EventDetail isOpen={detail} setIsOpen={setDetail} data={itemSelected} />
                        <EventUpdate isOpen={update} setIsOpen={setUpdate} data={itemSelected} pageSize={pageSize} setPageSize={setPageSize} setLoading={setLoading} />
                    </table>
                </div>

                <CPagination
                    activePage={pageSize.page}
                    onActivePageChange={pageChange}
                    pages={data?.totalPages || 1}
                    align="center"
                />
            </CCardBody>
        </CCard>
    )
}
export default EventManagerment;