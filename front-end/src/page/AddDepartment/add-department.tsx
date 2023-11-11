
import React, { useState } from 'react';

import "../AddDepartment/add-department.css";
import { Alert, Input } from 'antd';
import { Button, Flex } from 'antd';
import { CloseOutlined } from '@ant-design/icons';



// Tạo một functional component đơn giản
const AddDepartment = () => {


  interface DepartmentData {
    departmentName: string;
    email: string;
    password: string;
  
  }

  const [departmentData, setDepartmentData] = useState({
    departmentName: '',
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordMismatchError, setPasswordMismatchError] = useState<boolean>(false);

  const handleClose = () => {
    // Handle the close logic here
  };

  const handleConfirm = () => {
    // Handle the confirm logic here
    if (departmentData.password !== confirmPassword) {
      setPasswordMismatchError(true);
      return;
    }
    
    console.log('Department Data:', departmentData);
  };

  const handleInputChange = <T extends keyof DepartmentData>(fieldName: T, value: string) => {
    // Cập nhật state khi có thay đổi ở các trường nhập liệu
    setDepartmentData({
      ...departmentData,
      [fieldName]: value,
    });

    // Reset lỗi khi có sự thay đổi ở trường Password
    if (fieldName === 'password') {
      setPasswordMismatchError(false);
    }

  };

  

  return (
    <div className='addDeBox'>
         <CloseOutlined className="close-icon" onClick={handleClose} />
        <div className='fillbox'>
        <div className='Department-name-text'>Department Name</div>
        <Input placeholder="Please enter department name" className='Input'  value={departmentData.departmentName}
          onChange={(e) => handleInputChange('departmentName', e.target.value)} />
        </div>
        <hr/>
         

        <div className='fillbox'>
        <div className='fill-box-text'>Email</div>
        <Input placeholder="Please enter email usage"className='Input' value={departmentData.email}
          onChange={(e) => handleInputChange('email', e.target.value)} />
        </div>

        <div className='fillbox'>
        <div className='fill-box-text'>Password</div>
        <Input placeholder="Please enter password"className='Input'type="password"  value={departmentData.password}
          onChange={(e) => handleInputChange('password', e.target.value)} />
        </div>

        <div className='fillbox'>
        <div className='fill-box-text'>Comfirm password</div>
        <Input placeholder="Please enter password"className='Input' type="password" value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        
          
        {passwordMismatchError && (
        <Alert message="Password and Confirm Password do not match!" type="error" showIcon />
      )}

        <Button className='button-confirm' type="primary" onClick={handleConfirm} >Comfirm</Button>
    </div>
  );
};

export default AddDepartment;