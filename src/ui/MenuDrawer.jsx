import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  DiffOutlined,
} from '@ant-design/icons';
function MenuDrawer({ token }) {
  const [collapsed, setCollaspsed] = useState(true);

  const toggleCollapsed = () => {
    setCollaspsed(!collapsed);
  };

  let links = [
    {
      to: '/',
      label: 'Все тесты',
      icon: <HomeOutlined />,
    },
  ];

  if (token) {
    links.push({
      to: '/quiz-creator',
      label: 'Создать тест',
      icon: <DiffOutlined />,
    });

    links.push({
      to: '/logout',
      label: 'Выйти',
      icon: <UserOutlined />,
    });
  } else {
    links.push({
      to: '/auth',
      label: 'Авторизация',
      icon: <UserOutlined />,
    });
  }

  const renderLinks = () => {
    return links.map((link, idx) => {
      return (
        <Menu.Item key={idx} icon={link.icon}>
          <Link to={link.to}>{link.label}</Link>
        </Menu.Item>
      );
    });
  };

  return (
    <div className="menu">
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, width: 60, height: 60, fontSize: 30 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu mode="inline" theme="white" inlineCollapsed={collapsed}>
        {renderLinks()}
      </Menu>
    </div>
  );
}

export default MenuDrawer;
