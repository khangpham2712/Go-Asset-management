/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react';
import { useState } from 'react';
import type { CascaderProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from 'antd';
import './register.css'

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function register() {
    const [form] = Form.useForm();
    const nav: any = useNavigate();

    // const onFinish = (values: any) => {
    //     console.log('Received values of form: ', values);
    //     // handleRegister();
    // };

    const onFinish = async (values: any) => {
        try {
          // Make a POST request to your registration API endpoint
          const response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                "Username": values.username, 
                "Password": values.password,
                "Role": 1 
            }),
          });
    
          // Check if the request was successful (status code 2xx)
          if (response.ok) {
            // Registration successful, you can handle the response accordingly
            console.log('Registration successful');
            window.location.href = "../login"

          } else {
            // Registration failed, handle the error response
            const errorData = await response.json();
            console.error('Registration failed:', errorData);
          }
        } catch (error) {
          // Handle network or other errors
          console.error('Error during registration:', error);
        }
      };

    // const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     console.log({
    //         username: data.get('username'),
    //         password: data.get('password'),
    //     });
    // };

    // const prefixSelector = (
    //     <Form.Item name="prefix" noStyle>
    //         <Select style={{ width: 70 }}>
    //             <Option value="84">+84</Option>
    //             <Option value="87">+87</Option>
    //         </Select>
    //     </Form.Item>
    // );

    // const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

    // const onWebsiteChange = (value: string) => {
    //     if (!value) {
    //         setAutoCompleteResult([]);
    //     } else {
    //         setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    //     }
    // };

    // const websiteOptions = autoCompleteResult.map((website) => ({
    //     label: website,
    //     value: website,
    // }));

    return (
        <div id="register-layout">
            <Form
                {...formItemLayout}
                form={form}
                name="basic"
                onFinish={onFinish}
                initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: false, message: 'Please input your phone number!' }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>

                {/* <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: 'Please input website!' }]}
            >
                <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="Your department">
                    <Input />
                </AutoComplete>
            </Form.Item> */}

                {/* <Form.Item
                name="intro"
                label="Intro"
                rules={[{ required: true, message: 'Please input Intro' }]}
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item> */}

                <Form.Item
                    name="role"
                    label="Role"
                // rules={[{ required: false, message: 'Please select gender!' }]}
                >
                    <Select placeholder="select your Role">
                        <Option value="0">Manager</Option>
                        <Option value="1">Deparment</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="department"
                    label="Department"
                // rules={[{ required: false, message: 'Please select gender!' }]}
                >
                    <Select placeholder="select your Department">
                        <Option value="male">Department 1</Option>
                        <Option value="female">Department 2</Option>
                        <Option value="other">Department 3</Option>
                    </Select>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default register