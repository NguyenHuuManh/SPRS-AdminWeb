import { BAN_ACC, GET_ACC, SIGNUP_ORG, UNBAN_ACC } from "src/constrants/action";
import { convertToQuery } from "src/helps/function";
import httpServices from "src/services/httpServices";

export const apiGetUsers = async (param) => {
    return await httpServices.get(`${GET_ACC}${convertToQuery(param)}`);
};

export const apiBanUser = async (param) => {
    return await httpServices.put(`${BAN_ACC}${convertToQuery(param)}`);
};

export const apiUnBanUser = async (param) => {
    return await httpServices.put(`${UNBAN_ACC}${convertToQuery(param)}`);
};
