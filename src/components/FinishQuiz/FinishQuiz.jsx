import React from 'react';
import { Card, List, Typography, Button } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

function FinishQuiz({ results, quiz, onRetryQuiz }) {
  const { Title } = Typography;

  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'success') {
      total++;
    }
    return total;
  }, 0);
  return (
    <Card style={{ width: 500 }}>
      <List
        itemLayout="horizontal"
        dataSource={quiz}
        renderItem={(quizItem, idx) => {
          return (
            <List.Item>
              <List.Item.Meta
                title={
                  <>
                    <strong>{idx + 1}.</strong> {quizItem.question} {'  '}
                    {results[quizItem.id] === 'success' ? (
                      <CheckOutlined style={{ fontSize: '16px', color: 'green' }} />
                    ) : (
                      <CloseOutlined style={{ fontSize: '20px', color: 'red' }} />
                    )}
                  </>
                }
              />
            </List.Item>
          );
        }}
      />

      <Title level={5} style={{ fontWeight: 100 }}>
        Правильно {successCount} из {quiz.length}
      </Title>
      <Button type="primary" onClick={() => onRetryQuiz()}>
        Пройти еще раз
      </Button>
    </Card>
  );
}

export default FinishQuiz;
