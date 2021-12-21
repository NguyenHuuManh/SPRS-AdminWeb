import { isEmpty } from "lodash";
import moment from "moment";
import * as Yup from "yup";

function compareTime(str1, str2) {
    if (str1 === str2) {
        return false;
    }
    var time1 = str1.split(':');
    var time2 = str2.split(':');
    if (eval(time1[0]) > eval(time2[0])) {
        return true;
    } else if (eval(time1[0]) == eval(time2[0]) && eval(time1[1]) >= eval(time2[1])) {
        return true;
    } else {
        return false;
    }
}

function compareTime1(str1, str2) {
    if (str1 === str2) {
        return false;
    }
    var time1 = str1.split(':');
    var time2 = str2.split(':');
    if (eval(time1[0]) > eval(time2[0])) {
        return true;
    } else if (eval(time1[0]) == eval(time2[0]) && eval(time1[1]) > eval(time2[1])) {
        return true;
    } else {
        return false;
    }
}

export const addCard = Yup.object().shape({
    id: Yup.string().required("chọn loại mặt hàng").nullable(),
    quantity: Yup.number().required("nhập số lượng").nullable()
        .test("test", "số lượng phải lớn hơn 0", function () {
            const { parent } = this;
            const { quantity } = parent;
            return quantity > 0;
        }),
});

export const addEvent = Yup.object().shape({
    open_Hour_time: Yup.string().required("không được bỏ trống").nullable().test("test", "Thời gian bắt đầu không được nhỏ hơn thời gian hiện tại", function () {
        const { parent } = this;
        const { open_Date_time, open_Hour_time } = parent;
        if (!open_Date_time || isEmpty(open_Date_time)) return false;
        const current = moment().format("YYYY-MM-DD HH:mm").split(' ');
        console.log('open_Date_time', moment(open_Date_time).format('YYYY-MM-DD'));
        console.log(moment(current[0]).format('YYYY-MM-DD'), 'currentdate');
        if (moment(open_Date_time).format('YYYY-MM-DD') == moment(current[0]).format('YYYY-MM-DD')) {
            if (compareTime(open_Hour_time, current[1])) return true
            return false;
        }
        return true
    }),
    open_Date_time: Yup.string().required("không được bỏ trống").nullable().test("test", "Thời gian bắt đầu không được nhỏ hơn thời hiện tại", function () {
        const { parent } = this;
        const { open_Date_time } = parent;
        if (!open_Date_time || isEmpty(open_Date_time)) return false;
        const arr = open_Date_time.split("-");
        let dateStr = arr[2] + arr[1] + arr[0];
        if (moment(moment(dateStr).valueOf()).isSameOrAfter(moment().format("YYYY-MM-DD"))) {
            return true;
        }
        return false
    }),

    close_Hour_time: Yup.string().required("không được bỏ trống").nullable().test("test", "Thời gian kết thức không được nhỏ hơn thời gian bắt đầu", function () {
        const { parent } = this;
        const { open_Date_time, close_Date_time, close_Hour_time, open_Hour_time } = parent;
        if (!open_Date_time || isEmpty(open_Date_time)) return false;
        if (moment(open_Date_time).format('YYYY-MM-DD') == moment(close_Date_time).format('YYYY-MM-DD')) {
            if (compareTime1(close_Hour_time, open_Hour_time)) return true
            return false;
        }
        return false
    }),
    close_Date_time: Yup.string().required("không được bỏ trống").nullable().test("test", "Thời gian kết thức không được nhỏ hơn thời gian bắt đầu", function () {
        const { parent } = this;
        const { open_Date_time, close_Date_time } = parent;
        if (moment(moment(close_Date_time).valueOf()).isSameOrAfter(moment(open_Date_time).valueOf())) {
            return true;
        }
        return false
    }),
});

export const createEventValidation = Yup.object().shape({
    open_time: Yup.string().required("Nhập thời gian bắt đầu").nullable()
        .test("test", "Thời gian đóng cửa phải sau thời gian hiện tại", function () {
            const { parent } = this;
            const { open_time } = parent;
            const currentDate = moment().format('DD-MM-YYYY HH:mm');
            return moment(open_time, 'DD-MM-YYYY HH:mm').isSameOrAfter(moment(currentDate, 'DD-MM-YYYY HH:mm'));
        }),
    close_time: Yup.string().required("Nhập thời gian kết thúc").nullable()
        .test("test", "Thời gian đóng cửa phải sau thời gian mở cửa", function () {
            const { parent } = this;
            const { open_time, close_time } = parent;
            return moment(open_time, 'DD-MM-YYYY HH:mm').isBefore(moment(close_time, 'DD-MM-YYYY HH:mm'))
        }),
});

