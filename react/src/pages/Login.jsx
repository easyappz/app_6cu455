import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/profile';

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login/', values);
      localStorage.setItem(ACCESS_KEY, data.access);
      localStorage.setItem(REFRESH_KEY, data.refresh);
      message.success('Вы успешно вошли');
      navigate(from, { replace: true });
    } catch (e) {
      message.error('Неверные учетные данные');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card data-easytag="id3-src/pages/Login.jsx">
      <Typography.Title level={2}>Вход</Typography.Title>
      <Form layout="vertical" onFinish={onFinish} requiredMark>
        <Form.Item label="Имя пользователя" name="username" rules={[{ required: true, message: 'Введите имя пользователя' }]}>
          <Input placeholder="username" />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Войти</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
