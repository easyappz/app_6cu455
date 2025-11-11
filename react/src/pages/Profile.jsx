import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Spin, Alert } from 'antd';
import api from '../api/axios';

export default function Profile() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get('/users/me/');
        if (mounted) setData(res.data);
      } catch (e) {
        setError('Не удалось загрузить профиль');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <Spin />;
  if (error) return <Alert type="error" message={error} />;

  return (
    <Card title="Профиль" data-easytag="id4-src/pages/Profile.jsx">
      <Descriptions bordered column={1} size="middle">
        <Descriptions.Item label="Имя пользователя">{data.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
        <Descriptions.Item label="Полное имя">{data.full_name || '—'}</Descriptions.Item>
        <Descriptions.Item label="Телефон">{data.phone || '—'}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
