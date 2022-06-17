import React, { useState } from 'react'
import SearchInput from './SearchInput';
import NewsContent from './NewsContent';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <button className='clipLink' onClick={()=>{navigate('/clip')}} >클립목록</button><br/>
      <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
      <NewsContent inputValue={inputValue} />
    </>
  )
}

export default Main