import React from 'react';
import { Card, Descriptions, Typography } from 'antd';

function Profile() {
  return (
    <div data-easytag="id4-src/pages/Profile.js">
      <Card title="Профиль">
        <Typography.Paragraph>
          Общая информация о пользователе.
        </Typography.Paragraph>
        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Email">—</Descriptions.Item>
          <Descriptions.Item label="Имя пользователя">—</Descriptions.Item>
          <Descriptions.Item label="Телефон">—</Descriptions.Item>
          <Descriptions.Item label="Полное имя">—</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}

export default Profile;
