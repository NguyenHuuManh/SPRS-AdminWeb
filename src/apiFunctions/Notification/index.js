import { SEND_NOTIFICATION } from "src/constrants/action";
import httpServices from "src/services/httpServices";

export const apiSendNotification = async (body) => {
    return await httpServices.post(`${SEND_NOTIFICATION}`, body);
};

