export function createQuizQuestion(item) {
  return {
    type: 'CREATE_QUIZ_QUESTION',
    item,
  };
}

export function resetQuizCreation() {
  return {
    type: 'RESET_QUIZ_CREATION',
  };
}

export function finishCreateQuiz() {
  return {
    type: 'FINISH_CREATE_QUIZ',
  };
}
