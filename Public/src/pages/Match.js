/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Button,
    Avatar,
    Typography,
  } from "antd";
  
  
  // Images 
  import face from "../assets/images/face-1.jpg";
  import face2 from "../assets/images/face-2.jpg";

  
  const { Title } = Typography;
  // table code start
  const columns = [
    {
      title: "ID MATCHING",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "PARTNER 1",
      dataIndex: "name1",
      key: "name1",
      width: "25%",
    },
    {
      title: "PARTNER 2",
      dataIndex: "name2",
      key: "name2",
      width: "25%",
    },
    {
      title: "STATUS",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "START DATE",
      key: "date",
      dataIndex: "date",
    },
  ];
  
  const data = [
    {
      key: "1",
      id: "#MC0001",
      name1: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={face}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>Nguyen Quoc Huy</Title>
              <p>huynd@fpt.com</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      name2: (
        <>
          <Avatar.Group>
            <Avatar
              className="shape-avatar"
              shape="square"
              size={40}
              src={face2}
            ></Avatar>
            <div className="avatar-info">
              <Title level={5}>Chi Sô</Title>
              <p>chiso@mail.com</p>
            </div>
          </Avatar.Group>{" "}
        </>
      ),
      function: (
        <>
          <div className="author-info">
            <Title level={5}>Manager</Title>
            <p>Organization</p>
          </div>
        </>
      ),
  
      status: (
        <>
          <Button type="danger" className="tag-danger">
            Matching
          </Button>
        </>
      ),
      date: (
        <>
          <div className="ant-employed">
            <span>22/11/2022</span>
            <a href="#pablo">Edit</a>
          </div>
        </>
      ),
    },
  ];
  
  function Tables() {
    const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  
    return (
      <>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Matching"
                extra={
                  <>
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">All</Radio.Button>
                      <Radio.Button value="b">ONLINE</Radio.Button>
                    </Radio.Group>
                  </>
                }
              >
                <div className="table-responsive">
                  <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="ant-border-space"
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
  
  export default Tables;
  