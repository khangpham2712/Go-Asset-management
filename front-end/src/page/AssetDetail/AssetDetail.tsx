import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import "../AssetDetail/AssetDetail.css";
import axios from "axios";

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
      // console.log(response.data)
    })
    .catch((error: any) => {
      alert(error.response.data.error);
    });
  };
  useEffect(() => {
    loadData();
  }, [props.assetId]);

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title={data["name"]}
        open={true}
        onCancel={handleCancel}
        width={780}
        className="my-modal"
        footer={null}
        data-testid="asset-detail-modal"
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
              <div data-testid="category">{data.type}</div>
              {/* <div>{data.status}</div> */}
              <div data-testid="created_at">{data.created_at.toString().slice(0, 19).replace("T", " ")}</div>
              <div data-testid="updated_at">{data.updated_at.toString().slice(0, 19).replace("T", " ")}</div>
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
              <div data-testid="status">{data.status}</div>
              <div data-testid="employeeName">{props.employeeName}</div>
            </div>
          </div>
        </div>

        <div className="assest-container" style={{ gap: "3.1rem" }}>
          <div className="subcontainer-title">
            <div>Description</div>
          </div>
          <div className="subcontainer-content">
            <div data-testid="description">{data.description}</div>
          </div>
        </div>

        <div className="assest-container" style={{ gap: "3.1rem" }}>
          <div className="subcontainer-title">
            <div>Status Note</div>
          </div>
          <div className="subcontainer-content">
            <div data-testid="status_note">{data.status_note}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AssestDetail;
