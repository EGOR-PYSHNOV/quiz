import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Typography, Spin } from 'antd';
import QuizAnswers from '../QuizAnswers/QuizAnswers';

function QuizQuestion() {
  const { quiz, activeQuestion, answerState, results } = useSelector(({ Quiz }) => Quiz);
  const { Title } = Typography;
  const quizNumber = activeQuestion + 1;
  const quizAllQuestion = quiz.length;

  return (
    <Card
      style={{ width: 500 }}
      title={
        <Title level={3} style={{ fontWeight: 100 }}>
          {quiz[activeQuestion].question}
        </Title>
      }
      bodyStyle={{ padding: '10px' }}
      extra={
        <strong>
          {quizNumber}/{quizAllQuestion}
        </strong>
      }
      className="quiz__card">
      <QuizAnswers
        answers={quiz[activeQuestion].answers}
        answerId={quiz[activeQuestion].id}
        quizAllQuestion={quizAllQuestion}
        activeQuestion={activeQuestion}
        rightAnswer={quiz[activeQuestion].rightAnswerId}
        answerState={answerState}
        results={results}
      />
    </Card>
  );
}

export default QuizQuestion;
