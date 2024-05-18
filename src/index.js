import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './musketeers_hotel/component/Main.js';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from '../src/musketeers_hotel/component/Login.js'
import Register from './musketeers_hotel/component/Register.jsx';
import News from '../src/musketeers_hotel/component/News.js'
import NewsAdmin from './musketeers_hotel/adminComponent/NewsAdmin.jsx';
import Admin from '../src/musketeers_hotel/adminComponent/Admin.js'
import NewsDetail from './musketeers_hotel/component/NewsDetail.js';
import Roominfo from './musketeers_hotel/component/Roominfo.js';
import Productfull from './musketeers_hotel/component/Productfull.js';
import Branchinfo from './musketeers_hotel/component/Branchinfo.js';
import Editroom from './musketeers_hotel/adminComponent/Editroom.js';
import Editbranch from './musketeers_hotel/adminComponent/Editbranch.js';
import Infouser from './musketeers_hotel/component/Infouser.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
    <Routes>
        <Route path='/' element= {<Main />}/>
        <Route path='/homepage' element={<Main/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='news' element={<News/>}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/newsadmin' element={<NewsAdmin />}/>
        <Route path="/newsdetail/:id" element={<NewsDetail />} />
        <Route path='/roominfo/:id' element={<Roominfo/>}/>
        <Route path='/productfull' element={<Productfull/>}/>
        <Route path='/branchinfo/:id' element={<Branchinfo/>}/>
        <Route path='/editroom' element={<Editroom/>}/>
        <Route path='/editbranch' element={<Editbranch/>}/>
        <Route path='/infouser/:id' element={<Infouser/>}/>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
