import React, {useState, useEffect} from 'react'
import Admin from './Admin.js'
import axios from 'axios';

function Editroom() {
    const [values, setValues] = useState({
        hangphong:'',
        giatien:'',
        images:'',
        loaigiuong:'',
        tenphong:'',
        giatienquadem:'',
        branch:'',
    })
    const handleSubmit = (event) =>{
        event.preventDefault();
        if(values.hangphong ==='' || values.chinhanh ==='') {
            alert("không thể bỏ trống")
        }else{
            axios.post('http://localhost:4000/newrooms', values)
                .then(res=> {
                    if(res.data.Status === "Success"){
                        alert("Thành Công")
                        window.location.reload(true)
                        console.log(values)
                    }else{
                        console.log(res.data.Error)
                    }
                })
                .catch(error => {
                    console.error("Đã xảy ra lỗi khi gửi yêu cầu:", error);
                    alert("Đã xảy ra lỗi khi gửi yêu cầu. Vui lòng thử lại sau.");
                    console.log(error);
                });
        }
    }

    const [showroom,setShowroom] = useState();
    useEffect(() => {
        axios.get(`http://localhost:4000/showfullroom`)
        .then (res => {
            setShowroom(res.data)
        }
        )
  },[]);


    const [branchinfoadmin, setBranchAdmin] = useState()
    useEffect(() => {
        axios.get('http://localhost:4000/infobranch')
        .then(res => setBranchAdmin(res.data))
    })

    function handleDelete(roomid){
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (isConfirmed) {
            axios.post(`http://localhost:4000/roomid/${roomid}`)
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

        <div className='news-item'>Chỉnh Sửa Phòng</div>
            <div className='rruans'>
                <form onSubmit={handleSubmit}>
                            <p className='row d-flex justify-content-center align-items-center h-100'>Thêm Phòng Mới</p>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example11">Hạng Phòng</label>
                                <select id="hangphong" className="form-control" onChange={(e)=> setValues({...values, hangphong: e.target.value})}>
                                    <option></option>
                                    <option value="STANDARD">STANDARD</option>
                                    <option value="VIP">VIP</option>
                                </select>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example11">Giá Tiền Hai Giờ Đầu</label>
                                <input type="text" id="form2Example11" className="form-control" onChange={(e)=> setValues({...values, giatien: e.target.value})} />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example22">Nhập Link ảnh (https://imgur.com/)</label>
                                <input type="text" id="form2Example22" className="form-control" onChange={(e)=> setValues({...values, images: e.target.value})}/>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example22">Loại Giường</label>
                                <input type="text" id="form2Example22" className="form-control" onChange={(e)=> setValues({...values, loaigiuong: e.target.value})}/>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example22">Tên Phòng</label>
                                <input type="text" id="form2Example22" className="form-control" onChange={(e)=> setValues({...values, tenphong: e.target.value})}/>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example22">Giá Tiền Qua Đêm</label>
                                <input type="text" id="form2Example22" className="form-control" onChange={(e)=> setValues({...values, giatienquadem: e.target.value})}/>
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form2Example22">Chọn chi nhánh</label>
                                <select id="chinhanh" className="form-control" onChange={(e)=> setValues({...values, branch: e.target.value})}>
                                    <option></option>
                                    {branchinfoadmin && branchinfoadmin.map(branchinput => (
                                        <option value={branchinput.idbranch} >{branchinput.namebranch}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="text-center mb-5">
                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Nhập mới</button>
                            </div>
                </form>
            </div>
            <div>
                <table className='adminbranchedit'>
                    <tr>
                        <th>ID</th>
                        <th>Hạng Phòng</th>
                        <th>Giá tiền</th>
                        <th>Images</th>
                        <th>Loại giường</th>
                        <th>Tên Phòng</th>
                        <th>Giá Qua Đêm</th>
                        <th>Chi Nhánh</th>
                    </tr>
                    
                        {showroom && showroom.map(showroom => (
                            <tr>
                                <td>{showroom.id}</td>
                                <td>{showroom.hangphong}</td>
                                <td>{showroom.giatien}</td>
                                <td>{showroom.images}</td>
                                <td>{showroom.loaigiuong}</td>
                                <td>{showroom.tenphong}</td>
                                <td>{showroom.giatienquadem}</td>
                                <td>{showroom.branchshow}</td>
                                <td><button onClick={() => handleDelete(showroom.id)} class="btn btn-danger" >Xóa</button></td>
                            </tr>
                        ))}
                </table>
            </div>
    </div>
  )
}

export default Editroom
