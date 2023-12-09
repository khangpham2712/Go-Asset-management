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
    // department_name: "",
    employee_name: "",
    created_at: "",
    updated_at: "",
    description: "",
    status_note: "",
  });

  const loadData = async () => {
    await axios.get(
      `http://localhost:8080/api/assets/${props.assetId}`
    ) 
    .then((response) => {
      setData(response.data);
      console.log(response.data)
    })
    .catch((error: any) => {
      alert(error);
    });
  };
  useEffect(() => {
    loadData();
  }, [props.assetId]);

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
        width={780}
        className="my-modal"
        footer={null}
      >
        <div className="modal-sub-title">{data.id}</div>
        <div className="assest-wrapper">
          <div className="assest-container">
            <div className="subcontainer-title">
              <div>Category</div>
              {/* <div>Status</div> */}
              <div>Created Date</div>
              <div>Updated Date</div>
            </div>

            <div className="subcontainer-content">
              <div>{data.type}</div>
              {/* <div>{data.status}</div> */}
              <div>{data.created_at.toString().slice(0, 19).replace("T", " ")}</div>
              <div>{data.updated_at.toString().slice(0, 19).replace("T", " ")}</div>
            </div>
          </div>
          <div className="assest-container"  style={{flexShrink: 1}}>
            <div className="subcontainer-title">
              {/* <div>Department Name</div> */}
              <div>Status</div>
              <div>Employee</div>
            </div>

            <div className="subcontainer-content">
              {/* <div>{props.departmentName}</div> */}
              <div>{data.status}</div>
              <div>{props.employeeName}</div>
            </div>
          </div>
        </div>

        <div className="assest-container" style={{ gap: "3.1rem" }}>
          <div className="subcontainer-title">
            <div>Description</div>
          </div>
          <div className="subcontainer-content">
            <div>{data.description}</div>
          </div>
        </div>

        <div className="assest-container" style={{ gap: "3.1rem" }}>
          <div className="subcontainer-title">
            <div>Status Note</div>
          </div>
          <div className="subcontainer-content">
            <div>{data.status_note}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AssestDetail;
