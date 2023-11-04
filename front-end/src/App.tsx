import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import './App.css';
import Login from './pages/login/login';

function App() {
  return (
    <React.Fragment>
      <Layout>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Layout>
    </React.Fragment>
  );
}

export default App;
