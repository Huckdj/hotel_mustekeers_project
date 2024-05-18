import React from "react"; 
import { Link } from "react-router-dom";

export default function Admin(){
    return(
        <div className="body-admin">
            <div className="header-admin">
                <div className="i-tem-admin">
                    <Link to='/newsadmin' className="item-link-admin"> Chỉnh Sửa Tin Tức </Link>
                </div>
                <div className="i-tem-admin">
                    <Link to='/editroom' className="item-link-admin"> Chỉnh Sửa Phòng </Link>
                </div>
                <div className="i-tem-admin">
                    <Link to='/editbranch' className="item-link-admin"> Thêm Sửa Chi Nhánh</Link>
                </div>
            </div>
        </div>
    )
}