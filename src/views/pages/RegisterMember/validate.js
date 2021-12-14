import moment from "moment";
import { removeAscent } from "src/helps/function";
import * as Yup from "yup";

export const register = Yup.object().shape({
    username: Yup.string().required("Tên tài khoản không được bỏ trống").nullable()
        .test("test", "Tên tài khoản tối thiểu 4, tối đa 16 kí tự chỉ gồm chữ không dấu và số", function () {
            const { parent } = this;
            const { username } = parent;
            var format = /^[0-9\s]{4,16}$/;
            var format1 = /^[0-9A-Za-z\s\-]{4,16}$/;
            return format1.test(username?.trim()) && !format.test(username?.trim());
        }),
    phone: Yup.string().required("Số điện thoại không được bỏ trống").nullable().test('checkphone', "Số điện thoại không hợp lệ", function () {
        const { parent } = this;
        const { phone } = parent;
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        return vnf_regex.test(phone);
    }),
    password: Yup.string().required("Mật khẩu không được bỏ trống").nullable()
        .test('checkSpace', "Mật khẩu không chứa khoảng trắng", function () {
            const { parent } = this;
            const { password } = parent;
            const regex = /\s/;
            return !regex.test(password)
        })
        .test("test", "Mật khẩu phải có cả chữ, sô, kí tự đặc biệt và tối thiểu 8 kí tự", function () {
            const { parent } = this;
            const { password } = parent;
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
            return regex.test(password);
        }),
    full_name: Yup.string().required("Họ và tên không được bỏ trống").nullable()
        .test("test", "Họ và tên không chứa số, kí tự đặc biệt và ít nhất 4 ký tự chữ", function () {
            const { parent } = this;
            const { full_name } = parent;
            const nameStrim = removeAscent(full_name);
            let regex = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/
            return regex.test(nameStrim?.trim());
        }),
    dob: Yup.string().required("Ngày sinh không được bỏ trống").nullable()
        .test("test", "Thời gian đóng cửa phải sau thời gian hiện tại", function () {
            const { parent } = this;
            const { dob } = parent;
            console.log('dob', dob)
            const currentDate = moment().format('DD-MM-YYYY');
            return moment(dob, 'DD-MM-YYYY').isSameOrBefore(moment(currentDate, 'DD-MM-YYYY'))
        }),
    city: Yup.string().required("Tỉnh/Thành phố không được bỏ trống").nullable(),
    district: Yup.string().required("Quận/Huyện không được bỏ trống").nullable(),
    subDistrict: Yup.string().required("Xã phường không được bỏ trống").nullable(),
    rePassWord: Yup.mixed().required("Xác minh mật khẩu").test("test", "Mật khẩu không khớp", function () {
        const { parent } = this;
        const { rePassWord, password } = parent;
        return rePassWord == password

    }),

});
