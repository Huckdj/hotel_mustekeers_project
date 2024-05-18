/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Footer from "./Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Collapse } from 'react-bootstrap'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price);
    }
function Roominfo() {
    const [values, setValues] = useState({
        checkindate:'',
        checkoutdate:'',
        cmnd:'',
        sdt:'',
        nameorder:'',
        iduser: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:4000/order/${id}`, values)
        .then(res=> {
        if(res.data.Status === "Success") {
            console.log(values)
            window.location.reload(true);
            alert("thành công")
        }
        else{
            console.log(res.data.error)
        }
        })
    }

    axios.defaults.withCredentials = true;
    const handleOpen = () => {
        axios.get('http://localhost:4000')
        .then(res => {
            if(res.data.Status === "Success"){
                setAuth(true)
                setOpenbooking(true);
                setValues(prevValues => ({
                    ...prevValues,
                    iduser: res.data.iduser
                }));
            }else {
                setAuth(false)
                alert("Vui lòng đăng nhập")
            }
        })
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
      };

    const [open, setOpen] = useState(false);
    const { id } = useParams()
    const [room, setRoom] = useState();
    const [branch, setBranch] = useState();
    const[openbooking, setOpenbooking] = useState(false)
    const [auth, setAuth] = useState(false);
    const handleClose = () => setOpenbooking(false);



    useEffect(() => {
            axios.get(`http://localhost:4000/roominfo/${id}`)
            .then (res => {
                setRoom(res.data.roomInfo)
                setBranch(res.data.branchInfo)
            }
            )
      },[id]);

    const [tips,setTips] =useState();
    useEffect(() => {
        axios.get('http://localhost:4000/tips')
        .then (res => {
            setTips(res.data)
        }
        )
  },[]);
  return (
    <>
    <Header/>
    <div>
        <div className="body-info">
            {room && room.map((roominfo) =>(
            <div>
                <div className="info-roombody">
                    <div className="img-info"><img src={roominfo.images}/></div>
                    <div className="text-inforooom">
                        <div className="textinfotenphong">Hạng Phòng {roominfo.hangphong} - {roominfo.tenphong}</div>
                        <div><FontAwesomeIcon icon={faMinus}/></div>
                        <div className="price-info">Giá : {formatPrice(roominfo.giatien)} ₫</div>
                        <div className="giadung">
                            <li>Hai Giờ Đầu: {formatPrice(roominfo.giatien)} ₫</li>
                        </div>
                        <div className="giadung">
                            <li>Qua Đêm: {formatPrice(roominfo.giatienquadem)} ₫</li>
                        </div>


                        {/*Đặt Phòng ở đây */}
                        <Button  type="button" class="btn btn-outline-success" onClick={handleOpen}>Đặt phòng</Button >
                        
                        {
                            auth ? (
                                <Modal
                                    open={openbooking}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        <div className="abchshd"><img src="https://i.imgur.com/K0ABAPc.png" width='70px'/>Đặt Phòng Khách Sạn</div>
                                    </Typography>
                                    
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Ngày Giờ Checkin </label>
                                                <input type="datetime-local" value={values.checkindate} id="form2Example11" className="form-control" onChange={(e)=> setValues({...values, checkindate: e.target.value})}></input>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Ngày Giờ Checkout </label>
                                                <input type="datetime-local" value={values.checkoutdate} id="form2Example11" className="form-control" onChange={(e)=> setValues({...values, checkoutdate: e.target.value})}></input>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Nhập Số CMND</label>
                                                <input type="text" id="form2Example11" className="form-control" placeholder="Vui Lòng nhập CMND" onChange={(e)=> setValues({...values, cmnd: e.target.value})} />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Nhập SĐT</label>
                                                <input type="text" id="form2Example11" className="form-control" placeholder="Vui Lòng nhập SĐT" onChange={(e)=> setValues({...values, sdt: e.target.value})} />
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Nhập Tên Khách Hàng</label>
                                                <input type="text" id="form2Example11" className="form-control" placeholder="Vui Lòng nhập tên khách hàng" onChange={(e)=> setValues({...values, nameorder: e.target.value})} />
                                            </div>
                                            <div className="text-center mb-5">
                                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Đặt Phòng</button>
                                            </div>
                                        </form>
                                    </Typography>
                                    </Box>
                                </Modal>
                                ) : (
                                    <div></div>
                                )
                        }
                        
                        {/* */}
                        <p>------------------------------------------</p>
                        {branch && branch.map((branch) =>(
                            <div>
                                {branch.namebranch}
                                <div>Địa chỉ: {branch.address }</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="info-bonus">
                    <a onClick={() => setOpen(!open)} href='#' aria-controls="example-collapse-text" aria-expanded={open} className="abchas">
                        <FontAwesomeIcon icon={faChevronDown} className={open ? "rotate rotate-icon" : "rotate-icon"}/> Thông Tin Chung
                    </a>
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                        <p className="contentabch">
                            <div className="contennt81823"> 
                                <p className="abcajs"><p>Hạng Phòng:</p> <span>{roominfo.hangphong}</span></p>
                            </div>
                            <div className="contennt81823"> 
                                <p className="abcajs"><p>Loại Giường</p> <span>{roominfo.loaigiuong}</span></p>
                            </div>
                        </p>
                        </div>
                    </Collapse>
                </div>
            </div>
        )
            )}
        </div>
        <div className="goiyroominfo">
            <h4>CÓ THỂ BẠN SẼ THÍCH</h4>
            <Slider {...settings}>
                    {tips && tips.map(tipsroom=>(
                        <div key={tipsroom.id}> {/* Bao bọc mỗi phần tử bằng một container */}
                            <Link to = {`/roominfo/${tipsroom.id}`} className="text-hangphong">
                                <img src={tipsroom.images} alt={tipsroom.tenphong} width='100%' className="img-test" />
                                <p className="text-hangphongs"> Hạng Phòng {tipsroom.hangphong}</p>
                                <p className="text-hangphongs">{tipsroom.tenphong}</p>
                                <p className="price-text">Giá : {formatPrice(tipsroom.giatien)}</p>
                            </Link>
                        </div>
                    ))}
            </Slider>
        </div>
        
    </div>
    <Footer/>
    </>
  )
}


export default Roominfo
