import React from 'react';
import { Card, Typography, Row, Col, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { fetchQuizes } from '../redux/actions/quiz';
function Quizes() {
  const { Title } = Typography;
  const { quizes, loaded } = useSelector(({ Quiz }) => Quiz);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuizes());
  }, []);

  return (
    <Card
      style={{ width: 900 }}
      title={
        <Title level={3} style={{ fontWeight: 400 }}>
          Доступные тесты
        </Title>
      }
      bodyStyle={{ padding: '10px' }}>
      {loaded && quizes.length !== 0 ? (
        <div className="spinner">
          <Spin />
        </div>
      ) : (
        <Row gutter={16}>
          {quizes.map((quiz) => {
            return (
              <Col span={8} key={quiz.id}>
                <NavLink to={`/quiz/${quiz.id}`}>
                  <Card title={quiz.name} bordered={false} />
                </NavLink>
              </Col>
            );
          })}
        </Row>
      )}
    </Card>
  );
}

export default Quizes;
