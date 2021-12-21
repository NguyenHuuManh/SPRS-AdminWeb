import moment from "moment";
import * as Yup from "yup";

export const report = Yup.object().shape({
    type_time: Yup.string().required("Chọn loại báo cáo").nullable(),
});
