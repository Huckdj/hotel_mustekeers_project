/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import "../css/style.css"
import Logo from '../images/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronDown} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function Header(){
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('')
    const [iduser, setIduser] = useState('')
    axios.defaults.withCredentials = true;
    useEffect(()=> {
        axios.get('http://localhost:4000')
        .then(res => {
            if(res.data.Status === "Success"){
                setAuth(true)
                setName(res.data.name)
                setIduser(res.data.iduser)
            }else {
                setAuth(false)
            }
        })
    }, [])
    const handleDelete = () =>{
        axios.get('http://localhost:4000/logout')
        .then(res =>{
            window.location.reload(true);
        }).catch(err => console.log(err))
    }

    const[branch, setBranch] = useState();
    useEffect(() => {
        axios.get('http://localhost:4000/infobranch')
        .then(res => setBranch(res.data))
    })
    
    
    return(
        <div className="body-header">
            <div className="header-content">
                <div className="item-header-logo">
                    <Link to="/"><img src={Logo} width="200px"/></Link>
                </div>
                <div className="item-content-text">
                    <div className="item-text">
                        <Link to="/" className="item-text"><p>Trang Chủ</p></Link>
                    </div>
                    <div className="item-text">
                        <div className="dropdown">
                            <Link to="/" className="item-text"><p>Hệ Thống Khách Sạn <FontAwesomeIcon icon={faChevronDown}/> </p></Link>
                            <div className="dropdown-content">
                                {branch  && branch.map((branchdata) =>(
                                    <Link to={`/branchinfo/${branchdata.idbranch}`}><p>{branchdata.namebranch}</p></Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="item-text">
                        <Link to="/news" className="item-text"><p>Tin Tức</p></Link>
                    </div>
                        {
                            auth ? (
                                <div className="item-text-logout">
                                    <DropdownButton id="dropdown-basic-button" title={`Hi, ${name}`}>
                                        <Dropdown.Item className="useridasd"><Link to={`/infouser/${iduser}`} className="usertextlink">Thông Tin Chung</Link></Dropdown.Item>
                                        <Dropdown.Item onClick={handleDelete} variant="Warning" className="usertextlink">Đăng Xuất</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            ) : (
                                <div className="item-text">
                                    <Link to="/login" className="item-text"><p>Đăng Nhập</p></Link>
                                </div>
                            )
                        }   
                    
                </div>
            </div>
        </div>
    )
}
export default Header