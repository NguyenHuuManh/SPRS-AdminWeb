import { put, takeLatest } from "redux-saga/effects";
import { apiSignin } from "src/apiFunctions/authencation";
import { apiGetPermissionOwn } from "src/apiFunctions/permission";
import httpServices from "src/services/httpServices";
import { appToast } from "src/views/components/AppToastContainer";
import * as type from "../../type";
function* login({ payload }) {
  const response = yield apiSignin(payload)
    .then((e) => {
      return e;
    })
    .finally(() => { });
  try {
    if (response?.status === 200) {
      if (response?.data?.token) {
        httpServices.attachTokenToHeader(response.data.token);
        httpServices.saveLocalStorage(response.data.token);
        apiGetPermissionOwn().then((e) => {
          if (e?.status == 200) {
            if (e?.data?.code === '200') {
              localStorage.setItem("menu", JSON.stringify(e.data.lstObj));
              window.location.reload();
            } else {
              appToast({
                toastOptions: { type: "error" },
                description: e.data.message,
              });
            }
          } else {
            appToast({
              toastOptions: { type: "error" },
              description: "Hệ thống đang bảo trì"
            });
          }
        })
        yield put({ type: type.REQUEST_LOGIN_SUCCESS, payload: response.data });

      } else {
        appToast({
          toastOptions: { type: "error" },
          description: response.data.message,
        });
        yield put({ type: type.REQUEST_LOGIN_FAILED, payload: response.data.message });
      }


    } else {
      yield put({ type: type.REQUEST_LOGIN_FAILED, payload: response.data });
      appToast({
        toastOptions: { type: "error" },
        description: response.data.message,
      });
    }
  } catch (error) {
    appToast({
      toastOptions: { type: "error" },
      description: "Hệ thống đang được bảo trì",
    });
    yield put({ type: type.REQUEST_LOGIN_FAILED, payload: error });
  }
}

function* logout() {
  yield httpServices.clearLocalStorage();
  yield httpServices.removeHeaderAuthorization();
  yield httpServices.removeInterceptors();
  window.location.reload();
}

export function* authSaga() {
  yield takeLatest(type.REQUEST_LOGIN, login);
  yield takeLatest(type.REQUEST_LOGOUT, logout);
}
