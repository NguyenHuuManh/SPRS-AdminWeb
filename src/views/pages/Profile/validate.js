import moment from "moment";
import { removeAscent } from "src/helps/function";
import * as Yup from "yup";

export const updateProfile = Yup.object().shape({
    username: Yup.string().required("Tên tài khoản không được bỏ trống").nullable()
        .test("test", "Tên tài khoản tối thiểu 4, tối đa 16 kí tự chỉ gồm chữ không dấu và số", function () {
            const { parent } = this;
            const { username } = parent;
            var format = /^[0-9]{4,16}$/;
            var format1 = /^[0-9A-Za-z]{4,16}$/;
            return format1.test(username?.trim()) && !format.test(username?.trim());
        }),
    phone: Yup.string().required("Số điện thoại không được bỏ trống").nullable().test('checkphone', "Số điện thoại không hợp lệ", function () {
        const { parent } = this;
        const { phone } = parent;
        var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        var checkNumber = /^[0-9]+$/
        return vnf_regex.test(phone) && checkNumber.test(phone);
    }),
    full_name: Yup.string().required("Họ và tên không được bỏ trống").nullable()
        .test("test", "Họ và tên không chứa số, kí tự đặc biệt, 2 khoảng trắng liên tục và ít nhất 4 ký tự chữ gồm 2 từ trở lên", function () {
            const { parent } = this;
            const { full_name } = parent;
            const nameStrim = removeAscent(full_name);
            if (nameStrim?.length < 4) return false;
            if (nameStrim?.replace(' ', '').length < 4) return false
            let regex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/
            return regex.test(nameStrim?.trim());
        }),
    dob: Yup.string().required("Ngày sinh không được bỏ trống").nullable()
        .test("test", "Thời gian đóng cửa phải sau thời gian hiện tại", function () {
            const { parent } = this;
            const { dob } = parent;
            // console.log('dob', dob)
            const currentDate = moment().format('DD-MM-YYYY');
            return moment(dob, 'DD-MM-YYYY').isSameOrBefore(moment(currentDate, 'DD-MM-YYYY'))
        }),
    city: Yup.number().required("không được bỏ trống").nullable(),
    district: Yup.number().required("không được bỏ trống").nullable(),
    subDistrict: Yup.number().required("không được bỏ trống").nullable(),
});

export const updateORG = Yup.object().shape({
    name: Yup.string().required("Họ và tên không được bỏ trống").nullable()
        .test("test", "Tên tổ chức không có kí tự đặc biệt,có ít nhất 4 ký tự chữ", function () {
            const { parent } = this;
            const { name } = parent;
            const nameStrim = removeAscent(name);
            if (nameStrim?.length < 4) return false;
            if (nameStrim?.replace(' ', '').length < 4) return false
            let regex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/
            let regex1 = /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)+$/
            let regex2 = /^[a-zA-Z0-9]+$/
            let regex3 = /^[a-zA-Z]+$/
            // console.log(nameStrim, 'nameStrim')
            // console.log('regex', regex.test(nameStrim?.trim()));
            // console.log('regex1', regex1.test(nameStrim?.trim()));
            // console.log('regex2', regex2.test(nameStrim?.trim()));
            // console.log('regex3', regex3.test(nameStrim?.trim()));
            return regex.test(nameStrim?.trim()) || regex1.test(nameStrim?.trim()) || regex2.test(nameStrim?.trim()) || regex3.test(nameStrim?.trim());
        }),
    adressString: Yup.string().required("không được bỏ trống").nullable(),
});
