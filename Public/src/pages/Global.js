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

  import React from 'react';
  import { getAllPosts,deletePost} from "../services/postService";
  // import {  toast } from "react-toastify";
  // Images
  import face from "../assets/images/face-1.jpg";
  import face2 from "../assets/images/face-2.jpg";
  
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
  
  
  function Tables() {
    


    const [postId, setPostId] = useState(0);
    const [post, setPost] = useState([]);
    const getPost = async (id) => {
      const res = await axios.get("http://localhost:8000/post/"+id)
      setPost(res.data.post)
      console.log(post)
    }
  // table code start
  const columns = [
    {
      title: "AUTHOR",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "CONTENT",
      dataIndex: "content",
      key: "content",
      width: "40%",
    },
  
    {
      title: "IMAGES",
      key: "images",
      dataIndex: "images",
    },
    {
      title: "CREATEDAT",
      key: "createdat",
      dataIndex: "createdat",
    },    
    {
      title: "UPDATEDAT",
      key: "updatedat",
      dataIndex: "updatedat",
    },
    {
      title: "ACTION",
      key: "key",
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: "16px", color: "blue" }}
            onClick={() => {
              console.log(record._id);
              setPostId(record._id);
              getPost(record._id);
              console.log(post);
              showModalEdit();
            }}
            // onClick={showModal}
          >
            <EditOutlined />
          </Button>
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
  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };
  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };
  const handleCancel = () => {
    setIsModalEditOpen(false);
    setIsModalAddOpen(false);
    setPost([]);
  };


  const [data, setData] = useState([]);
  useEffect(() => {
    getAllPosts()
      .then((res) => {
        // console.log(res);
        const newData = res.data.posts.map((p)=>{
          return {
            name:p.user.name,
            content:p.content,
            createdat:p.createdAt,
            updatedat:p.updatedAt
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  }, [data]);

  const handleDelete = (key) => {
    deletePost(key)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  
  const onFinishupdate = async (values) => {
    try {
      const response = await axios.put("http://localhost:8000/post/" + postId, {
        ...values,
      });
      if (response.status === 200) {
        console.log("Update successfully");
        setPost([]);
      }
    } catch (err) {
      console.log(err);
    }
    console.log("Success:", values);
    setIsModalEditOpen(false);
  };

  const onFinishadduser = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/post", {
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
      <>
        <div className="tabled">
        <div className="add">
            <Button onClick={showModalAdd}>Add</Button>
          </div>
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
        <Modal title="Basic Modal" open={isModalEditOpen} onCancel={handleCancel}>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
      </>
    );
  }
  
  export default Tables;
  