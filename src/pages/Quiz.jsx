import React, { useEffect } from 'react';
import QuizAnswer from '../components/QuizQuestion/QuizQuestion';
import FinishQuiz from '../components/FinishQuiz/FinishQuiz';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuizesById, retryQuiz } from '../redux/actions/quiz';
import { Spin } from 'antd';
function Quiz({ match }) {
  const { isFinished, results, quiz, loaded } = useSelector(({ Quiz }) => Quiz);
  const dispatch = useDispatch();
  const onRetryQuiz = () => {
    dispatch(retryQuiz());
  };

  useEffect(() => {
    console.log(match.params.id);
    dispatch(fetchQuizesById(match.params.id));

    return dispatch(retryQuiz());
  }, []);

  return (
    <div className="quiz">
      {isFinished ? (
        <FinishQuiz results={results} quiz={quiz} onRetryQuiz={onRetryQuiz} />
      ) : (
        <>{loaded || !quiz ? <Spin /> : <QuizAnswer />}</>
      )}
    </div>
  );
}

export default Quiz;
