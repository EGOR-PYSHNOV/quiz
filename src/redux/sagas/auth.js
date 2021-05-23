import { call, put, takeEvery, delay } from '@redux-saga/core/effects';
import { QuizApiFireBase } from '../../api/api';
import { fetchAuthStart, authError, authSuccess, fetchAuthFinish, logout } from '../actions/auth';

export function* autoLogout(time) {
  yield delay(time);
  yield put(logout());
}

export function* authLogin() {
  const token = localStorage.getItem('token');
  if (!token) {
    yield put(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      yield put(logout());
    } else {
      yield put(authSuccess(token));
      yield call(autoLogout, (expirationDate.getTime() - new Date().getTime()) / 1000);
    }
  }
}

export function* authAccess({ payload }) {
  yield put(fetchAuthStart());
  const res = yield call(QuizApiFireBase.AuthQuiz, payload);

  if (res.error) {
    console.log(res);
    yield put(authError());
  } else {
    const expirationDate = new Date(new Date().getTime() + res.expiresIn * 1000);
    localStorage.setItem('token', res.idToken);
    localStorage.setItem('userId', res.localId);
    localStorage.setItem('expirationDate', expirationDate);

    yield put(authSuccess(res.idToken));
    yield call(autoLogout, res.expiresIn);
  }
  yield put(fetchAuthFinish());
}

export function* authSaga() {
  yield takeEvery('FETCH_AUTH_ACCESS', authAccess);
  yield takeEvery('FETCH_AUTH_LOGIN', authLogin);
}
