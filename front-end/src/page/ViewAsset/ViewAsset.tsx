import { Select, Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './ViewAsset.css';
import AssetList from './AssetList';
import AddAsset from '../AddAsset/AddAsset';
import { PlusOutlined } from '@ant-design/icons';
import {Header } from '../../components/Header/Header';

type EmployeeDataType = {
  id: number;
  username: string;
  password: string;
  login: boolean;
  role: number;
  telephone: string;
  dname: string;
};

const ViewAsset = () => {
  const role = localStorage.getItem("role");
  const intialEmployeeId = localStorage.getItem("id");

  const [employees, setEmployees] = useState<EmployeeDataType[]>([]);
  const [employeeOption, setEmployeeOption] = useState<{ label: string; value: string, id: number }[]>([]);
  const [employeeId, setEmployeeId] = useState<number>(0);

  const url = 'http://localhost:8080/api/users/';

  useEffect(() => {
    axios
      .get(url)
      .then((response: { data: EmployeeDataType[] }) => {
        setEmployees(response.data);
      })
      .catch((error: any) => {
        // console.log(error);
      });
  }, [employeeId]);

  useEffect(() => {
    if (role === "1") {
      if (intialEmployeeId)
      setEmployeeId(parseInt(intialEmployeeId));
    } else if (role === "0") {
      if (intialEmployeeId)
      setEmployeeId(parseInt(intialEmployeeId));
      setEmployeeOption([]);
      employees.map((item) => {
        setEmployeeOption([
          ...employeeOption,
          {
            label: item.username,
            value: item.username,
            id: item.id,
          },
        ]);
      });
    }
  }, [employees]);
console.log(intialEmployeeId);
  const onChange = (value: string, option: any) => {
    setEmployeeId(option.id);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: any
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
      setIsModalOpen(true);
    };

    return (
        <div className="Viewasset" data-testid="view-asset"> 
            <Header />
            <div className="Viewasset--container">
            {role === "1" ? <p data-testid="employee-role">Employee ID: {employeeId}</p> : <></>}
            <div className={`Viewasset--header__${role === "0" ? `manager` : `department`}`}>
                <Select
                    data-testid="manager-role"
                    className='Viewasset--select'
                    showSearch
                    placeholder="Search Employee ID"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={employees.map(item => {
                        if(item.role === 0) {
                          return {
                            label: item.id.toString(), 
                            value: item.id.toString(),
                            id: item.id,
                          }
                        }
                        else return {}
                    })}
                />
                <Button type="primary" className='Viewasset--button' onClick={handleClick} data-testid="add-asset-btn">Add asset <PlusOutlined /></Button>
                {isModalOpen && <AddAsset setIsModalOpen={setIsModalOpen}/>}
            </div>
            <AssetList employeeId={employeeId} />
            </div>
        </div>
    );
  }
  
  export default ViewAsset;
  