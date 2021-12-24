import { GET_NOTIFICATIONs, SEND_NOTIFICATION } from "src/constrants/action";
import { convertToQuery } from "src/helps/function";
import httpServices from "src/services/httpServices";

export const apiSendNotification = async (body) => {
    return await httpServices.post(`${SEND_NOTIFICATION}`, body);
};

export const apiGetNotifications = async (params) => {
    return await httpServices.get(`${GET_NOTIFICATIONs}${convertToQuery(params)}`);
};
