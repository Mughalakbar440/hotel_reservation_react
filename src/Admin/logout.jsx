import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Logout = () => {
const navigate = useNavigate();
useEffect(() => {
    localStorage.removeItem('user-info');
    setTimeout(() => {
        navigate('/login');
    }, 100);
}, [navigate])

   
  return (
    <>
    </>
  )
}

export default Logout
