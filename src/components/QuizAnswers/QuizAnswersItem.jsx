import React, { useState } from 'react';
import { List } from 'antd';
import cn from 'classnames';
function QuizAnswersItem({ text, onClickAnswer, id, answerState }) {
  const quizAnswerClass = cn('quiz__card-answer', answerState, {
    disabled: answerState === 'success' ? true : false,
  });

  return (
    <List.Item
      className={quizAnswerClass}
      onClick={() => {
        onClickAnswer(id);
      }}>
      {text}
    </List.Item>
  );
}

export default QuizAnswersItem;
