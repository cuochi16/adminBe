
import { useState } from "react";
import { useEffect } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Progress,
  Button,
  Timeline,
  Radio,
  Table 
} from "antd";
import {
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import { getAllUsers, deleteUser } from "../services/userService";
import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";
import Main from "../components/layout/Main";

import ava1 from "../assets/images/team-1.jpg";
import ava2 from "../assets/images/team-2.jpg";
import ava3 from "../assets/images/team-3.jpg";
import ava4 from "../assets/images/team-4.jpg";


function Home() {
  const role = localStorage.getItem("Role");
  const { Title, Text } = Typography;

  const onChange = (e) => console.log(`radio checked:${e.target.value}`);

  const [reverse, setReverse] = useState(false);

  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const post = [ 
    <svg xmlns="http://www.w3.org/2000/svg" width="22"
    height="22" viewBox="0 0 512 512">
    <path d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144V368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144H128v96h16c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48V144z" fill="#fff" /></svg>
  ]

  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const count = [
    {
      // Người dùng thanh toán
      today: "Premium",
      title: "$0.00",
      persent: "+0%",
      icon: dollor,
      bnb: "bnb2",
    },
    {
      // Người dùng hệ thống
      today: "Users",
      title: "36",
      persent: "+20%",
      icon: profile,
      bnb: "bnb2",
    },
    {
      // Người dùng mới
      today: "Matches",
      title: "+12",
      persent: "-20%",
      icon: heart,
      bnb: "redtext",
    },
    {
      //Các bài post
      today: "Posts",
      title: "12",
      persent: "0%",
      icon: post,
      bnb: "bnb2",
    },
  ];


  // Manage admin
  const list = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Match",
      dataIndex: "match",
      key: "match",
    },
    {
      title: "Post",
      dataIndex: "post",
      key: "post",
    },
  ];

  const timelineList = [
    {
      title: "Nguyễn Quốc Huy - 1 Month #35122",
      time: "16 NOV 7:20 PM",
      color: "green",
    },
    {
      title: "Nguyễn Văn Mạnh - 1 Month #35121",
      time: "16 NOV 7:20 PM",
      color: "green",
    },
    {
      title: "Pham Duc My - 12 Months #35120",
      time: "16 NOV 7:20 PM",
      color: "green",
    },
    {
      title: "Nguyễn Quốc Huy - 1 Month #35119",
      time: "15 NOV 2:45 PM",
      color: "red",
    },
    {
      title: "Quach Cong Tuan - 6 Months #35118",
      time: "15 NOV 1:30 PM",
      color: "green",
    },
    {
      title: "Quach Cong Tuan - 6 Months #35117",
      time: "14 NOV 3:30 PM",
      color: "red",
    },
  ];

  const [data, setData] = useState([]);
  useEffect(() => {
    getAllUsers()
      .then((res) => {
        const newData = res.data.users;
        const account = newData.filter((item) => {
          if (role === "admin") {
            return item.role === "admin";
          }
        });
        setData(account);
      })
      .catch((err) => console.log(err));
  }, [data]);
  return (
    <Main>
      <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.persent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={16} className="mb-24">
            <Card bordered={false} className="criclebox cardbody h-full">
              <div className="project-ant">
                <div>
                  <Title level={5}>Manage Users</Title>
                  <Paragraph className="lastweek">
                    done this month<span className="blue">40%</span>
                  </Paragraph>
                </div>
                <div className="ant-filtertabs">
                  <div className="antd-pro-pages-dashboard-analysis-style-salesExtra">
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">ALL</Radio.Button>
                      <Radio.Button value="b">FEMALE</Radio.Button>
                      <Radio.Button value="c">MALE</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
              <div className="ant-list-box table-responsive">
                <table className="width-100">
                  
                  <Row gutter={[24, 0]}>
                    <Col xs={24} xl={24} className="mb-24">
                      <Table
                        pagination={{ pageSize: 8 }}
                        columns={list}
                        dataSource={data}
                      />
                    </Col>
                  </Row>
                </table>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Payment History</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  this month <span className="bnb2">20%</span>
                </Paragraph>
                <Timeline
                  pending="Recording..."
                  className="timelinelist"
                  reverse={reverse}
                >
                  {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                      <Title level={5}>{t.title}</Title>
                      <Text>{t.time}</Text>
                    </Timeline.Item>
                  ))}
                </Timeline>
                <Button
                  type="primary"
                  className="width-100"
                  onClick={() => setReverse(!reverse)}
                >
                  {<MenuUnfoldOutlined />} REVERSE
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
    </Main>
  );
}

export default Home;
