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
import { useEffect } from "react";
import { useState } from "react";
import { getAllUsers } from "../services/userService";

  
  // Images
  import face2 from "../assets/images/face-2.jpg";

  const edit = [
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" fill="#E94056"/></svg>
  ];
  
  const remove = [
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" fill="#E94056" /></svg>
  ]

  const { Title } = Typography;
  // table code start
  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "GENDER",
      dataIndex: "gender",
      key: "gender",
    },
  
    {
      title: "EMAIL",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "BIRTHDAY",
      key: "dob",
      dataIndex: "dob",
    },
    {
      title: "SHOW ME",
      key: "gender_interest",
      dataIndex: "gender_interest",
    },
  ];
  
  // const data = [
  //   {
  //     key: "1",
  //     name: (
  //       <>
  //         <Avatar.Group>
  //           <Avatar
  //             className="shape-avatar"
  //             shape="square"
  //             size={40}
  //             src={face2}
  //           ></Avatar>
  //           <div className="avatar-info">
  //             <Title level={5}>Nguyễn Quốc Huy</Title>
  //             <p>huynq@fpt.edu.vn</p>
  //           </div>
  //         </Avatar.Group>{" "}
  //       </>
  //     ),
  //     function: (
  //       <>
  //         <div className="author-info">
  //           <Title level={5}>FPT Education</Title>
  //           <p>BTEC</p>
  //         </div>
  //       </>
  //     ),
  
  //     status: (
  //       <>
  //         <Button type="primary" className="tag-primary">
  //           ONLINE
  //         </Button>
  //       </>
  //     ),
  //     employed: (
  //       <>
  //         <div className="ant-employed">
  //           <span>23/04/18</span>
  //           <a href="#edit">{edit}</a>
  //           <a href="#delete">{remove}</a>
  //         </div>
  //       </>
  //     ),
  //   },
  // ];
  
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllUsers()
      .then((res) => {
        const newData = res.data.users;
        const account = newData.filter() 
        setData(account);
        console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [data]);



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
                title="Authors Table"
                extra={
                  <>
                    <Radio.Group onChange={onChange} defaultValue="a">
                      <Radio.Button value="a">All</Radio.Button>
                    </Radio.Group>
                  </>
                }
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
    );
  }
  
  export default Tables;
  