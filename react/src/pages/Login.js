import React from 'react';
import { Card, Form, Input, Button, Typography, Space, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = () => {
    localStorage.setItem(ACCESS_KEY, 'demo-access');
    localStorage.setItem(REFRESH_KEY, 'demo-refresh');
    message.success('Вы успешно вошли');
    const redirectTo = location.state?.from?.pathname || '/profile';
    navigate(redirectTo, { replace: true });
  };

  return (
    <div data-easytag="id3-src/pages/Login.js">
      <Card title="Вход" style={{ maxWidth: 420, margin: '0 auto' }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Введите email' }, { type: 'email', message: 'Некорректный email' }]}>
            <Input placeholder="Введите email" />
          </Form.Item>

          <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Войти</Button>
              <Typography.Text>
                Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
              </Typography.Text>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
