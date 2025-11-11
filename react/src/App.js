import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Space, message } from 'antd';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import './App.css';

const { Header, Content, Footer } = Layout;
const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

function useAuth() {
  const access = localStorage.getItem(ACCESS_KEY);
  return Boolean(access);
}

function ProtectedRoute({ children }) {
  const authed = useAuth();
  const location = useLocation();
  if (!authed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function NavBar() {
  const authed = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith('/profile')) return 'profile';
    if (location.pathname.startsWith('/register')) return 'register';
    if (location.pathname.startsWith('/login')) return 'login';
    return 'home';
  }, [location.pathname]);

  const onLogout = () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    message.success('Вы вышли из аккаунта');
    navigate('/');
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ color: '#fff', fontWeight: 600, marginRight: 24 }}>Мой сайт</div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        style={{ flex: 1, minWidth: 0 }}
        items={[
          { key: 'home', label: <Link to="/">Главная</Link> },
          { key: 'profile', label: <Link to="/profile">Профиль</Link> },
        ]}
      />
      <Space>
        {!authed ? (
          <>
            <Button type="text"><Link to="/login">Войти</Link></Button>
            <Button type="primary"><Link to="/register">Регистрация</Link></Button>
          </>
        ) : (
          <Button danger onClick={onLogout}>Выйти</Button>
        )}
      </Space>
    </Header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <NavBar />
        <Content style={{ padding: '24px', maxWidth: 960, margin: '0 auto', width: '100%' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Demo © {new Date().getFullYear()}</Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
