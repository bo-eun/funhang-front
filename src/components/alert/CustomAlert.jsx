import React from 'react';
import Swal from 'sweetalert2';
import './customAlert.css';

const CustomAlert = ({
  title = '',
  text = '',
  width = '450px',               // 반드시 문자열 단위(px, %, em)
  padding = '2em',
  color = '#000000',
  background = '#ffffff',
  showCancelButton= false,
  confirmButtonText = '확인',
  cancelButtonText = '취소',
  backdrop = 'rgba(0,0,0,0.5)',
  customClass = {}               // 클래스 직접 적용
}) => {
return Swal.fire({
    title,
    text,
    width,
    padding,
    color,
    background,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    backdrop,
    customClass:{
        title: 'my-title',
        htmlContainer: 'my-content',
        confirmButton: 'my-btn',
        cancelButton:'my-btn-cancel'

    }
  }).then((result) => result.isConfirmed);
  
};

export default CustomAlert;