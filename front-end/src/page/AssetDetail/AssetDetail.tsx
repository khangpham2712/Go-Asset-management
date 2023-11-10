import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import "../AssetDetail/AssetDetail.css";
// import { getAssetDetail } from '../../api/api';


const AssestDetail = (assestID: any) => {

  const [data, setData] = useState({});
  // const loadData = async () => {
    // const response = await getAssetDetail(assestID);
    // setData(response.data);
  // }
  // useEffect(() => {
  //   loadData();
  // })
  console.log(data)

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
        title="Asset Name"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={650}
        className="my-modal-header"
      >
        <div className="modal-sub-title">Asset ID</div>
        <div className="assest-wrapper">
          <div className="assest-container">
            <div className="subcontainer-title">
              <div>Category</div>
              <div>Status</div>
              <div>Created Date</div>
              <div>Updated Date</div>
            </div>

            <div className="subcontainer-content">
              <div>Category</div>
              <div>Status</div>
              <div>Created Date</div>
              <div>Updated Date</div>
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
