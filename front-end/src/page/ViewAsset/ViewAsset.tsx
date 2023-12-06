import { Select, Button } from 'antd';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import './ViewAsset.css';
import AssetList from './AssetList';
import internal from 'stream';
import AddAsset from '../AddAsset/AddAsset';
import { PlusOutlined } from '@ant-design/icons';
import {Header } from '../../components/Header/Header';

type DepartmentDataType = {
  Id: number;
  Name: string;
}

const ViewAsset = () => {
  const role = localStorage.getItem("role");
  const intialDepartmentId = localStorage.getItem("MYAPP_DEPARTMENTID");
  const intialDepartmentName = localStorage.getItem("MYAPP_DEPARTMENTNAME");

  // const [Department, setDepartment] = useState<string>((intialDepartment === null) ? 'vi' : intialDepartment);


  const [departments, setDepartments] = useState<DepartmentDataType[]>([]);
  const [departmentOption, setDepartmentOption] = useState<{ label: string; value: string, id: number }[]>([]);
  const [department, setDepartment] = useState<{id: number, name: string}>({id: 0, name: ""});
  // const [department, setDepartment] = useState<{id: number, name: string}>((intialDepartmentId === null && intialDepartmentName === null) ? {id: 0, name: ""} : {id: parseInt(intialDepartmentId), name: intialDepartmentName});
  const url = 'http://localhost:8080/api/departments/';
  // useEffect(() =>
  // {
  //     localStorage.setItem('MYAPP_DEPARTMENT', Department);
  // }, [Department]);
  useEffect(() => {
    axios.get(url).then((response: { data: DepartmentDataType[] }) => {
      setDepartments(response.data);
    }).catch((error: any) => {
      alert(error);
    });
  }, [department]);

  useEffect(() => {
    if(role === "1"){
      const intialDepartment = departments.find(items => items.Id.toString() === intialDepartmentId);
      if(intialDepartment) setDepartment({id: intialDepartment.Id, name: intialDepartment.Name});
    }
    else if(role === "0"){
      setDepartmentOption([]);
      departments.map((item) => {
      setDepartmentOption([...departmentOption, {
          label: item.Name,
          value: item.Name,
          id: item.Id,}])
      })}
  }, [departments]);


  const onChange = (value: string, option: any) => {
    setDepartment({id: option.id, name: option.value});
  };
  
  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string, id: number }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
      setIsModalOpen(true);
    };
    // console.log(isModalOpen)
  

    return (
        <div className="Viewasset"> 
            <Header />
            <div className="Viewasset--container">
            {role === "1" ? <p>{department.name} Department</p> : <></>}
            <div className={`Viewasset--header__${role === "0" ? `manager` : `department`}`}>
                <Select
                    className='Viewasset--select'
                    showSearch
                    placeholder="Select department"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={departments.map(item => ({
                      label: item.Name, 
                      value: item.Name,
                      id: item.Id,
                    }))}
                />
                <Button type="primary" className='Viewasset--button' onClick={handleClick}>Add asset <PlusOutlined /></Button>
                {isModalOpen && <AddAsset setIsModalOpen={setIsModalOpen}/>}
            </div>
            <AssetList departmentId={department.id} departmentName={department.name} />
            </div>
        </div>
    );
  }
  
  export default ViewAsset;
  