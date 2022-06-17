import React from 'react';
import {useNavigate} from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <div>존재하지 않는 페이지 입니다</div>
      <button className='mainLink' onClick={()=>{navigate('/')}} >메인으로</button>
    </>
  )
}

export default ErrorPage