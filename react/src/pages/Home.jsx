import React from 'react';
import { Typography, Card } from 'antd';

export default function Home() {
  return (
    <Card data-easytag="id1-src/pages/Home.jsx">
      <Typography.Title level={2}>Главная</Typography.Title>
      <Typography.Paragraph>
        Добро пожаловать! Пожалуйста, зарегистрируйтесь или войдите, чтобы посмотреть профиль.
      </Typography.Paragraph>
    </Card>
  );
}
