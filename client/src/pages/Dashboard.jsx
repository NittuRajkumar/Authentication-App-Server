import React from 'react';

// const Dashboard = () => {
//   return (
//     <div> Dashboard Page </div>
//   );
// }


import { Avatar, Button, Card, Flex, Typography } from 'antd';
import { useAuth } from '../contexts/AuthContext';
import { UserOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const {userData, logout } = useAuth();
  console.log("User Data:", userData);

  const handleLogout = async () => {
    await logout();
  };
  if (!userData){
    return <p>Loading....</p>
  }

  return (
  <Card className="profile-card">
    <Flex vertical gap="small" align="center">
      <Avatar
        size={150}
        icon={<UserOutlined />}
        className="avatar"
      />

      <Typography.Title level={2} strong className="username">
        {userData.name}
      </Typography.Title>

      <Typography.Text type="secondary" strong>
        Email: {userData.email}
      </Typography.Text>

      <Typography.Text type="secondary">
        Role: {userData.role}
      </Typography.Text>

      <Button
        size="large"
        type="primary"
        className="profile-btn"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Flex>
  </Card>
);

};

export default Dashboard;

