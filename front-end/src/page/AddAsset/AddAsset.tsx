import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import "../AssetDetail/AssetDetail.css";
import { Form, Input, Select } from "antd";
import type { FormInstance } from "antd/es/form";

const AddAsset = (props: any) => {
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

  const handleOk = () => {
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  const { Option } = Select;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const formRef = React.useRef<FormInstance>(null);

  const onGenderChange = (value: any) => {
    switch (value) {
      case "Information Technology":
        formRef.current?.setFieldsValue({ department_id: 1 });
        break;
      case "Human Resources":
        formRef.current?.setFieldsValue({ department_id: 2 });
        break;
      case "Finance":
        formRef.current?.setFieldsValue({ department_id: 3 });
        break;
      default:
        break;
    }
  };

  const onFinish = async (values: any) => {
    try {
        console.log("fsf");
        console.log(values)
      // Make a POST request to your registration API endpoint
      const response = await fetch('http://localhost:8080/api/assets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            "Name": values.name, 
            "department_id": parseInt(values.department_id),
            "Type": values.type,
            "Status": values.status,
            "status_note": values.status_note,
            "Description": values.description,
        }),
      });
      console.log(values)

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Registration successful, you can handle the response accordingly
        // console.log('Registration successful');
        console.log(values)
        window.location.href = "../view-asset"

      } else {
        // Registration failed, handle the error response
        const errorData = await response.json();
        console.error('Failed:', errorData);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during registration:', error);
    }
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };


  return (
    <div id="add-asset-layout">
      <Modal
        title={"Add new asset"}
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        className="my-modal-header"
        data-testid="add-asset-modal"
      >
        <Form
          {...layout}
          ref={formRef}
          name="control-ref"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="department_id" label="Department" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              <Option data-testid="department_opt" value="1">Information Technology</Option>
              <Option data-testid="department_opt" value="2">Human Resources</Option>
              <Option data-testid="department_opt" value="3">Finance</Option>
            </Select>
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input/>
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Input/>
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input/>
          </Form.Item>
          <Form.Item name="status_note" label="StatusNote" rules={[{ required: true }]}>
            <Input/>
          </Form.Item>
          {/* <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.gender !== currentValues.gender
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("gender") === "other" ? (
                <Form.Item
                  name="customizeGender"
                  label="Customize Gender"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              ) : null
            }
          </Form.Item> */}
          <Form.Item {...tailLayout}>
            <Button id="submit-add-asset" type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default AddAsset;
