import { GET_GROUP_AUTHORIED, GET_GROUP_UNAUTHORIED, GET_PERMISSION, GET_PERMISSION_OWN, GET_UNPERMISSION, GET_USERS, GET_USERS_BY_NAME, GRANT_GROUP_PERMISSION, GRANT_GROUP_UNPERMISSION, GRANT_USER_UNPERMISSION, GRANT__USER_PERMISSION, GROUPS, GROUP_REGISTER } from "src/constrants/action";
import { convertToQuery } from "src/helps/function";
import httpServices from "src/services/httpServices";

export const apiGetPermission = async (id) => {
  return await httpServices.get(`${GET_PERMISSION}/${id}`);
};

export const apiGetUnPermission = async (id) => {
  return await httpServices.get(`${GET_UNPERMISSION}/${id}`);
};


export const apiGetGroupAuthoried = async (id) => {
  return await httpServices.get(`${GET_GROUP_AUTHORIED}/${id}`);
};

export const apiGetGroupUnAuthoried = async (id) => {
  return await httpServices.get(`${GET_GROUP_UNAUTHORIED}/${id}`);
};

export const apiGetUsers = async (id) => {
  return await httpServices.get(`${GET_USERS}`);
};

export const apiGetUersByName = async (body) => {
  return await httpServices.post(`${GET_USERS_BY_NAME}`, body);
};

export const apiGetGroups = async () => {
  return await httpServices.get(`${GROUPS}`);
};

export const apiGetGroupsRegister = async () => {
  return await httpServices.get(`${GROUP_REGISTER}`);
};

export const apiGetPermissionOwn = async () => {
  return await httpServices.get(`${GET_PERMISSION_OWN}`);
};

export const apiGrantUserPermission = async (body) => {
  return await httpServices.post(`${GRANT__USER_PERMISSION}`, body);
};

export const apiGrantUserUnPermission = async (body) => {
  return await httpServices.post(`${GRANT_USER_UNPERMISSION}`, body);
};

export const apiGrantGroupPermission = async (body) => {
  return await httpServices.post(`${GRANT_GROUP_PERMISSION}`, body);
};

export const apiGrantGroupUnPermission = async (body) => {
  return await httpServices.post(`${GRANT_GROUP_UNPERMISSION}`, body);
};





