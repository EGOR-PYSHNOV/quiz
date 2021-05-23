import React from 'react';
import { List } from 'antd';
import QuizAnswersItem from './QuizAnswersItem';
import { useDispatch } from 'react-redux';
import { quizFinished, setNextQuestion, setQuestionAnswer } from '../../redux/actions/quiz';
function QuizAnswers({
  answers,
  quizAllQuestion,
  activeQuestion,
  rightAnswer,
  answerState,
  answerId,
  results,
}) {
  const dispatch = useDispatch();

  const onClickAnswer = (id) => {
    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === 'success') {
        return;
      }
    }

    if (id === rightAnswer) {
      if (!results[answerId]) {
        results[answerId] = 'success';
      }

      dispatch(setQuestionAnswer({ [id]: 'success' }, results));

      setTimeout(() => {
        if (activeQuestion === quizAllQuestion - 1) {
          dispatch(quizFinished());
        } else {
          dispatch(setNextQuestion());
        }
      }, 1000);
    } else {
      results[answerId] = 'error';
      dispatch(setQuestionAnswer({ [id]: 'error' }, results));
    }
  };

  return (
    <div className="quiz__card-info">
      <List
        size="large"
        bordered
        dataSource={answers}
        className="quiz__card-answers"
        renderItem={(item) => (
          <QuizAnswersItem
            text={item.text}
            id={item.id}
            onClickAnswer={onClickAnswer}
            rightAnswer={rightAnswer}
            answerState={
              answerState && parseInt(Object.keys(answerState)) === item.id
                ? answerState[item.id]
                : null
            }
          />
        )}
        rowKey={(item) => item.id}
      />
    </div>
  );
}

export default QuizAnswers;
