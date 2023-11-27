import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import "../AssetDetail/AssetDetail.css";

const AssestDetail = (props: any) => {
  const [data, setData] = useState({
    id: "",
    name: "",
    type: "",
    status: "",
    department_name: "",
    owner: "",
    created_at: "",
    updated_at: "",
    description: "",
    status_note: "",
  });

  const loadData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/assets/${props.assetId}`
    );
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, [props.assetId]);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   props.setIsModalOpen(true);
  // };

  const handleOk = () => {
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={data["name"]}
        open={true}
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
              {/* <div>Room Number</div> */}
              <div>Owner</div>
            </div>

            <div className="subcontainer-content">
              <div>{props.departmentName}</div>
              {/* <div>H2</div> */}
              <div>{data.owner}</div>
            </div>
          </div>
        </div>

        <div className="assest-container" style={{ gap: "2.9rem" }}>
          <div className="subcontainer-title">
            <div>Description</div>
            <div>Status Note</div>
          </div>
          <div className="subcontainer-content">
            <div>{data.description}</div>
            <div>{data.status_note}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AssestDetail;
