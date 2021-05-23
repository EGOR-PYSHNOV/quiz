import React from 'react';
import { Typography, Form, Input, Button, Row, Col, Select, message } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../redux/actions/create';

const { Title } = Typography;
const { Option } = Select;
function QuizCreator() {
  const { quiz } = useSelector(({ Create }) => Create);
  const dispatch = useDispatch();

  const QuizCreatorSchema = Yup.object().shape({
    question: Yup.string().required('Заполните вопрос').min(6, 'Слишком короткий вопрос'),
    option1: Yup.string().required('Заполните поле'),
    option2: Yup.string().required('Заполните поле'),
    option3: Yup.string().required('Заполните поле'),
    option4: Yup.string().required('Заполните поле'),
  });

  const onAddQuestion = (values) => {
    const { question, option1, option2, option3, option4, rightAnswerId } = values;

    const questionItem = {
      question: question,
      id: quiz.length + 1,
      rightAnswerId: Number(rightAnswerId),
      answers: [
        {
          text: option1,
          id: 1,
        },
        {
          text: option2,
          id: 2,
        },
        {
          text: option3,
          id: 3,
        },
        {
          text: option4,
          id: 4,
        },
      ],
    };

    dispatch(createQuizQuestion(questionItem));
  };

  const onCreateTest = () => {
    dispatch(finishCreateQuiz());
    if (quiz.length > 0) {
      message.success('Тест успешно создан');
    }
  };

  return (
    <div className="container">
      <Title>Создание теста</Title>

      <Formik
        initialValues={{
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          rightAnswerId: 1,
        }}
        validationSchema={QuizCreatorSchema}
        onSubmit={(values, { resetForm }) => {
          onAddQuestion(values);
          resetForm();
        }}>
        {({ errors, touched, setFieldValue, resetForm, ...props }) => (
          <Form onFinish={props.handleSubmit}>
            <Row>
              <Col span={24}>
                <Form.Item label="Введите вопрос" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  <Input
                    id="question"
                    name="question"
                    type="text"
                    value={props.values.question}
                    onChange={props.handleChange}
                    placeholder="Введите вопрос"
                  />
                  {errors.question && touched.question ? (
                    <div>
                      <b>{errors.question}</b>
                    </div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Вариант 1" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  <Input
                    id="option1"
                    name="option1"
                    type="text"
                    value={props.values.option1}
                    onChange={props.handleChange}
                    placeholder="Вариант 1"
                  />
                  {errors.option1 && touched.option1 ? (
                    <div>
                      <b>{errors.option1}</b>
                    </div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Вариант 2" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  <Input
                    label="Вариант 2"
                    id="option2"
                    name="option2"
                    type="text"
                    value={props.values.option2}
                    onChange={props.handleChange}
                    placeholder="Вариант 2"
                  />
                  {errors.option2 && touched.option2 ? (
                    <div>
                      <b>{errors.option2}</b>
                    </div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Вариант 3" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  <Input
                    label="Вариант 3"
                    id="option3"
                    name="option3"
                    type="text"
                    value={props.values.option3}
                    onChange={props.handleChange}
                    placeholder="Вариант 3"
                  />
                  {errors.option3 && touched.option3 ? (
                    <div>
                      <b>{errors.option3}</b>
                    </div>
                  ) : null}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Вариант 4" labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
                  <Input
                    label="Вариант 4"
                    id="option4"
                    name="option4"
                    type="text"
                    value={props.values.option4}
                    onChange={props.handleChange}
                    placeholder="Вариант 4"
                  />
                  {errors.option4 && touched.option4 ? (
                    <div>
                      <b>{errors.option4}</b>
                    </div>
                  ) : null}
                </Form.Item>{' '}
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Выберите правильный ответ"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}>
                  <Select
                    label="Выберите правильный ответ"
                    id="rightAnswerId"
                    name="rightAnswerId"
                    value={props.values.rightAnswerId}
                    onChange={(value) => setFieldValue('rightAnswerId', value)}
                    placeholder="Выберите правильный ответ">
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                  </Select>
                  {errors.rightAnswerId && touched.rightAnswerId ? (
                    <div>
                      <b>{errors.rightAnswerId}</b>
                    </div>
                  ) : null}
                </Form.Item>{' '}
              </Col>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Добавить вопрос
                </Button>
                <Button
                  style={{ marginLeft: '10px' }}
                  type="primary"
                  className="create-button"
                  onClick={() => {
                    onCreateTest();
                    resetForm();
                  }}>
                  Создать тест
                </Button>
              </Form.Item>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default QuizCreator;
