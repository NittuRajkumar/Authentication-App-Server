import React from 'react';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';
import loginImage from '../assets/login.png';

const Login = () => {
  const handleLogin = async (values) => {
    console.log(values);
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="btn"
                block
              >
                Sign In
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/">
                <Button size="large" className="btn" block>
                  Create an account
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
