import React from 'react';
// import { Button, Checkbox, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css'

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

const Login = () => {
  const [loginErr, setLoginErr] = useState('')
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
  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      // Make a POST request to your login API endpoint
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "Username": data.get('username'),
          "Password": data.get('password'),
        }),
      });
      if (data.get('username') === '' || data.get('password') === '')
        setLoginErr('unfilled')
      // Check if the request was successful (status code 2xx)
      else if (response.ok) {
        // Login successful, you can handle the response accordingly
        const userData = await response.json();
        // console.log('Login successful. User data:', userData);
        localStorage.setItem('role', userData.Role);
        localStorage.setItem('id', userData.Id);
        window.location.href = "../view-asset"
      } else {
        // Login failed, handle the error response
        const errorData = await response.json();
        // console.error('Login failed:', errorData);
        setLoginErr('invalid');
      }
    } catch (error) {
      // Handle network or other errors
      // console.error('Error during login:', error);
      setLoginErr('invalid');
    }
  };

  return (
    // <div id="login-layout">
    //   <Form name="basic"
    //     labelCol={{
    //       span: 8,
    //     }}
    //     wrapperCol={{
    //       span: 16,
    //     }}
    //     style={{
    //       maxWidth: 600,
    //     }}
    //     initialValues={{
    //       remember: true,
    //     }}
    //     onFinish={onFinish}
    //     autoComplete="off"
    //   >
    //     <Form.Item
    //       label="Username"
    //       name="username"
    //       rules={[
    //         {
    //           required: true,
    //           message: 'Please input your username!',
    //         },
    //       ]}
    //     >
    //       <Input />
    //     </Form.Item>

    //     <Form.Item
    //       label="Password"
    //       name="password"
    //       rules={[
    //         {
    //           required: true,
    //           message: 'Please input your password!',
    //         },
    //       ]}
    //     >
    //       <Input.Password />
    //     </Form.Item>

    //     <Form.Item
    //       name="remember"
    //       valuePropName="checked"
    //       wrapperCol={{
    //         offset: 8,
    //         span: 16,
    //       }}
    //     >
    //       <Checkbox>Remember me</Checkbox>
    //     </Form.Item>

    //     <Form.Item
    //       wrapperCol={{
    //         offset: 8,
    //         span: 16,
    //       }}
    //     >
    //       <Button type="primary" htmlType="submit">
    //         Submit
    //       </Button>

    //     </Form.Item>
    //   </Form>
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
        backgroundColor: '#3c2ebe',
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
              my: 8,
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
              Đăng Nhập
            </Typography>
            <Box component="form" noValidate onSubmit={onFinish} sx={{ mt: 1, display: 'flex', flexDirection: 'column', width: '89%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                data-testid="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                data-testid="password"
                autoComplete="current-password"
              />
              {loginErr === 'invalid' ?
                <Typography data-testid="error" component="p" sx={{ color: "red" }}>
                  Đăng nhập thất bại: Sai tên tài khoản hoặc mật khẩu
                </Typography>
                : null
              } {loginErr === 'unfilled' ?
                <Typography data-testid="error" component="p" sx={{ color: "red" }}>
                  Vui lòng điền đủ tài khoản và mật khẩu
                </Typography>
                : null
              }
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Duy trì đăng nhập"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-testid="loginbtn"
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Typography variant="body2">
                    <Link to="/signin">
                      Bạn quên mật khẩu?
                    </Link>
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography variant="body2">
                    Bạn chưa có tài khoản?
                    <Link to='/register'>
                      {"Đăng ký ngay"}
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

export default Login