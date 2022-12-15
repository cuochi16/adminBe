import { useNavigate } from 'react-router-dom';
import axios from "axios";
import React, { useEffect } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

function Signin() {
    let navigate = useNavigate();

    useEffect(() => {
    const username = localStorage.getItem("Username");
    if(username) {
      localStorage.clear();
    }
    },[]);

    const onFinish = async (values) => {
        const response = await axios.post('http://localhost:8000/user/login',values);
        if(response.status === 200) {
            console.log(response.data.user[0]);
            localStorage.setItem("Username",response.data.user[0].username);
            localStorage.setItem("Role",response.data.user[0].role);
            localStorage.setItem("Token",response.data.token);
            navigate("/users");
        }
        console.log(response);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      return (
        <>
        <Layout className="layout-default layout-signin">
          <Header
            style={{
              justifyContent: 'center'
            }}  
          >
            <div className="header-col header-brand">
              <h5>BeDating Dashboard</h5>
            </div>
          </Header>
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">BeAuth</Title>
                <Title className="font-regular text-muted" level={5}>
                  Please use your credentials to login. 
                </Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="ID"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your ID!",
                      },
                    ]}
                  >
                    <Input placeholder="ID" />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input placeholder="Password" />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    className="aligin-center"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked onChange={onChange} />
                    Remember me
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      Signin
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} alt="" />
              </Col>
            </Row>
          </Content>
          <Footer>
            <p className="copyright">
              {" "}
              Copyright © 2022 BeDating by <a href="#pablo">BeTek</a>{" "}
            </p>
          </Footer>
        </Layout>
      </>
      );
}

export default Signin

