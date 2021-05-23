export const setNextQuestion = () => ({
  type: 'SET_NEXT_QUESTION',
});

export const quizFinished = () => ({
  type: 'QUIZ_FINISHED',
});

export const setQuestionAnswer = (answerState, results) => ({
  type: 'SET_QUESTION_ANSWER',
  answerState,
  results,
});

export const retryQuiz = () => ({
  type: 'QUIZ_RETRY',
});

export const fetchQuizes = () => ({
  type: 'FETCH_QUIZES',
});

export const fetchQuizesById = (id) => ({
  type: 'FETCH_QUIZ_BY_ID',
  id,
});

export const fetchQuizesStart = () => ({
  type: 'FETCH_QUIZES_START',
});

export const fetchQuizesSuccess = (quizes) => ({
  type: 'FETCH_QUIZES_SUCCESS',
  payload: quizes,
});

export const fetchQuizSuccess = (quiz) => ({
  type: 'FETCH_QUIZ_SUCCESS',
  payload: quiz,
});
