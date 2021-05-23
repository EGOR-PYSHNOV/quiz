import { all } from 'redux-saga/effects';
import { authSaga } from './sagas/auth';
import { createQuizSaga } from './sagas/create';
import { quizSaga } from './sagas/quiz';

export default function* rootSaga() {
  yield all([authSaga(), quizSaga(), createQuizSaga()]);
}
