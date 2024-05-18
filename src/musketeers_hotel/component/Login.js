import React, {useState} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    
    const [values, setValues] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) =>{
        event.preventDefault();
        if (values.email === '' || values.password === ''){
            alert("Không thể bỏ trống")
        }else{
        axios.post('http://localhost:4000/login', values)
        .then(res=> {
            if(res.data.Status ==="Admin"){
                navigate('/admin')
            }
            if(res.data.Status === "Success"){
                navigate('/')
            }
            else(
                alert(res.data.Error)
            )
            console.log(res)
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
                        <h4 className="mt-1 mb-5 pb-1">Chào Mừng Trở Lại Musketeers Hotel</h4>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <p className='row d-flex justify-content-center align-items-center h-100'>Đăng Nhập Tài Khoản Musketeers Members</p>
                        <div className="form-outline mb-4">
                            <input type="email" id="form2Example11" className="form-control" placeholder="Email" onChange={(e)=> setValues({...values, email: e.target.value})} />
                            <label className="form-label" htmlFor="form2Example11">Email</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="text" id="form2Example22" placeholder="Mật khẩu" className="form-control" onChange={(e)=> setValues({...values, password: e.target.value})}/>
                            <label className="form-label" htmlFor="form2Example22">Password</label>
                        </div>
                        <div className="text-center mb-5">
                            <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Đăng Nhập</button>
                        </div>
                        <div className="text-center mb-5">
                            <Link to='/register' className='text-register'> Bạn chưa có tài khoản? Đăng kí</Link>
                        </div>

                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
)
}

export default Login