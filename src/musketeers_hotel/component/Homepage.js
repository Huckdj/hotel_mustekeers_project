/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect} from "react";
import Header from "./Header.js";
import axios from "axios"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight, faQuoteLeft, faQuoteRight} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import '../css/style.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Footer.js";

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price);
}

function Homepage() {
    const [room,setRoom] =useState();
    useEffect(() => {
        const fectchAllWatch =  async () =>{
            try{
                const res = await axios.get("http://localhost:4000/roominfo")
                setRoom(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fectchAllWatch()
      },[]);


    const [news,setNews] =useState();

    useEffect(() => {
        const fectchAllWatch =  async () =>{
            try{
                const res = await axios.get("http://localhost:4000/getnewshome")
                setNews(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fectchAllWatch()
      },[]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:true
    };
    var nhanxetkhachhang = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    return(
        <div className="body-homepage">
            <Header/>
            <div className="item-first">
                <p>GỢI Ý PHÒNG KHÁCH SẠN</p>
                <Link to='/productfull' className="link-room-full">Xem tất cả các phòng <FontAwesomeIcon icon={faChevronRight}/></Link>
            </div>
            <div className="intro-room">
                <Slider {...settings}>    
                        {room && room.map((room) => (
                            <div className="img-intro">
                               <Link to = {`/roominfo/${room.id}`} className="text-hangphong">
                                    <img src={room.images} />
                                    <p className="text-hangphongs"> Hạng Phòng {room.hangphong} - {room.tenphong}</p>
                                    <p className="price-text">Giá : {formatPrice(room.giatien)}</p>
                                </Link>
                            </div>
                        ))}
                </Slider>
            </div>
            <div className="nhanxet">
                <div className="the-first">
                    <h2>VÀI ĐIỀU VỀ MUSKETEERS HOTEL</h2>
                    <p>Nâng tầm trải nghiệm</p>
                </div>
                <div className="tnxet">  <FontAwesomeIcon icon={faQuoteLeft}/> Được xây dựng và đưa vào hoạt động đầu năm 2018, với hệ thống phòng ốc sang trọng mới mẻ, hiện đại và tiện nghi cùng với đội ngũ nhân viên chuyên nghiệp sẵn sàng phục vụ cho quý khách 24/7. Hệ Thống Khách Sạn Tình Yêu Galaxy giúp các cặp đôi có những phút giây tuyệt vời nhất  <FontAwesomeIcon icon={faQuoteRight}/></div>
            </div>
            <div>
                <div className="news">
                    <h2 className="tintuc">TIN TỨC</h2>
                    <ul class="list-group">
                        {news && news.map((news) => (
                            <li class="list-group-item"><Link to={`/newsdetail/${news.id}`} className='name-news'><p>{news.tuade}</p></Link></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="nhanxetkhachhang">
                <h2 className="text0asd">Nhận Xét Của Khách Hàng</h2>
                <Slider {...nhanxetkhachhang}>
                    <div className="abchsd"> 
                        <p className="nahsdj">Mới ở lần thứ hai thôi nhưng mọi thứ và dịch vụ tại Galaxy mình rất hài lòng. 
Phòng rất đẹp, sạch sẽ, hương thơm sang trọng khi vừa vào phòng, tiện ích đẩy đủ.
Nhân viên chuyên nghiệp từ thái độ đến kỹ năng. Rất Hài Lòng với trải nghiệm này</p>
                    </div>
                    <div className="abchsd">
                    <p className="nahsdj">Mình cũng có ở nhiều khách sạn tại Gò Vấp nhưng ở MUSKETEERS mình thấy sự khác lạ là mỗi phòng ở đây đều được trang trí theo các chủ đề khác nhau và điều mình thích ở đây là hành lang của khách sạn được mở nhạc du dương 24/24 không khác gì các khách sạn và Resort cao cấp.</p>
                    </div>
                </Slider>
            </div>
            <Footer />
        </div>
    )
}
export default Homepage 