
import React, { useState } from 'react';

import "../AddDepartment/add-department.css";
import { Input } from 'antd';
import { Button, Flex } from 'antd';
import { CloseOutlined } from '@ant-design/icons';



// Tạo một functional component đơn giản
const AddDepartment = () => {


  const [departmentData, setDepartmentData] = useState({
    departmentName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });



  const handleClose = () => {
    // Handle the close logic here
  };

  const handleConfirm = () => {
    // Handle the confirm logic here
    console.log('Department Data:', departmentData);
  };

  

  return (
    <div className='addDeBox'>
         <CloseOutlined className="close-icon" onClick={handleClose} />
        <div className='fillbox'>
        <div className='Department-name-text'>Department Name</div>
        <Input placeholder="Please enter department name" className='Input' />
        </div>
        <hr/>
         

        <div className='fillbox'>
        <div className='fill-box-text'>Email</div>
        <Input placeholder="Please enter email usage"className='Input'  />
        </div>

        <div className='fillbox'>
        <div className='fill-box-text'>Password</div>
        <Input placeholder="Please enter password"className='Input'type="password"  />
        </div>

        <div className='fillbox'>
        <div className='fill-box-text'>Comfirm password</div>
        <Input placeholder="Please enter password"className='Input' type="password" />
        </div>
        
        <Button className='button-confirm' type="primary" >Comfirm</Button>
    </div>
  );
};

export default AddDepartment;