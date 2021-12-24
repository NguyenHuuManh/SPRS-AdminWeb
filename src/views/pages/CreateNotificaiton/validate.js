import * as Yup from "yup";

export const createNotificaton = Yup.object().shape({
    title: Yup.string().required("không được bỏ trống").nullable(),
    message: Yup.string().required("không được bỏ trống").nullable(),
});
