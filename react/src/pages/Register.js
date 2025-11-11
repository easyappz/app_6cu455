import React from 'react';
import { Card, Form, Input, Button, Typography, Space, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const onFinish = () => {
    message.success('Регистрация прошла успешно');
    navigate('/login');
  };

  return (
    <div data-easytag="id2-src/pages/Register.js">
      <Card title="Регистрация" style={{ maxWidth: 520, margin: '0 auto' }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Введите email' }, { type: 'email', message: 'Некорректный email' }]}>
            <Input placeholder="Введите email" />
          </Form.Item>

          <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }, { min: 6, message: 'Минимум 6 символов' }]}>
            <Input.Password placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item label="Имя пользователя" name="username" rules={[{ required: true, message: 'Введите имя пользователя' }]}>
            <Input placeholder="Введите имя пользователя" />
          </Form.Item>

          <Form.Item label="Телефон" name="phone" rules={[{ required: true, message: 'Введите телефон' }]}>
            <Input placeholder="Введите телефон" />
          </Form.Item>

          <Form.Item label="Полное имя" name="full_name" rules={[{ required: true, message: 'Введите полное имя' }]}>
            <Input placeholder="Введите полное имя" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">Создать аккаунт</Button>
              <Typography.Text>
                Уже есть аккаунт? <Link to="/login">Войти</Link>
              </Typography.Text>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
