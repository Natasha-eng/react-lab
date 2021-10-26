import {
  setErrorAC,
  setIsSignedInAC,
  setUserBalanceAC,
  setUserNameAC,
  setUserStatusAC,
  signInSagaActionType,
} from "@/actions/actions";
import { api } from "@/api/games-api";
import { AxiosResponse } from "axios";
import { call, put, StrictEffect, takeEvery } from "redux-saga/effects";

function* signIn(action: signInSagaActionType) {
  try {
    const user: AxiosResponse<{
      status: number;
      name: string;
      balance: number;
      isAdmin: boolean;
      errorMessage: string;
    }> = yield call(api.signIn, action.payload.login, action.payload.password);
    if (user.status === 201) {
      yield put(setUserNameAC(user.data.name));
      yield put(setUserBalanceAC(user.data.balance));
      yield put(setUserStatusAC(user.data.isAdmin));
      yield put(setIsSignedInAC(true));
    } else {
      yield put(setErrorAC(user.data.errorMessage));
      yield put(setIsSignedInAC(false));
    }
  } catch (e) {
    yield put(setErrorAC(e.message));
    yield put(setIsSignedInAC(false));
  }
}

function* mySaga(): Generator<StrictEffect> {
  yield takeEvery("SIGN-IN", signIn);
}

export default mySaga;
