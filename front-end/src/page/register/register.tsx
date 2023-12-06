/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
// import { Button, Checkbox, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './register.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../assets/logo.png';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// const { Option } = Select;

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
    // const [form] = Form.useForm();
    // const nav: any = useNavigate();

    // const onFinish = (values: any) => {
    //     console.log('Received values of form: ', values);
    //     // handleRegister();
    // };
    const [role, setRole] = useState<string>('')
    const [department, setDepartment] = useState<string>('')

    const handleChangeRole = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    }
    const handleChangeDepartment = (event: SelectChangeEvent) => {
        setDepartment(event.target.value as string);
    }

    const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);

            // Make a POST request to your registration API endpoint
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "Username": data.get('username'),
                    "Password": data.get('password'),
                    "Role": parseInt(role, 10),
                    "Telephone": data.get('phone-number'),
                    "DName": department
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

    return (
        // <div id="register-layout">
        //     <Form
        //         {...formItemLayout}
        //         form={form}
        //         name="basic"
        //         onFinish={onFinish}
        //         initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
        //         style={{ maxWidth: 600 }}
        //         scrollToFirstError
        //     >
        //         <Form.Item
        //             name="username"
        //             label="Username"
        //             rules={[
        //                 {
        //                     required: true,
        //                     message: 'Please input your Username!',
        //                 },
        //             ]}
        //         >
        //             <Input />
        //         </Form.Item>

        //         <Form.Item
        //             name="password"
        //             label="Password"
        //             rules={[
        //                 {
        //                     required: true,
        //                     message: 'Please input your password!',
        //                 },
        //             ]}
        //             hasFeedback
        //         >
        //             <Input.Password />
        //         </Form.Item>

        //         <Form.Item
        //             name="confirm"
        //             label="Confirm Password"
        //             dependencies={['password']}
        //             hasFeedback
        //             rules={[
        //                 {
        //                     required: true,
        //                     message: 'Please confirm your password!',
        //                 },
        //                 ({ getFieldValue }) => ({
        //                     validator(_, value) {
        //                         if (!value || getFieldValue('password') === value) {
        //                             return Promise.resolve();
        //                         }
        //                         return Promise.reject(new Error('The new password that you entered do not match!'));
        //                     },
        //                 }),
        //             ]}
        //         >
        //             <Input.Password />
        //         </Form.Item>

        //         <Form.Item
        //             name="phone"
        //             label="Phone Number"
        //             rules={[{ required: false, message: 'Please input your phone number!' }]}
        //         >
        //             <Input style={{ width: '100%' }} />
        //         </Form.Item>

        //         {/* <Form.Item
        //         name="department"
        //         label="Department"
        //         rules={[{ required: true, message: 'Please input website!' }]}
        //     >
        //         <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="Your department">
        //             <Input />
        //         </AutoComplete>
        //     </Form.Item> */}

        //         {/* <Form.Item
        //         name="intro"
        //         label="Intro"
        //         rules={[{ required: true, message: 'Please input Intro' }]}
        //     >
        //         <Input.TextArea showCount maxLength={100} />
        //     </Form.Item> */}

        //         <Form.Item
        //             name="role"
        //             label="Role"
        //         // rules={[{ required: false, message: 'Please select gender!' }]}
        //         >
        //             <Select placeholder="select your Role">
        //                 <Option value="0">Manager</Option>
        //                 <Option value="1">Deparment</Option>
        //             </Select>
        //         </Form.Item>

        //         <Form.Item
        //             name="department"
        //             label="Department"
        //         // rules={[{ required: false, message: 'Please select gender!' }]}
        //         >
        //             <Select placeholder="select your Department">
        //                 <Option value="male">Department 1</Option>
        //                 <Option value="female">Department 2</Option>
        //                 <Option value="other">Department 3</Option>
        //             </Select>
        //         </Form.Item>

        //         <Form.Item {...tailFormItemLayout}>
        //             <Button type="primary" htmlType="submit">
        //                 Register
        //             </Button>
        //         </Form.Item>
        //     </Form>
        // </div>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={6}
                sx={{
                    backgroundColor: '#161616',
                    boxShadow: '4px 10px 40px 0px rgba(0, 0, 0, 0.25)',
                    alignItems: 'center',
                    display: 'flex',
                }}
            >
                <Card sx={{ backgroundColor: 'transparent', paddingRight: '100px' }}>
                    <CardMedia
                        component="img"
                        image={logo}
                        alt="green iguana"
                        sx={{
                            transform: 'scale(0.9, 0.9)',
                        }}
                    />
                </Card>
            </Grid>
            <Grid item xs={6} sx={{
                backgroundColor: '#990000',
                display: 'flex',
                alignItems: 'center',
                position: 'relative'
            }}
            >
                <Box sx={{
                    backgroundColor: '#EAEAEA',
                    borderRadius: '20px',
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    width: '85%',
                    height: '70%',
                    flexShrink: 0,
                    position: 'absolute',
                    left: '-15%'
                }}
                >
                    <Box
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#161616' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Đăng Ký
                        </Typography>
                        <Box component="form" noValidate onSubmit={onFinish} sx={{ mt: 3 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="username"
                                        label="Username"
                                        type="username"
                                        id="username"
                                        autoComplete="username"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="repeat-password"
                                        label="Repeat Password"
                                        type="password"
                                        id="repeat-password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="phone-number"
                                        label="Phone Number"
                                        type="number"
                                        id="phone-number"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={role}
                                            label="Role"
                                            onChange={handleChangeRole}
                                        >
                                            <MenuItem value={0}>Manager</MenuItem>
                                            <MenuItem value={1}>Employee</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Department</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={department}
                                            label="Department"
                                            // size="small"
                                            onChange={handleChangeDepartment}
                                        >
                                            <MenuItem value={'Finance'}>Finance</MenuItem>
                                            <MenuItem value={'Human Resource'}>Human Resource</MenuItem>
                                            {/* <MenuItem value={1}>Human Resource</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Đăng Ký
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Typography variant="body2">
                                        Đã có tài khoản?
                                        <Link to="/login" >
                                            Đăng nhập
                                        </Link>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid >
    )
}

export default register