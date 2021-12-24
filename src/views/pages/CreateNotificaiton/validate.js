import * as Yup from "yup";

export const createNotificaton = Yup.object().shape({
    title: Yup.string().required("Không được bỏ trống").nullable(),
    message: Yup.string().required("Không được bỏ trống").nullable(),
});
