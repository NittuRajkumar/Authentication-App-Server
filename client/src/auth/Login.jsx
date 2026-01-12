import React from 'react';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import loginImage from '../assets/login.png';
import useLogin from '../hooks/useLogin.jsx';

const Login = () => {
  const {error, loading, loginUser} = useLogin();
  const handleLogin = async (values) => {
    await loginUser(values);
  };

  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        {/* Image */}
        {/* <Flex flex={1}>
          <img src={loginImage} alt="Login" className="auth-image" />
        </Flex> */}

<Flex flex={1} className="image-container" align="center" justify="center">
  <img src={loginImage} className="auth-image" alt="Login" />
</Flex>


        {/* Form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} className="title">
            Sign In
          </Typography.Title>

          <Typography.Text type="secondary" className="slogan">
            Unlock your world.
          </Typography.Text>

          <Form
            layout="vertical"
            onFinish={handleLogin}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
                {
                  type: 'email',
                  message: 'The input is not a valid Email!',
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter your password"
              />
            </Form.Item>

            {
              error && (
                <Alert
                description={error}
                type="error"
                showIcon 
                closable
                className = "alert" 
                />
              )
            }

            <Form.Item>
              <Button
                type={`${loading ? '' : 'primary'}`}
                htmlType="submit"
                size="large"
                className="btn"
                block
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/">
                <Button size="large" className="btn" block>
                  Create Account
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Login;
