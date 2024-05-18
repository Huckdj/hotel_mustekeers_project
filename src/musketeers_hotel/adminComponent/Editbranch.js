import React, {useState, useEffect} from 'react'
import Admin from './Admin.js'
import axios from 'axios';

function NewsAdmin() {
    const [values, setValues] = useState({
        namebranch: '',
        address:'',
        phonenumber:'',
        emailbranch:''
    })
    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:4000/newbranch', values)
            .then(res=> {
                if(res.data.Status === "Success"){
                    alert("Thêm chi nhánh mới Thành Công")
                    window.location.reload(true);
                }else {
                    alert("Lỗi")
                }
        })
    }

    const [branchinfoadmin, setBranchAdmin] = useState()
    useEffect(() => {
        axios.get('http://localhost:4000/infobranch')
        .then(res => setBranchAdmin(res.data))
    })
    function handleDelete(branchId){
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (isConfirmed) {
            axios.post(`http://localhost:4000/branches/${branchId}`)
                .then(response => {
                    window.location.reload(true);
                    alert("Đã xóa chi nhánh thành công!");
                })
                .catch(error => {
                    alert("Lỗi khi xóa:", error);
                });
        }
    }
    
  return (
    <div>
        <Admin />

        <div className='news-item'>Thêm Sửa Chi Nhánh</div>
        <div className='form-input-branch'>
            <form onSubmit={handleSubmit}>
                        <p className='row d-flex justify-content-center align-items-center h-100'>Thêm Chi Nhánh Mới</p>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example11">TÊN CHI NHÁNH</label>
                            <input type="text" id="form2Example11" className="form-control" placeholder="Nhập tên chi nhánh" onChange={(e)=> setValues({...values, namebranch: e.target.value})} />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example11">Địa Chỉ</label>
                            <input type="text" id="form2Example11" className="form-control" placeholder="Nhập địa chỉ" onChange={(e)=> setValues({...values, address: e.target.value})} />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example22">Nhập số hotline</label>
                            <input type="text" id="form2Example22" className="form-control" placeholder="Nhập số hotline" onChange={(e)=> setValues({...values, phonenumber: e.target.value})}/>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form2Example22">Nhập Email</label>
                            <input type="email" id="form2Example22" className="form-control" placeholder="Email" onChange={(e)=> setValues({...values, emailbranch: e.target.value})}/>
                        </div>
                        <div className="text-center mb-5">
                            <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Nhập mới</button>
                        </div>
            </form>
        </div>
        <table className='adminbranchedit'>
            <tr>
                <th>ID</th>
                <th>Tên Chi Nhánh</th>
                <th>Địa Chỉ</th>
                <th>Số Điện Thoại</th>
                <th>Email</th>
            </tr>
            {branchinfoadmin && branchinfoadmin.map(branch => (
                <tr>
                    <td>{branch.idbranch}</td>
                    <td>{branch.namebranch}</td>
                    <td>{branch.address}</td>
                    <td>{branch.phonenumber}</td>
                    <td>{branch.emailbranch}</td>
                    <td><button onClick={() => handleDelete(branch.idbranch)} class="btn btn-danger" >Xóa</button></td>
                </tr>
            ))}
        </table>
    </div>
  )
}

export default NewsAdmin
