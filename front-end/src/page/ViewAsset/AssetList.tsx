import { Select, Button, Popconfirm, message } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import "./ViewAsset.css";
import AssetDetail from "../AssetDetail/AssetDetail";

type DataType = {
  assetId: number;
  name: string;
  category: string;
  status: string;
  departmentName: string;
  createdDay: string;
  updatedDay: string;
  actions: ReactNode;
};
type AssetDataType = {
  id: number;
  name: string;
  type: string;
  status: string;
  department_id: number;
  created_at: string;
  updated_at: string;
  actions: ReactNode;
};

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "assetId",
    key: "assetId",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Department Name",
    dataIndex: "departmentName",
    key: "departmentName",
  },
  {
    title: "Created Day",
    dataIndex: "createdDay",
    key: "createdDay",
  },
  {
    title: "Updated Day",
    dataIndex: "updatedDay",
    key: "updatedDay",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
  },
];

const AssetList = (props: { departmentId: number; departmentName: string }) => {
  const [data, setData] = useState<AssetDataType[]>([]);
  const [showItems, setShowItems] = useState<DataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetId, setAssetId] = useState();

  const handleClick = (id: any) => {
    setIsModalOpen(true);
    setAssetId(id);
  };

  const deleteData = async (assetId: any) => {
    await axios
      .delete(`http://localhost:8080/api/assets/${assetId}`)
      .then(() => {
        setData(
          data.filter((item) => {
            return item.id !== assetId;
          })
        );
        message.success('Asset was successfully deleted');
      })
      .catch((error: any) => {
        alert(error);
      });
  };

  const role = localStorage.getItem("role");

  const url =
    "http://localhost:8080/api/assets/?employee_id=" + props.departmentId;

  useEffect(() => {
    axios
      .get(url)
      .then((response: { data: AssetDataType[] }) => {
        setData(response.data);
      })
      .catch((error: any) => {
        // alert(error);
      });
  }, [props.departmentId]);

  useEffect(() => {
    setShowItems([]);
    data.map((item, index) => {
      const createdDay = item.created_at.substring(0, 10);
      setShowItems((prevItems) => [
        ...prevItems,
        {
          assetId: item.id,
          name: item.name,
          category: item.type,
          status: item.status,
          departmentName: props.departmentName,
          createdDay: item.name,
          updatedDay: item.updated_at,
          actions: (
            <div className="more-actions">
              <Button type="primary" onClick={() => handleClick(item.id)} id="view-asset-detail">
                View
              </Button>
              <Popconfirm
                title="Delete asset"
                description="Are you sure to delete this asset?"
                onConfirm={() => deleteData(item.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className={`DeleteButton__${
                    role === "0" ? `manager` : `department`
                  }`}
                  type="primary"
                  danger
                  // onClick={() => deleteData(item.id)}
                  id="delete-asset"
                >
                  Delete
                </Button>
              </Popconfirm>
            </div>
          ),
        },
      ]);
    });
  }, [data]);

  return (
    <>
      <div className="AssetList">
        <div className="AssetList--table">
          <Table columns={columns} dataSource={showItems} id="asset-list"/>
        </div>
      </div>
      {isModalOpen && (
        <AssetDetail
          assetId={assetId}
          employeeName={props.departmentName}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

export default AssetList;
