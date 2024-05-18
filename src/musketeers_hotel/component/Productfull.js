import React,{useState, useEffect} from "react";
import Header from './Header'
import Footer from './Footer'
import axios from "axios";
import { Link } from "react-router-dom";

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price);
}

function Productfull() {
    const [fullroom,setFullRoom] = useState();
    useEffect(() => {
        axios.get(`http://localhost:4000/productfull`)
        .then (res => {
            setFullRoom(res.data)
        }
        )
  },[]);
    
    return (
    <>
        <Header/>
        <div>
            <div className='firat'>TẤT CẢ CÁC PHÒNG CỦA MUSKETEERS HOTEL</div>
            <div class="container all-product">
                <div class="row row-cols-3">
                    {fullroom && fullroom.map((fullroom) =>(
                        <div className="col set-bootom">
                            <Link to = {`/roominfo/${fullroom.id}`} className="text-product">
                                <img src={fullroom.images} width='100%'/>
                                <p className="text-hangphongs"> Hạng Phòng {fullroom.hangphong}</p>
                                <p className="text-hangphongs">{fullroom.tenphong}</p>
                                <p className="price-text">Giá : {formatPrice(fullroom.giatien)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        
        </div>
        <Footer/>
    </>
  )
}

export default Productfull
