import { call, put, takeEvery, select } from '@redux-saga/core/effects';
import { QuizApiFireBase } from '../../api/api';
import { resetQuizCreation } from '../actions/create';

const getCreateQuiz = (state) => state.Create.quiz;
export function* finishCreateQuiz() {
  const quizes = yield select(getCreateQuiz);
  yield call(QuizApiFireBase.AddQuiz, quizes);
  yield put(resetQuizCreation());
}

export function* createQuizSaga() {
  yield takeEvery('FINISH_CREATE_QUIZ', finishCreateQuiz);
}
