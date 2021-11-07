import * as Yup from "yup";

export const register = Yup.object().shape({
    username: Yup.string().required("Tên tài khoản không được bỏ trống").nullable(),
    phone: Yup.string().required("Số điện thoại không được bỏ trống").nullable(),
    password: Yup.string().required("Mật khẩu không được bỏ trống").nullable().test("test", "Mật khẩu phải có cả chữ, sô, kí tự đặc biệt và tối thiểu 8 kí tự", function () {
        const { parent } = this;
        const { newPassword } = parent;
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
        return regex.test(newPassword)
    }),
    // rePassWord: Yup.string().required("Xác minh mật khẩu").nullable(),
    full_name: Yup.string().required("Họ và tên không được bỏ trống").nullable(),
    dob: Yup.string().required("Ngày sinh không được bỏ trống").nullable(),
    nameOrg: Yup.string().required("Tên tổ chức k được bỏ trống").nullable(),
    city: Yup.string().required("Tỉnh/Thành phố không được bỏ trống").nullable(),
    district: Yup.string().required("Quận/Huyện không được bỏ trống").nullable(),
    subDistrict: Yup.string().required("Xã phường không được bỏ trống").nullable(),
    // addressLine: Yup.string().required("địa chi không được bỏ trống").nullable(),
    adressString: Yup.string().required("Địa chỉ tổ chức không được bỏ trống").nullable(),
    rePassWord: Yup.mixed().required("Xác minh mật khẩu").test("test", "Mật khẩu không khớp", function () {
        const { parent } = this;
        const { rePassWord, password } = parent;
        return rePassWord == password

    }),

});
