import { put, takeLatest } from "redux-saga/effects";
import { apiGetProfile } from "src/apiFunctions/authencation";
import * as type from "../../type";
function* getProfile() {
  const response = yield apiGetProfile()
    .then((e) => {
      console.log("e", e.data);
      return e.data;
    })
    .finally(() => { });
  try {
    if (response?.code == '200') {
      yield put({
        type: type.REQUEST_GET_PROFILE_SUCCESS,
        payload: response.obj,
      });
    } else {
      yield put({ type: type.REQUEST_GET_PROFILE_FAILED, error: response.err });
    }
  } catch (error) {
    yield put({ type: type.REQUEST_GET_PROFILE_FAILED, error: response.err });
  }
}

export function* profileSaga() {
  yield takeLatest(type.REQUEST_GET_PROFILE, getProfile);
}
