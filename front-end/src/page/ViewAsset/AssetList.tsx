import { Select, Button, Popconfirm, message } from "antd";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ReactNode, useEffect, useState } from "react";
import "./ViewAsset.css";
import AssetDetail from "../AssetDetail/AssetDetail";
import axios from "axios";

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
        alert(error.response.data.error);
      });
  };

  const role = localStorage.getItem("role");

  const url =
    "http://localhost:8080/api/assets/?department_id=" + props.departmentId;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error: any) => {
        alert(error);
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
              <Button type="primary" onClick={() => handleClick(item.id)} data-testid="view-asset-detail">
                View
              </Button>
              <Popconfirm
                title="Delete asset"
                description="Are you sure to delete this asset?"
                onConfirm={() => deleteData(item.id)}
                okText="Yes"
                cancelText="No"
                data-testid="pop-confirm-delete"
              >
                <Button
                  className={`DeleteButton__${
                    role === "0" ? `manager` : `employee`
                  }`}
                  type="primary"
                  danger
                  // onClick={() => deleteData(item.id)}
                  data-testid="delete-asset"
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
