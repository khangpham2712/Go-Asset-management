import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "antd";
import axios from "axios";
import "../AssetDetail/AssetDetail.css";
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
    ) 
    .then((response) => {
      setData(response.data);
      setTmpdata(response.data);
    })
    .catch((error: any) => {
      // alert(error.response.data.error);
    });
  };

  useEffect(() => {
    loadData();
  }, [props.assetId]);

  useEffect(() => {
    const getDepartments = async () => {
      // const response = await axios.get(
      //   `http://localhost:8080/api/departments/`
      // ).then(response => {
      //   setDepartments(response.data)

      //   // console.log(departments)
      // })
      // .catch(err => {
      //   // console.log('Theres some errors', err)
      // })
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
    .catch((err) => {
      // console.log('Theres some error on calling api: ', err)
    })
  }

 
  // console.log(props)


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


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

    props.setIsModalOpen(false);
    setIsEdit(false);
  };

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
      <Modal
        title={data["name"]}
        open={true}
        onOk={handleEdit}
        okText= {isEdit ? "Save" : "Edit"}
        onCancel={handleCancel}
        width={700}
        className="my-modal"
        data-testid="asset-detail-modal"
      >
        <div className="modal-sub-title">{data.id}</div>
        <div className="assest-wrapper">
          <div className="assest-container">
            <div className="subcontainer-title">
              <div>Name</div>
              <div>Category</div>
              <div>Created Date</div>
            </div>

            <div className="subcontainer-content">
              {
                isEdit ? <Input data-testid="aname" name ="name" className="custom_modal_input" defaultValue={data.name ?? ""} onChange={handleUpdateAsset} required={true} maxLength={255}/> :
                <div>{data.name}</div>
              }
              {
                isEdit ? <Input data-testid="atype" name ="type" className="custom_modal_input" defaultValue={data.type ?? ""} onChange={handleUpdateAsset}/> :
                <div data-testid="category">{data.type}</div>
              }
              {/* {isEdit ? <Input className="custom_modal_input" value={dateFormatter(data.created_at) ?? ""}/> : <div>{dateFormatter(data.created_at)}</div>} */}
              {/* <div>{data.status}</div> */}
              <div data-testid="created_at">{dateFormatter(data.created_at)}</div>
            </div>
          </div>

          <div className="assest-container">
            <div className="subcontainer-title">
              <div>Employee Name</div>
              {/* <div>Room Number</div> */}
              <div>Status</div>
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
              <div data-testid="employeeName">{props.employeeName || "Employee Name"}</div>

              {/* <div>$20</div> */}
              {
                isEdit ? <Input data-testid="astatus" name="status" className="custom_modal_input" defaultValue={data.status ?? ""} placeholder="Name can't be empty" required={true} onChange={handleUpdateAsset}/> :
                <div data-testid="status">{data.status}</div>
              }
              <div data-testid="updated_at">{dateFormatter(data.updated_at)}</div>
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
              data-testid="description"
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
              data-testid="status_note"
              />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AssestDetail;
