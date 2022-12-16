import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect,useState } from "react";
import {
    Row,
    Col,
    Card,
    Table,
    message,
    Button,
    Avatar,
    Typography,
    Modal,
    Popconfirm
  } from "antd";
  import Main from "../components/layout/Main";
  import {  Form, Input,  DatePicker, Select,} from "antd";

  import React from 'react';
  // import { getAllUsers,deleteUser } from "../services/userService";
  import { getAllSupports,deleteSupport } from "../services/supportService.js";

  const { Title } = Typography;
  
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  
  function Supports() {
    const [supportId, setSupportId] = useState(0);
    const [support, setSupport] = useState([]);
    const getSupport = async (id) => {
      const res = await axios.get("http://localhost:8000/support/"+id)
      setSupport(res.data.support)
      console.log(support)
    }
    const truncateStr = (str, length, ending) => {
      if (length == null) {
        length = 100;
      }
      if (ending == null) {
        ending = '...';
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
      } else {
        return str;
      }
    }
  // table code start
  const columns = [
    // {
    //   title: "FIRST NAME",
    //   dataIndex: "firstName",
    //   key: "firstName",
    //   width: "20%",
    // },
    // {
    //   title: "LAST NAME",
    //   dataIndex: "lastName",
    //   key: "lastName",
    //   width: "20%",
    // },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "MESSAGE",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "STATUS",
      dataIndex: "isAnswered",
      key: "isAnswered",
    },
    {
      title: "CREATEDAT",
      key: "createdAt",
      dataIndex: "createdAt",
    },    
    {
      title: "UPDATEDAT",
      key: "updatedAt",
      dataIndex: "updatedAt",
    },
    {
      title: "ACTION",
      key: "key",
      width: "30%",
      render: (_, record) => (
        <>
          {/* <Button
            style={{ marginRight: "16px", color: "#FFF", backgroundColor: "#E94057" }}
            onClick={() => {
              console.log(record._id);
              setSupportId(record._id);
              getSupport(record._id);
              console.log(support);
              showModalPreview();
            }}
            // onClick={showModal}
          >
            <EditOutlined />
          </Button> */}
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button style={{ color: "red" }}>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalPreview, setIsModalPreview] = useState(false);
  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };
  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };
  const showModalPreview = () => {
    setIsModalPreview(true);
  };
  const handleCancel = () => {
    setIsModalEditOpen(false);
    setIsModalAddOpen(false);
    setIsModalPreview(false);
    setSupport([]);
  };


  const [data, setData] = useState([]);
  useEffect(() => {
    getAllSupports()
      .then((res) => {
        // console.log(res);
        const newData = res.data.supports.map((p)=>{
          return {
            _id:p._id,
            // firstName:p.user.firstName,
            // lastName:p.user.lastName,
            name:p.name,
            email:p.email,
            phoneNumber:p.phoneNumber,
            title:truncateStr(`${p.title}`,10,'...'),
            message:truncateStr(`${p.message}`,30,'...'),
            isAnswered:p.isAnswered,
            // content: truncateStr(`${p.content}`,40,'...'),
            createdAt:p.createdAt,
            updatedAt:p.updatedAt
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  }, [data]);

  const handleDelete = (key) => {
    deleteSupport(key)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  
  const onFinishupdate = async (values) => {
    try {
      const response = await axios.put("http://localhost:8000/support/" + supportId, {...values,});
      if (response.status === 200) {
        console.log("Update successfully");
        setSupport([]);
      }
    } catch (err) {
      console.log(err);
    }
    console.log("Success:", values);
    setSupport([]);
    setIsModalEditOpen(false);
  };

  const onFinishadduser = async (values) => {
    try {
      const response = await axios.support("http://localhost:8000/support", {
        ...values,
      });
      // toast.success("User added successfully !");
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        // toast.error(err.response.data);
      }
    }
    setIsModalAddOpen(false);
  };


    return (
      <Main>
        <>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="#Global Posts"
              >
                <div className="table-responsive">
                <Row gutter={[24, 0]}>
                    <Col xs={24} xl={24} className="mb-24">
                      <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={data} />
                    </Col>
                  </Row>
                </div>
               
              </Card>
            </Col>
          </Row>
        </div>
      </>
      </Main>
    );
  }
  
  export default Supports;
  