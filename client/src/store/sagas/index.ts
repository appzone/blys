import { put, takeLatest } from "redux-saga/effects";
import { CHECK_SESSION, LOGOUT, VERIFY } from "../actionTypes";

import { IUserResponse } from "../../interfaces/IApi";
import history from "../../routers/history";
import authService from "../../services/authService";
import { checkSessionSuccess, logout, verifyCodeFailed, verifyCodeSuccess } from "../actions/authActions";

export default function* saga() {
  yield takeLatest(VERIFY, function* verifySaga(action?: any) {
    try {
      const { code } = action.payload;
      const user: IUserResponse = yield authService.verifyCode(code);
      authService.saveSession(user.data);
      yield put(verifyCodeSuccess(user.data));
      history.push("/");
    } catch (error) {
      yield put(verifyCodeFailed(error));
    }
  });

  yield takeLatest(CHECK_SESSION, function* checkSessionSaga(action?: any) {
    try {
      const user: IUserResponse = yield authService.getMe();
      authService.saveSession(user.data);
      yield put(checkSessionSuccess(user.data));
    } catch (error) {
      yield put(logout());
    }
  });

  yield takeLatest(LOGOUT, function* logoutSaga(action?: any) {
    authService.removeSession();
    history.push("/verify");
  });
}
