import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Header from './Header';
import Footer from './Footer';


function news() {
  return (
    <div>
        <Header/>
        <div className="news">
            <h2 className="tintuc">TIN TỨC</h2>
            <ul class="list-group">
                <li class="list-group-item"><Link to='/new1' className='name-news'><p>Du lịch Đà Nẵng : 10 điểm du lịch tham quan hấp dẫn nhất</p></Link></li>
                <li class="list-group-item"><Link to='/new2' className='name-news'><p>Du lịch Đà Nẵng : 10 điểm du lịch tham quan hấp dẫn nhất</p></Link></li>
                <li class="list-group-item"><Link to='/new3' className='name-news'><p>Du lịch Đà Nẵng : 10 điểm du lịch tham quan hấp dẫn nhất</p></Link></li>
            </ul>
        </div> 
        <Footer />
    </div>
  )
}

export default news
