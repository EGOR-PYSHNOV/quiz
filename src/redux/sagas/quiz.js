import { call, put, takeLatest } from '@redux-saga/core/effects';
import { QuizApiFireBase } from '../../api/api';
import { fetchQuizesStart, fetchQuizesSuccess, fetchQuizSuccess } from '../actions/quiz';

export function* getQuizes() {
  yield put(fetchQuizesStart());
  const res = yield call(QuizApiFireBase.getFetchQuizes);
  const quizes = [];
  Object.keys(res).forEach((key, idx) => {
    quizes.push({
      id: key,
      name: `Тест №${idx + 1}`,
    });
  });
  yield put(fetchQuizesSuccess(quizes));
}

export function* getQuizById({ id }) {
  console.log(id);
  yield put(fetchQuizesStart());
  const res = yield call(QuizApiFireBase.getFetchQuizById, id);

  yield put(fetchQuizSuccess(res));
}

export function* quizSaga() {
  yield takeLatest('FETCH_QUIZES', getQuizes);
  yield takeLatest('FETCH_QUIZ_BY_ID', getQuizById);
}
