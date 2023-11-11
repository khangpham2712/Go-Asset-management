import { Select, Button } from 'antd';
import type { MenuProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import './ViewAsset.css';
import AssetList from './AssetList';
import internal from 'stream';
import AddAsset from '../AddAsset/AddAsset';



const ViewAsset = () => {
  const [department, setDepartment] = useState<{id: number, name: string}>({id: 1, name: "H6"});
  
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
    console.log(isModalOpen)
  
    return (
        <div className="Viewasset"> 
            <div className='Viewasset--header'>
                <Select
                    className='Viewasset--select'
                    showSearch
                    placeholder="Select department"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={filterOption}
                    options={[
                      {
                        value: 'H6',
                        label: 'H6',
                        id: 1,
                      },
                    {
                        value: 'H1',
                        label: 'H1',
                        id: 2,
                    },
                    {
                        value: 'H2',
                        label: 'H2',
                        id: 3,
                    },
                    ]}
                />
                <Button type="primary" className='Viewasset--button' onClick={handleClick}>Add asset</Button>
                {isModalOpen && <AddAsset setIsModalOpen={setIsModalOpen}/>}
            </div>
            <AssetList departmentId={department.id} departmentName={department.name} />
        </div>
    );
  }
  
  export default ViewAsset;
  