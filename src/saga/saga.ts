import { setErrorAC, setIsSignedInAC, setUserNameAC, signInSagaActionType } from "@/actions/actions";
import { api } from "@/api/games-api";
import { AxiosResponse } from "axios";
import { call, put, StrictEffect, takeEvery } from "redux-saga/effects";

function* signIn(action: signInSagaActionType) {
  try {
    const user: AxiosResponse<{ status: number; name: string; errorMessage: string }> = yield call(
      api.signIn,
      action.payload.login,
      action.payload.password
    );
    if (user.data.status === 201) {
      yield put(setUserNameAC(user.data.name));
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
