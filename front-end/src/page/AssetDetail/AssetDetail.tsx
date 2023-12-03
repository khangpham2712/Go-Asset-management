import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import axios from "axios";
import "../AssetDetail/AssetDetail.css";
import { deleteData } from "../../utils/api";
// import { getAssetDetail } from '../../api/api';

const AssestDetail = (props: any) => {
  const [data, setData] = useState({
    id: "",
    name: "",
    type: "",
    status: "",
    department_name: "",
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

 
  // console.log(props)


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const deleteData = async () => {
    const response =  await axios.delete(
      `http://localhost:8080/api/assets/${props.assetId}`
    );
    props.setDeleted(true);

  };
  const role = localStorage.getItem("role");

  const dateFormatter = (input_date: string) => {
    const date = new Date(input_date)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  return (
    <>
    <div className="more-actions">
      <Button onClick={showModal} style={{backgroundColor: '#3C2EBE', color: '#fff'}}>
        View Asset
      </Button>
      <Button className={`DeleteButton__${role === "0" ? `manager` : `department`}`} type="primary" danger onClick={deleteData}>
        Delete
      </Button>
    </div>
      <Modal
        title={data["name"]}
        open={isModalOpen}
        onOk={handleEdit}
        okText= {isEdit ? "Save" : "Edit"}
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
            </div>

            <div className="subcontainer-content">
              {isEdit ? <Input className="custom_modal_input" defaultValue={data.type ?? ""}/> : <div>{data.type}</div>}
              {isEdit ? <Input className="custom_modal_input" defaultValue={data.status ?? ""}/> : <div>{data.status}</div>}
              {/* {isEdit ? <Input className="custom_modal_input" value={dateFormatter(data.created_at) ?? ""}/> : <div>{dateFormatter(data.created_at)}</div>} */}
              {/* <div>{data.status}</div> */}
              <div>{dateFormatter(data.created_at)}</div>
            </div>
          </div>

          <div className="assest-container">
            <div className="subcontainer-title">
              <div>Department Name</div>
              {/* <div>Room Number</div> */}
              <div>Cost</div>
              <div>Updated Date</div>
            </div>

            <div className="subcontainer-content">
              <div>{props.departmentName}</div>
              {/* <div>$20</div> */}
              {isEdit ? <Input className="custom_modal_input" defaultValue={"$20" ?? ""}/> : <div>{"$20"}</div>}
              <div>{dateFormatter(data.updated_at)}</div>
            </div>
          </div>
        </div>

        <div className="assest-container" style={{ gap: "2.9rem" }}>
          <div className="subcontainer-title">
            <div>Description</div>
            <div>Status Note</div>
          </div>
          <div className="subcontainer-content">
            {/* <div>{data.description}</div> */}
            <Input disabled={!isEdit} placeholder="Asset description"/>
            <div>{data.status_note}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AssestDetail;
