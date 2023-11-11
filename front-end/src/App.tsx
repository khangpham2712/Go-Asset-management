import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';
import { Routes, Route } from 'react-router-dom'
import ViewAsset from './page/ViewAsset/ViewAsset';
import Login from './page/Login';
import AssetDetail from './page/AssetDetail/AssetDetail';
import AddDepartment from './page/AddDepartment/add-department';

function App() {
  return (
    <div className="App">    
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/view-asset' element={<ViewAsset />} />
      <Route path='/asset-detail' element={<AssetDetail />} />
      <Route path='/Add-department' Component={AddDepartment}/>
    </Routes>
    </div>
  );
}

export default App;
