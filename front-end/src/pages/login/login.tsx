
import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd'
import { useState } from 'react';
import './login.css'
import { login } from '../../api/api';


const Login = () => {
    const [loginErr, setLoginErr] = useState(false)
    const onFinish = async (info:any) => {
      console.log('info', info)
      // const res = await login(info);
      // console.log(res.status);
      // (res.status === 200) ? window.location.href = "../" : setLoginErr(true);
      // console.log('Success:', info);
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
        <Input />
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
        <Input.Password />
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>

      </Form.Item>
    </Form>
    </div>
    )
}

export default Login
