import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';
import { Routes, Route } from 'react-router-dom'
import ViewAssest from './page/ViewAssest';
import Login from './page/Login';

function App() {
  return (
    <div className="App">    
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/viewassest' element={<ViewAssest />} />
    </Routes>
    </div>
  );
}

export default App;
