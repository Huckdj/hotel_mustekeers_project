import React, {useState, useEffect} from 'react'
import Admin from './Admin.js'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

function NewsAdmin() {
    const [values, setValues] = useState({
        tude: '',
        noidung:'',
    })
    const handleSavecontent = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:4000/contentnews', values)
            .then(res=> {
                if(res.data.Status === "Success"){
                    alert("Thêm bài viết thành công Thành Công")
                    window.location.reload(true);
                }
        })
    }
  return (
    <div>
        <Admin />

        <div className='news-item'>THÊM TIN TỨC</div>
        <form>
            <label className="form-label" htmlFor="form2Example11">Nhập tựa đề bài viết</label>
            <input type="text" id="form2Example11" className="form-control" placeholder="Tựa Đề bài viết" onChange={(e)=> setValues({...values, tuade: e.target.value})} />
            <CKEditor
                        editor={ ClassicEditor }
                        data=""
                        onReady={ editor => {
                                console.log( 'Editor is ready to use!', editor );
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setValues({...values, noidung: data});
                            } }
                            onBlur={ ( event, editor ) => {
                                console.log( 'Blur.', editor );
                            } }
                            onFocus={ ( event, editor ) => {
                                console.log( 'Focus.', editor );
                            } }
                />
                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit" onClick={handleSavecontent}>Lưu</button>
        </form>
    </div>
  )
}

export default NewsAdmin
