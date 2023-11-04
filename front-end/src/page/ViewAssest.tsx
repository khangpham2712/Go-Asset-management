import { Select, Button } from 'antd';
import type { MenuProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearch = (value: string) => {
    console.log('search:', value);
  };
  
  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const onMenuClick: MenuProps['onClick'] = (e: any) => {
    console.log('click', e);
};

interface DataType {
    assestId: string;
    name: string;
    category: string;
    status: string;
    department: string;
    createdDay: string;
    updatedDay: string;
}
  
  const columns: ColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'assestId',
        key: 'assestId',
        render: (text) => <a>{text}</a>,
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <a>{text}</a>,
    },
    {
        title: 'Department',
        dataIndex: 'department',
        key: 'department',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Created Day',
        dataIndex: 'updatedDay',
        key: 'updatedDay',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Updated Day',
        dataIndex: 'updatedDay',
        key: 'updatedDay',
        render: (text) => <a>{text}</a>,
    },
  ];
  
  const data: DataType[] = [
    {
        assestId: '000001',
        name: 'Swivel chair',
        category: 'Chair',
        status: 'Ok',
        department: 'Human Resources',
        createdDay: '15-07-2020',
        updatedDay: '21-01-2023',
    },
    {
        assestId: '000002',
        name: 'Macbook Air M1',
        category: 'Laptop',
        status: 'Ok',
        department: 'IT',
        createdDay: '25-03-2021',
        updatedDay: '15-07-2023',
    },
  ];
const ViewAssest = () => {

    return (
        <div className="ViewAssest">    
            <div className='ViewAssest--header'>
                <Select
                    showSearch
                    placeholder="Select department"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={[
                    {
                        value: 'Human Resources',
                        label: 'Human Resources',
                    },
                    {
                        value: 'IT',
                        label: 'IT',
                    },
                    {
                        value: 'Business',
                        label: 'Business',
                    },
                    ]}
                />
                <Button type="primary">Add assest</Button>
            </div>
            <div className='ViewAssest--table'>
                <Table columns={columns} dataSource={data} />
            </div>
        </div>
    );
  }
  
  export default ViewAssest;
  