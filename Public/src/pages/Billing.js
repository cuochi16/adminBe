import {
  Row,
  Col,
  Card,
  Statistic,
  Button,
  List,
  Descriptions,
  Avatar,
} from "antd";
import { useEffect,useState } from "react";

import { PlusOutlined, ExclamationOutlined } from "@ant-design/icons";
import Main from "../components/layout/Main";
import mastercard from "../assets/images/mastercard-logo.png";
import paypal from "../assets/images/paypal-logo-2.png";
import { getAllOrders,deleteOrder} from "../services/orderService";
import axios from "axios";


function Billing() {
 
  const wifi = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 22.5 20.625"
      key={0}
    >
      <g id="wifi" transform="translate(0.75 0.75)">
        <circle
          id="Oval"
          cx="1.5"
          cy="1.5"
          r="1.5"
          transform="translate(9 16.875)"
          fill="#fff"
        ></circle>
        <path
          id="Path"
          d="M0,1.36a6.377,6.377,0,0,1,7.5,0"
          transform="translate(6.75 11.86)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
        <path
          id="Path-2"
          data-name="Path"
          d="M14.138,2.216A12.381,12.381,0,0,0,0,2.216"
          transform="translate(3.431 6)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
        <path
          id="Path-3"
          data-name="Path"
          d="M0,3.294a18.384,18.384,0,0,1,21,0"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
      </g>
    </svg>,
  ];

  const angle = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      key={0}
    >
      <g id="bank" transform="translate(0.75 0.75)">
        <path
          id="Shape"
          transform="translate(0.707 9.543)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
        <path
          id="Path"
          d="M10.25,0,20.5,9.19H0Z"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
        <path
          id="Path-2"
          data-name="Path"
          d="M0,.707H20.5"
          transform="translate(0 19.793)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="1.5"
        ></path>
      </g>
    </svg>,
  ];


  const deletebtn = [
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
        fill="#111827"
        className="fill-danger"
      ></path>
    </svg>,
  ];

  const [price,setPrice] = useState(0);
  const getTotal = async () =>{
    const res = await axios.get("http://localhost:8000/order/successful");
    console.log(res)
  }
  
  

  const [information,setInformation] = useState([]);
  useEffect(() => {
    getAllOrders()
      .then((res) => {
        const newData = res.data.orders.map((o)=>{
          return {
            _id:o._id,
            name:o.user.name,
            userID:o.user._id,
            type: o.type.name,
            price:o.type.price,            
            isDone:o.isDone,
            createdAt:o.createdAt,
            updatedAt:o.updatedAt,
          }
        });
        setInformation(newData);
      })
      .catch((err) => console.log(err));
  }, [information]);

  
  useEffect(() => {
    getAllOrders()
    .then((res) => {
      const newData = res.data.orders.map((t)=>{
        return {          
          name:t.user.name,
          price: t.type.price,            
          isDone:t.isDone,
        }
      }).filter((o)=>o.isDone==="successful");
      console.log(newData);
      let total = 0;
      for(const i in newData){
        console.log(newData[i].price);
        total = total + newData[i].price;
      }
      setPrice(total);
    })
  }, []);

  const handleOrder = async (userID,orderID) =>{
    const res = await axios.patch("http://localhost:8000/order/",{userID,orderID})
    console.log(res)
  }
  const handleCancel = async (orderID) =>{
    const res = await axios.patch("http://localhost:8000/order/",{orderID})
    console.log(res)
  }
  const mins = [
    <svg
      width="10"
      height="10"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
        className="fill-danger"
      ></path>
    </svg>,
  ];
  const yesterday = [
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Stripe",
      description: "26 March 2021, at 12:30 AM",
      amount: "+ $750",
      textclass: "text-fill",
      amountcolor: "text-success",
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "HubSpot",
      description: "26 March 2021, at 11:30 AM",
      amount: "+ $1,050",
      textclass: "text-fill",
      amountcolor: "text-success",
    },
    {
      avatar: <PlusOutlined style={{ fontSize: 10 }} />,
      title: "Creative Tim",
      description: "26 March 2021, at 07:30 AM",
      amount: "+ $2,400",
      textclass: "text-fill",
      amountcolor: "text-success",
    },
  ];


  return (
    <Main>
      <>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={16}>
          <Row gutter={[24, 0]}>
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[<h6 className="font-semibold m-0">Billing Information</h6>]}
            bodyStyle={{ paddingTop: "0" }}
          >
            <Row gutter={[24, 24]}>
              {information.map((i, index) => (
                <Col span={24} key={index}>
                {i.isDone==="pending"&&
                  <Card className="card-billing-info" bordered="false">
                    <div className="col-info">
                        <Descriptions title={i.name}>
                        <Descriptions.Item label="Type" span={3}>
                        {i.type}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status" span={3}>
                        <h1 Style="color: #f0bc1d; font-weight: 550">Pending</h1>
                        </Descriptions.Item>
                        </Descriptions>
                    </div>
                    {i.isDone==="pending" && (
                    <div className="col-action">
                      <Button Style="color:#FFF; background-color:green;padding-bottom:40px" type="link" className="darkbtn" onClick={()=>handleOrder(i.userID,i._id)}>
                        Confirm
                      </Button>
                      <Button type="link" danger onClick={()=>handleCancel(i._id)}>
                        {deletebtn}CANCEL
                      </Button>
                    </div>
                    )}
                  </Card>
            }
                </Col>
              ))}
            </Row>
          </Card>
          </Row>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Row gutter={[24,0]}>
          <Col xs={24}  className="mb-24">
              <Card bordered={false} className="widget-2 h-full">
                <Statistic
                  title={
                    <>
                      <div className="icon">{angle}</div>
                      <h6>Salary</h6>
                      <p>Total revenue</p>
                    </>
                  }
                  value={price}
                  prefix={<PlusOutlined />}
                />
              </Card>
            </Col>
          </Row>
          <Card
            bordered={false}
            bodyStyle={{ paddingTop: 0 }}
            className="header-solid h-full  ant-list-yes"
            title={<h6 className="font-semibold m-0">Your Transactions</h6>}
            >
            {information.isDone!=="pending" &&
              <List
                className="yestday transactions-list"
                header={<h6>HISTORY</h6>}
                itemLayout="horizontal"
                dataSource={information}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name}
                    />
                    {item.isDone==="successful" && 
                    <div className="amount">
                      <span Style="color:green">+{item.price}</span>
                    </div>}
                    {item.isDone==="unsuccessful" && 
                    <div className="amount">
                      <span Style="color:#ed6060;">Cancelled</span>
                    </div>}
                  </List.Item>
                )}
              />
            }
            {information.isDone==="unsuccessful" &&
              <List
                className="yestday transactions-list"
                header={<h6>HISTORY</h6>}
                itemLayout="horizontal"
                dataSource={information}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.name}
                      description={item.description}
                    />
                    {item.isDone==="successful" && 
                    <div className="amount">
                      <span Style="color:green">+{item.price}</span>
                    </div>}
                    {item.isDone==="unsuccessful" && 
                    <div className="amount">
                      <span Style="color:#ed6060;">Cancelled</span>
                    </div>}
                  </List.Item>
                )}
              />}
          </Card>
        </Col>
      </Row>
    </>
    </Main>
  );
}

export default Billing;
