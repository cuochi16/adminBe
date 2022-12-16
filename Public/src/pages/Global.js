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
      width: "20%",
    },
  
    {
      title: "IMAGES",
      key: "images",
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: "16px", color: "#FFF", backgroundColor: "#E94057" }}
            onClick={() => {
              console.log(record._id);
              setPostId(record._id);
              getPost(record._id);
              console.log(post);
              showModalPreview();
            }}
            // onClick={showModal}
          >
            Preview
          </Button>
        </>
      ),
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
            style={{ marginRight: "16px", color: "#FFF", backgroundColor: "#E94057" }}
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
    setPost([]);
  };


  const [data, setData] = useState([]);
  useEffect(() => {
    getAllPosts()
      .then((res) => {
        // console.log(res);
        const newData = res.data.posts.map((p)=>{
          return {
            _id:p._id,
            name:p.user.name,
            content: truncateStr(`${p.content}`,40,'...'),
            createdat:p.createdAt,
            updatedat:p.updatedAt,
            image:p.image
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
      const response = await axios.put("http://localhost:8000/post/" + postId, {...values,});
      if (response.status === 200) {
        console.log("Update successfully");
        setPost([]);
      }
    } catch (err) {
      console.log(err);
    }
    console.log("Success:", values);
    setPost([]);
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
      <Main>
        <>
        <div className="tabled">
        {/* <div className="add">
            <Button onClick={showModalAdd}>Add</Button>
          </div> */}
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
        {post.length !==0 && (
          <Modal title="Update post" open={isModalEditOpen} onCancel={handleCancel} footer={null}>
            <Form {...layout} name="nest-messages" onFinish={onFinishupdate} validateMessages={validateMessages} 
            initialValues={{
              name:post.user.name,
              content:post.content,
              like:post.like,
              createdAt:post.createdAt,
              updatedAt:post.updatedAt,
            }}
            >
              <Form.Item
                name="name"
                label="Name"

                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input disabled/>
              </Form.Item>
              <Form.Item
                name="content"
                label="Content"
                rules={[
                  {
                    type: 'content',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="createdAt"
                label="Created At"
                rules={[
                  {
                    type: 'createdAt',
                  },
                ]}
              >
                <Input disabled/>
              </Form.Item>
              <Form.Item
                name="updatedAt"
                label="Updated At"
                rules={[
                  {
                    type: 'updatedAt',
                  },
                ]}
              >
                <Input disabled/>
              </Form.Item>
              <Form.Item
                name="like"
                label="Like"
                rules={[
                  {
                    type: 'like',
                  },
                ]}
              >
                <Input disabled/>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 8,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        )}
        <Modal title="Basic Modal" open={isModalAddOpen} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        {post.length !==0 && (
        <Modal open={isModalPreview} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={post.image}
        />
      </Modal>
        )}
      </>
      </Main>
    );
  }
  
  export default Tables;
  