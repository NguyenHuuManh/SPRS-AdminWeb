import * as Yup from "yup";

export const updateProfile = Yup.object().shape({
    username: Yup.string().required("không được bỏ trống").nullable(),
    phone: Yup.string().required("không được bỏ trống").nullable(),
    full_name: Yup.string().required("không được bỏ trống").nullable(),
    dob: Yup.string().required("không được bỏ trống").nullable(),
    city: Yup.number().required("không được bỏ trống").nullable(),
    district: Yup.number().required("không được bỏ trống").nullable(),
    subDistrict: Yup.number().required("không được bỏ trống").nullable(),
});

export const updateORG = Yup.object().shape({
    name: Yup.string().required("không được bỏ trống").nullable(),
    adressString: Yup.string().required("không được bỏ trống").nullable(),
});
