import React from 'react'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Footer() {
  return (
    <div className='footer-body'>
        <div className='text-ft-1'>
            Đặt Phòng Ngay!
        </div>
        <div className='text-ft-2'>
            <div className='text-item-1'>
                <h3>Chi Nhánh 1</h3>
                    <FontAwesomeIcon icon={faLocationDot}/><p>594-596 Nguyễn Oanh, P6, Q. Gò Vấp</p>
                    <FontAwesomeIcon icon={faPhone}/><p>028 225 39011</p>
            </div>
            <div className='text-item-1'>
                <h3>Chi Nhánh 2</h3>
                <FontAwesomeIcon icon={faLocationDot}/><p>31 Đường số 7, P17, Q. Gò Vấp</p>
                <FontAwesomeIcon icon={faPhone}/><p>028 6686 9011</p>
            </div>
        </div>
        <div className='last-text-footer'>
            HOTLINE: 0918011011- 0706797328- 0903352448
        </div>
    </div>
  )
}

export default Footer
