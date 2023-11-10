import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import "../AssetDetail/AssetDetail.css";
// import { getAssetDetail } from '../../api/api';

const AssestDetail = (props: any) => {
  const [data, setData] = useState({
    id: "",
    name: "",
    type: "",
    status: "",
    created_at: "",
    updated_at: "",
  });
  const loadData = async () => {
    const response = await axios.get(`http://localhost:8080/api/assets/${props.assetId}`);
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, [props.assetId]);

  console.log(data);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title={data["name"]}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        className="my-modal-header"
      >
        <div className="modal-sub-title">{data.id}</div>
        <div className="assest-wrapper">
          <div className="assest-container">
            <div className="subcontainer-title">
              <div>Category</div>
              <div>Status</div>
              <div>Created Date</div>
              <div>Updated Date</div>
            </div>

            <div className="subcontainer-content">
              <div>{data.type}</div>
              <div>{data.status}</div>
              <div>{data.created_at}</div>
              <div>{data.updated_at}</div>
            </div>
          </div>
          <div className="assest-container">
            <div className="subcontainer-title">
              <div>Department Name</div>
              <div>Room Number</div>
              <div>Cost</div>
            </div>

            <div className="subcontainer-content">
              <div>Department Name</div>
              <div>Room Number</div>
              <div>Cost</div>
            </div>
          </div>
        </div>

        <div className="assest-container" style={{ gap: "2.9rem" }}>
          <div className="subcontainer-title">
            <div>Description</div>
            <div>Status Note</div>
          </div>
          <div className="subcontainer-content">
            <div>Description</div>
            <div>Status Note</div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AssestDetail;
