import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.css'

const Login = () => {
  const [loginErr, setLoginErr] = useState(false)
  // const onFinish = async (info:any) => {
  //   console.log('info', info)
  //   // const res = await login(info);
  //   // console.log(res.status);
  //   // (res.status === 200) ? window.location.href = "../" : setLoginErr(true);
  //   // console.log('Success:', info);
  // };
  // const nav: any = useNavigate()

  // if (loginState) {
  //   nav('/home')
  // };

  // Function to handle login
  const onFinish = async (info: any) => {
    try {
      // Make a POST request to your login API endpoint
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "Username": info.username,
          "Password": info.password,
        }),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Login successful, you can handle the response accordingly
        const userData = await response.json();
        console.log('Login successful. User data:', userData);
        localStorage.setItem('role', userData.Role);
        localStorage.setItem('id', userData.Id);
        window.location.href = "../view-asset"
      } else {
        // Login failed, handle the error response
        const errorData = await response.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during login:', error);
    }
  };

  // const onFinishFailed = (errorInfo:string) => (e:any) => {
  //   console.log('Failed:', errorInfo);
  //   console.log('Failed:', e);

  // };

  return (
    <div id="login-layout">
      <Form name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input data-testid="username"/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password data-testid="password"/>
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" data-testid="login-btn">
            Submit
          </Button>

        </Form.Item>
      </Form>
    </div>
  )
}

export default Login