/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React,{useState, useEffect} from "react";
import Header from './Header'
import Footer from './Footer'
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price);
}

function Branchinfo() {
    
    const { id } = useParams()
    const [branchroom,setBranchroom] = useState();
    const [branch,setBranch] = useState();
    useEffect(() => {
        axios.get(`http://localhost:4000/branchinfo/${id}`)
        .then (res => {
            setBranchroom(res.data.roomInfo)
            setBranch(res.data.branchInfo)
        }
        )
  },[]);
    
    return (
    <>
        <Header/>
        <div>
            {branch && branch.map((branch) =>(
            <div>
                <div className='firats'>{branch.namebranch}</div>
                <div class="container all-product">
                    <div class="row row-cols-3">
                        {branchroom && branchroom.map((branchroom) =>(
                            <div className="col set-bootom">
                                <Link to = {`/roominfo/${branchroom.id}`} className="text-product">
                                    <img src={branchroom.images} width='100%'/>
                                    <p className="text-hangphongs"> Hạng Phòng {branchroom.hangphong}</p>
                                    <p className="text-hangphongs">{branchroom.tenphong}</p>
                                    <p className="price-text">Giá : {formatPrice(branchroom.giatien)}</p>
                                    <p>{branch.namebranch}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            ))}
        </div>
        <Footer/>
    </>
  )
}

export default Branchinfo
