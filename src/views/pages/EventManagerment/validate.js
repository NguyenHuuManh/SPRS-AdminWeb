import moment from "moment";
import * as Yup from "yup";


export const addCart = Yup.object().shape({
    id: Yup.string().required("chọn loại mặt hàng").nullable(),
    quantity: Yup.number().required("nhập số lượng").nullable()
        .test("test", "số lượng phải lớn hơn 0", function () {
            const { parent } = this;
            const { quantity } = parent;
            return quantity > 0;
        }),
});


export const updateEventValidation = Yup.object().shape({
    open_time: Yup.string().required("Nhập thời gian bắt đầu").nullable(),
    close_time: Yup.string().required("Nhập thời gian kết thúc").nullable()
        .test("test", "Thời gian đóng cửa phải sau thời gian mở cửa", function () {
            const { parent } = this;
            const { open_time, close_time } = parent;
            return moment(open_time, 'DD-MM-YYYY HH:mm').isBefore(moment(close_time, 'DD-MM-YYYY HH:mm'))
        }),
});

