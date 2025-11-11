import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.post('/auth/register/', values);
      message.success('Регистрация успешна! Войдите в аккаунт.');
      navigate('/login');
    } catch (e) {
      const data = e?.response?.data;
      if (data && typeof data === 'object') {
        const firstKey = Object.keys(data)[0];
        message.error(Array.isArray(data[firstKey]) ? data[firstKey][0] : String(data[firstKey]));
      } else {
        message.error('Ошибка регистрации');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card data-easytag="id2-src/pages/Register.jsx">
      <Typography.Title level={2}>Регистрация</Typography.Title>
      <Form layout="vertical" onFinish={onFinish} requiredMark>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Введите email' }, { type: 'email', message: 'Некорректный email' }]}>
          <Input placeholder="email@example.com" />
        </Form.Item>
        <Form.Item label="Имя пользователя" name="username" rules={[{ required: true, message: 'Введите имя пользователя' }]}>
          <Input placeholder="username" />
        </Form.Item>
        <Form.Item label="Полное имя" name="full_name">
          <Input placeholder="Иван Иванов" />
        </Form.Item>
        <Form.Item label="Телефон" name="phone">
          <Input placeholder="+7..." />
        </Form.Item>
        <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }, { min: 6, message: 'Минимум 6 символов' }]}>
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Зарегистрироваться</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
