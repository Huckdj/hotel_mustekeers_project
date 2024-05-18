import React, {useState} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    
    const [values, setValues] = useState({
        nameuser:'',
        email:'',
        password:'',
        samepassword:''
    })
    const navigate = useNavigate();
    
    const handleSubmit = (event) =>{
        if (values.nameuser === '' || values.email === '' || values.password === ''){
            alert("Không được bỏ trống")
        }else if(values.password !== values.samepassword ){
            alert("Mật khẩu không khớp")
        }else {
            event.preventDefault();
            axios.post('http://localhost:4000/register', values)
            .then(res=> {
                if(res.data.Status === "duplicate"){
                    alert("Email đã tồn tại")
                }
                if(res.data.Status === "Success"){
                    alert("Đăng Kí Thành Công")
                    navigate('/login')
                }
            })
            .then(err => console.log(err));
        }
    }
    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: "#fff", marginTop:"100px" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-6">
                    <div className="card rounded-3 text-black">
                    <div className="card-body p-md-5 mx-md-4">
                        <div className="text-center">
                        <img src={Logo} style={{ width: "185px" }} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">Chào Mừng Bạn Đến Với Musketeers Hotel</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <p className='row d-flex justify-content-center align-items-center h-100'>Đăng Kí Tài Khoản Musketeers Members</p>
                        <div className="form-outline mb-4">
                            <input type="text" id="form2Example11" className="form-control" placeholder="Vui Lòng nhập họ và tên" onChange={(e)=> setValues({...values, nameuser: e.target.value})} />
                            <label className="form-label" htmlFor="form2Example11">Họ và tên</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="email" id="form2Example11" className="form-control" placeholder="Vui lòng nhập email" onChange={(e)=> setValues({...values, email: e.target.value})} />
                            <label className="form-label" htmlFor="form2Example11">Email</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="text" id="form2Example22" className="form-control" onChange={(e)=> setValues({...values, password: e.target.value})}/>
                            <label className="form-label" htmlFor="form2Example22">Password</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="text" id="form2Example22" className="form-control" onChange={(e)=> setValues({...values, samepassword: e.target.value})}/>
                            <label className="form-label" htmlFor="form2Example22">Nhập Lại Password</label>
                        </div>
                        <div className="text-center mb-5">
                            <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Đăng Kí</button>
                        </div>
                        <div className="text-center mb-5">
                            <Link to='/login' className='text-register'> Bạn đã có tài khoản? Đăng nhập</Link>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition= {Slide}
            />
        </section>
)
}

export default Register