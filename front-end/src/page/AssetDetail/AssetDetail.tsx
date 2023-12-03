import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import axios from "axios";
import "../AssetDetail/AssetDetail.css";
import { deleteData } from "../../utils/api";
import TextArea from "antd/es/input/TextArea";
// import { getAssetDetail } from '../../api/api';

type DepartmentDataType = {
  Id: number;
  Name: string;
}

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

  const [tmpdata, setTmpdata] = useState({
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

  const [departments, setDepartments] = useState<DepartmentDataType[]>([]);

  const loadData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/assets/${props.assetId}`
    );
    setData(response.data);
    setTmpdata(response.data)
  };

  useEffect(() => {
    loadData();
  }, [props.assetId]);

  useEffect(() => {
    const getDepartments = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/departments/`
      ).then(response => {
        setDepartments(response.data)

        // console.log(departments)
      })
      .catch(err => console.log('Theres some errors', err))
    }

    getDepartments()
  }, [])

  // onchange func
  const handleUpdateAsset = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    const body = {
      ...data,
      [name]: value,
    }

    setTmpdata(body)
  }

  const handleUpdateAssetTA = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    const body = {
      ...data,
      [name]: value,
    }

    setTmpdata(body)
  }

  const updateAsset = async (body: any) => {
    const response = await axios.put(
      `http://localhost:8080/api/assets/${props.assetId}`,
      {
        ...body
      }
    )
    .then(response => {
      setData(body)
    })
    .catch((err) => {console.log('Theres some error on calling api: ', err)})
  }

 
  // console.log(props)


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    if (isEdit) { // save
      updateAsset(tmpdata)
    }

    setIsEdit(!isEdit);
  };

  const handleCancel = () => {
    if (isEdit) { // edited but not saved
      setTmpdata(data)
    }

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
              {
                isEdit ? <Input name ="type" className="custom_modal_input" defaultValue={data.type ?? ""} onChange={handleUpdateAsset}/> :
                <div>{data.type}</div>
              }
              {
                isEdit ? <Input name="status" className="custom_modal_input" defaultValue={data.status ?? ""} onChange={handleUpdateAsset}/> :
                <div>{data.status}</div>
              }
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
              
              {/* {
                isEdit ? 
                  <Select
                    showSearch
                    placeholder="Select department"
                    optionFilterProp="children"
                    onChange={(value) => {
                      const body = {
                        ...data,
                        department_name: value,
                      }
                  
                      setTmpdata(body)
                      console.log(value)
                    }}
                    options={departments.map(item => ({
                      label: item.Name, 
                      value: item.Name,
                      id: item.Id,
                    }))}
                  />
                :
                <div>{props.departmentName}</div>
              } */}
              <div>{props.departmentName}</div>

              {/* <div>$20</div> */}
              {isEdit ? <Input name="cost" className="custom_modal_input" defaultValue={"$20" ?? ""}/> : <div>{"$20"}</div>}
              <div>{dateFormatter(data.updated_at)}</div>
            </div>
          </div>
        </div>

        <div className="last-assest-container" style={{ gap: "2.9rem" }}>
          <div className="description_note">
            <div style={{width: '15%'}}>Description</div>
            <TextArea
              name="description"
              disabled={!isEdit} 
              placeholder="Asset description" 
              defaultValue={data.description ?? "Asset description"}
              rows={4}
              maxLength={225}
              onChange={handleUpdateAssetTA}
              style={{marginBottom: '1rem'}}
              />
          </div>
          <div className="description_note">
            <div style={{width: '15%'}}>Status Note</div>
            {/* <div>{data.status_note}</div> */}
            <TextArea
              name="status_note"
              disabled={!isEdit} 
              placeholder="Status notes" 
              defaultValue={data.status_note ?? "Status note"}
              rows={2}
              maxLength={225}
              onChange={handleUpdateAssetTA}
              />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AssestDetail;
