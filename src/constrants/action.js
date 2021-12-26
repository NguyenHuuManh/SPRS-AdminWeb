export const API_KEY = "AIzaSyDlqprU1uYvSEEQIEotGG8_mL3QFfVB7vY"
export const URL_GOONG = "https://rsapi.goong.io"
export const API_KEY_GOONG = "r1v2PyX6pjgNTQsYYTTJVj2V8II0QZGYhSR1CFbo"
export const GET_TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
export const URL = "http://ec2-13-250-102-44.ap-southeast-1.compute.amazonaws.com";
export const IMAGE_URL = 'https://image-bucket-sprs.s3.ap-southeast-1.amazonaws.com/'
//
export const SIGNIN = `${URL}/authenticate-web`;
export const USER = `${URL}/user`;
export const GET_USERS = `${URL}/sprs/api/users`;
export const GET_USERS_BY_NAME = `${URL}/sprs/api/users/search`;
export const PROFILE = `${URL}/sprs/api/user`;
export const UPDATE_PROFILE = `${URL}/sprs/api/user/update/infor`
export const SIGNUP_ORG = `${URL}/sprs/api/users_v2/organizationlAdmin`
export const OTP_PASSWORD = `${URL}/sprs/api/generateOtp`
export const OTP_CHECKING = `${URL}/sprs/api/validateOtp`
export const VERIFY_PHONE = `${URL}/sprs/api/validateOtp-verify`
export const GET_OTP_SIGNUP = `${URL}/sprs/api/generateOtp-verify`
export const RESET_PASSWORD = `${URL}/sprs/api/forgotPassword`
export const UPDATE_PASS = `${URL}/sprs/api/user/update/password`
//
export const REQUEST_ORG = `${URL}/sprs/api/request-manage/request-organizationalAdmin`;
export const REGISTER_ORG_USER = `${URL}/sprs/api/users_v2/organizationalUser`;
export const GET_ORG = `${URL}/sprs/api/organization-manage/origanization/get-by-user`;
export const UPDATE_ORG = `${URL}/sprs/api/organization-manage/origanization/update`;
export const REQUEST_ADMIN = `${URL}/sprs/api/request-manage/request-systemAdmin`;
export const ORG_MANAGEMENT = `${URL}/sprs/api/organization-manage/origanization`;
export const GET_REQUEST_REGISTER_ORG_UNCHECK = `${URL}/sprs/api/request-manage/request-systemAdmin`;
export const GET_REQUEST_REGISTER_ORG_REJECT = `${URL}/sprs/api/request-manage/request-systemAdmin`;
export const GET_ACC_ACCEPTED = `${URL}/sprs/api/request-manage/request-systemAdmin`;
export const ACCEPT_REQUEST_REGISTER_ORG = `${URL}/sprs/api/request-manage/admin/register/accept`;
export const REJECT_REQUEST_REGISTER_ORG = `${URL}/sprs/api/request-manage/admin/register/reject`;
export const GET_USER_ORG = `${URL}/sprs/api/getOwnOrg`
export const UNACTIVE_USER_ORG = `${URL}/sprs/api/org-user-unactive`
export const ACTIVE_USER_ORG = `${URL}/sprs/api/org-user-active`

//
export const PLACE_AUTOCOMPLETE = `${URL_GOONG}/Place/AutoComplete`
export const DETAIL_PLACE_LAT_LNG = `${URL_GOONG}/Geocode`
export const DETAIL_PLACE_ID = `${URL_GOONG}/Place/Detail`

//api danh muc
export const CITY = `${URL}/sprs/api/address/city`
export const DISTRICT = `${URL}/sprs/api/address/district/`
export const SUBDISTRICT = `${URL}/sprs/api/address/subdistrict/`
export const GROUPS = `${URL}/sprs/api/groups-all`
export const GROUPS_NOTIFICATION = `${URL}/sprs/api/groups-notification`
export const GROUP_REGISTER = `${URL}/sprs/api/groups-register-web`
export const GET_PERMISSION_OWN = `${URL}/sprs/api/permissions/getOwn`
export const ITEMS = `${URL}/sprs/api/item`

//permission

export const GRANT__USER_PERMISSION = `${URL}/sprs/api/users/grantPermission`
export const GRANT_USER_UNPERMISSION = `${URL}/sprs/api/users/unGrantPermission`

export const GRANT_GROUP_PERMISSION = `${URL}/sprs/api/users/grantGroup`
export const GRANT_GROUP_UNPERMISSION = `${URL}/sprs/api/users/unGrantGroup`

export const GET_GROUP_AUTHORIED = `${URL}/sprs/api/groups-authoried`
export const GET_GROUP_UNAUTHORIED = `${URL}/sprs/api/groups-unauthoried`

export const GET_PERMISSION = `${URL}/sprs/api/permissions-authoried`
export const GET_UNPERMISSION = `${URL}/sprs/api/permissions-unauthoried`

//reportDdmin
export const GET_REPORT_YEAR = `${URL}/sprs/api/report-manage/getReportYear`
export const GET_REPORT_OVERVIEW = `${URL}/sprs/api/report-manage/getReportOverview`
export const GET_REPORT_MONTH = `${URL}/sprs/api/report-manage/getReportMonth`
export const GET_REPORT_PROVINCE = `${URL}/sprs/api/report-manage/getReportProvince`

//reportORG
export const GET_REPORT_YEAR_ORG = `${URL}/sprs/api/report-manage/getReportYear-org`
export const GET_REPORT_OVERVIEW_ORG = `${URL}/sprs/api/report-manage/getReportOverview`
export const GET_REPORT_MONTH_ORG = `${URL}/sprs/api/report-manage/getReportMonth-org`
export const GET_REPORT_PROVINCE_ORG = `${URL}/sprs/api/report-manage/getReportProvinceORG`
export const GET_TOP_USER_ORG = `${URL}/sprs/api/report-manage/getReportTopUserORG`




//Notification
export const SEND_NOTIFICATION = `${URL}/sprs/api/notification-manage/send-notifications`
export const GET_NOTIFICATIONs = `${URL}/sprs/api/notification-manage/admin/get`
//Ban
export const BAN_ACC = `${URL}/sprs/api/user/ban`
export const UNBAN_ACC = `${URL}/sprs/api/user/unbanned`
export const GET_ACC = `${URL}/sprs/api/users/admin`

//Manager event:
export const CREATE_EVENT = `${URL}/sprs/api/reliefPoint-manage/create-admin`
export const UPDATE_EVENT = `${URL}/sprs/api/reliefPoint-manage/update-admin`
export const GET_EVENTS = `${URL}/sprs/api/reliefPoint-manage/get-admin`
export const GET_EVENTS_ASS = `${URL}/sprs/api/reliefPoint-manage/get-admin-assign`
export const DELETE_EVENT = `${URL}/sprs/api/reliefPoint-manage/delete-event`
export const ASSIGN = `${URL}/sprs/api/reliefPoint-manage/assign`
export const UN_ASSIGN = `${URL}/sprs/api/reliefPoint-manage/unassign`
export const GET_ASSIGN = `${URL}/sprs/api/reliefPoint-manage/get-assign`
export const GET_UN_ASSIGN = `${URL}/sprs/api/reliefPoint-manage/get-unassign`
export const UPLOAD_IMG_RELIEF = `${URL}/sprs/api/reliefPoint-manage/uploadImg`
export const UPDATE_STATUS_RELIEF_POINT = `${URL}/sprs/api/reliefPoint-manage/update-status`

