/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect, useState} from 'react'
import Header from "./Header.js";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Footer from "./Footer.js";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

function formatDateTime(dateTimeString) {
  // Chuyển đổi chuỗi ngày thành đối tượng ngày
  const dateTime = new Date(dateTimeString);

  // Lấy thông tin ngày, tháng và năm
  const date = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
  const year = dateTime.getFullYear();

  // Lấy thông tin giờ và phút
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  // Định dạng ngày giờ theo ý muốn
  const formattedDateTime = `${date}/${month}/${year} ${hours}:${minutes}`;

  return formattedDateTime;
}

function Infouser() {
  const { id } = useParams()
  const [user, setUser] = useState('');
  useEffect(() => {
    axios.get(`http://localhost:4000/infouser/${id}`)
    .then (res => {
      setUser(res.data)
    }
    )
},[]);

const [values, setValues] = useState({
  password:'',
  newpassword:'',
  samenewpassword:'',
})

const handleSubmit = (event) =>{
  if(values.newpassword !== values.samenewpassword){
      alert('mật khẩu mới không giống nhau')
  }else{
    event.preventDefault();
            axios.post(`http://localhost:4000/resetpassword/${id}`, values)
            .then(res=> {
                if(res.data.Status === "Success"){
                    alert("Đổi Mật Khẩu Thành Công")
                }
                else{
                  alert(res.data.Message)
                }
            })
            .then(err => console.log(err));
  }

}
const [infoorder, setInfoorder] = useState('')
const [inforoom, setInforoom] = useState('')
const [infobranch, setInfobranch] = useState('')
useEffect(() => {
  axios.get(`http://localhost:4000/infooder/${id}`)
  .then (res => {
    setInfoorder(res.data.orderinfo)
    setInforoom(res.data.roominfo)
    setInfobranch(res.data.branchInfo)
  }
  )
},[]);

  return (
    <>
      <Header />
      <div className='infouser-body'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Thông Tin Người Dùng</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Đổi Mật Khẩu</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="three">Phòng đã đặt</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    {user && user.map(user => (
                      <div>
                          <div className='avt91'>
                            <Image src="https://i.imgur.com/cf5vxrd.png/171x180" width="150px" roundedCircle className='pppopopo'/>
                            <h5>{user.email}</h5>
                            <p>Member</p>
                          </div>
                          <div className='avt92'>
                            <h6>Thông Tin Tài Khoản</h6>
                            <Row className='abssshd'>
                              <Col>Tên Người Dùng: </Col>
                              <Col>Email: </Col>
                            </Row>
                            <Row className='loajdd'>
                              <Col> <Form.Control type="text" placeholder={user.nameuser} aria-label="Disabled input example" disabled readOnly /> </Col>
                              <Col><Form.Control type="text" placeholder={user.email}aria-label="Disabled input example" disabled readOnly /> </Col>
                            </Row>
                          </div>
                      </div>
                    ))}

                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                      <div className='resetpassword'>
                        <form onSubmit={handleSubmit}>
                          <p className='row d-flex justify-content-center align-items-center h-100'>Đổi Mật Khẩu</p>
                          <div className="form-outline mb-4">
                              <input type="password" id="form2Example11" className="form-control" placeholder="Vui Lòng nhập mật khẩu cũ của bạn" onChange={(e)=> setValues({...values, password: e.target.value})} />
                              <label className="form-label" htmlFor="form2Example11">Mật Khẩu Cũ</label>
                          </div>
                          <div className="form-outline mb-4">
                              <input type="password" id="form2Example11" className="form-control" placeholder="Vui lòng nhập mật khẩu mới" onChange={(e)=> setValues({...values, newpassword: e.target.value})} />
                              <label className="form-label" htmlFor="form2Example11">Mật Khẩu Mới</label>
                          </div>
                          <div className="form-outline mb-4">
                              <input type="password" id="form2Example22" className="form-control" onChange={(e)=> setValues({...values, samenewpassword: e.target.value})}/>
                              <label className="form-label" htmlFor="form2Example22">Nhập Lại Mật Khẩu Mới</label>
                          </div>
                          <div className="text-center mb-5">
                              <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Đổi Mật Khẩu</button>
                          </div>
                        </form>
                      </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="three">
                    <div className='order-bill'>
                        <h6>Thông Tin Đặt Phòng</h6>
                        <div>
                          {infoorder && infoorder.map(infoorder => (
                            <div>
                            {inforoom && inforoom.map(inforoom => (
                              <div>
                                {infobranch && infobranch.map(infobranch => (
                                  <div>
                                    <hr></hr>
                                    <Row className='abshsh'>
                                      <Col>Mã Đơn: {infoorder.idorder}</Col>
                                      <Col>Tên đặt phòng: {infoorder.nameorder}</Col>
                                    </Row>
                                    <Row className='abshsh'>
                                      <Col>Ngày Giờ CheckIn: {formatDateTime(infoorder.checkin_date)}</Col>
                                      <Col>Ngày Giờ CheckOut: {formatDateTime(infoorder.checkout_date)}</Col>
                                    </Row>
                                    <Row className='abshsh'>
                                      <Col>CMND: {infoorder.cmnd}</Col>
                                      <Col>Số điện thoại: {infoorder.sdt}</Col>
                                    </Row>
                                    <Row className='abshsh'>
                                      <Col>Tên Phòng: {inforoom.tenphong}</Col>
                                      <Col>Địa Chỉ: {infobranch.address}</Col>
                                    </Row>
                                    <div> TRẠNG THÁI : <span className='statusinfo'>{infoorder.status}</span></div>
                                  </div>
                                ))}
                              </div>
                            ))}
                            </div>
                          ))}
                        </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
      </div>
      <Footer />
    </>
    
  )
}

export default Infouser
