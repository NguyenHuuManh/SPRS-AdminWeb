import * as Yup from "yup";

export const checkPhone = Yup.object().shape({
    to: Yup.string().required("Số điện thoại không được bỏ trống").nullable().test('checkphone', "Số điện thoại không hợp lệ", function () {
        const { parent } = this;
        const { to } = parent;
        if (to?.length != 9) return false;
        var vnf_regex = /((9|3|7|8|5)+([0-9]{8})\b)/g;
        var checkNumber = /^[0-9]+$/
        return vnf_regex.test(to) && checkNumber.test(to);
    }),
});
