import React from 'react';
import './App.css';
import { DatePicker } from 'antd';
import { Routes, Route } from 'react-router-dom'
import ViewAsset from './page/ViewAsset/ViewAsset';
import Login from './page/Login/Login';
import Register from './page/Register/Register';
import AssetDetail from './page/AssetDetail/AssetDetail';
import ViewUser from './page/ViewUser/ViewUser';
import AddUser from './page/AddUser/AddUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/view-asset' element={<ViewAsset />} />
        <Route path='/asset-detail' element={<AssetDetail />} />
        <Route path='/view-user' element={<ViewUser />} />
        <Route path='/add-user' element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default App;
