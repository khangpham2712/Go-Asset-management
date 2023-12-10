import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';
import { Routes, Route } from 'react-router-dom'
import ViewAsset from './page/ViewAsset/ViewAsset';
import Login from './page/login/login';
import Register from './page/register/register';
import AssetDetail from './page/AssetDetail/AssetDetail';
import ViewUser from  './page/ViewUser/ViewUser';
import AddUser from './page/AddUser/AddUser';
import Counter from './page/example/Counter';
import Comments from './page/example/Comment';

function App() {
  return (
    <div className="App" data-testid="App">    
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register/>} />
      <Route path='/view-asset' element={<ViewAsset />} />
      <Route path='/asset-detail' element={<AssetDetail />} />
      <Route path='/view-user' element={<ViewUser />} />
      <Route path='/add-user' element={<AddUser />} />
      <Route path='/counter' element={<Counter />} />
      <Route path='/comment' element={<Comments />} />
    </Routes>
    </div>
  );
}

export default App;
