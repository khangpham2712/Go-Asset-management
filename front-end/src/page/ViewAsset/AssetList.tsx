import { Select, Button } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import './ViewAsset.css';
import AssetDetail from '../AssetDetail/AssetDetail';

type DataType = {
    assetId: number;
    name: string;
    category: string;
    status: string;
    departmentName: string;
    createdDay: string;
    updatedDay: string;
    assetDetail: ReactNode;
}
type AssetDataType = {
    id: number;
    name: string;
    type: string;
    status: string;
    department_id: number;
    created_at: string;
    updated_at: string;
    assetDetail: ReactNode;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'assetId',
        key: 'assetId',
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
        title: 'Department Name',
        dataIndex: 'departmentName',
        key: 'departmentName',
    },
    {
        title: 'Created Day',
        dataIndex: 'createdDay',
        key: 'createdDay',
      },
    {
        title: 'Updated Day',
        dataIndex: 'updatedDay',
        key: 'updatedDay',
    },    
    {
      title: 'Details',
      dataIndex: 'assetDetail',
      key: 'assetDetail'
  },
  ];
  
const AssetList = (props: {departmentId: number, departmentName: string}) => {
  const [data, setData] = useState<AssetDataType[]>([]);
  const [showItems, setShowItems] = useState<DataType[]>([]);
  const [deleted, setDeleted] = useState(false);

  const url = 'http://localhost:8080/api/assets/?department_id=' + props.departmentId;

  useEffect(() => {
    axios.get(url).then((response: { data: AssetDataType[] }) => {
      setData(response.data);
    }).catch((error: any) => {
      alert(error);
    });
  }, [props.departmentId, deleted]);


  useEffect(() => {
    setShowItems([]);
    data.map((item, index) => {
      const createdDay = item.created_at.substring(0,10);
      setShowItems((prevItems) => [...prevItems, {
        assetId: item.id,
        name: item.name,
        category: item.type,
        status: item.status,
        departmentName: props.departmentName,
        createdDay: createdDay,
        updatedDay: createdDay,
        assetDetail: <AssetDetail key={item.id} assetId={item.id} departmentName={props.departmentName} setDeleted={setDeleted}/>}])
    })
  }, [data]);
  
    return (
        <div className="AssetList"> 
            <div className='AssetList--table'>
                <Table columns={columns} dataSource={showItems} />
            </div>
        </div>
    );
  }
  
  export default AssetList;
  