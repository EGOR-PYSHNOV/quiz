import React, { useState } from 'react';
import { Typography, Input, Button, Form, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchAuthAccess } from '../redux/actions/auth';
const { Title } = Typography;

function Auth() {
  const { loaded, error } = useSelector(({ Auth }) => Auth);
  const dispatch = useDispatch();

  const [formSubmit, setformSubmit] = useState(false);
  const AuthSchema = Yup.object().shape({
    login: Yup.string().email('Неправильный email').required('Заполните поле логин'),
    password: Yup.string().required('Заполните поле пароль').min(6, 'Пароль слишком короткий'),
  });

  const onSubmitHandler = (values) => {
    dispatch(fetchAuthAccess(values.login, values.password, values.isLogin));
  };

  return (
    <div>
      <Title>Авторизация</Title>

      <Formik
        initialValues={{
          isLogin: true,
          login: '',
          password: '',
        }}
        validationSchema={AuthSchema}
        onSubmit={(values) => {
          onSubmitHandler(values);
          setformSubmit(true);
        }}>
        {({ errors, touched, ...props }) => (
          <Form onFinish={props.handleSubmit}>
            <Form.Item>
              <Input
                id="login"
                name="login"
                type="text"
                value={props.values.login}
                onChange={props.handleChange}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Логин"
                disabled={loaded ? true : false}
              />
              {errors.login && touched.login ? <div>{errors.login}</div> : null}
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                id="password"
                name="password"
                type="password"
                placeholder="Пароль"
                onChange={props.handleChange}
                value={props.values.password}
                disabled={loaded ? true : false}
              />
              {errors.password && touched.password ? <div>{errors.password}</div> : null}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={loaded ? true : false}
                onClick={(e) => {
                  props.setFieldValue('isLogin', true);
                }}>
                Войти
              </Button>
              <Button
                style={{ marginLeft: '10px' }}
                type="primary"
                htmlType="submit"
                disabled={loaded ? true : false}
                onClick={(e) => {
                  props.setFieldValue('isLogin', false);
                }}
                className="register-form-button">
                Регистрация
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>

      {formSubmit && error ? (
        <Alert
          message="Ошибка входа"
          description="Неправильный логин или пароль"
          type="error"
          showIcon
        />
      ) : null}
    </div>
  );
}

export default Auth;
