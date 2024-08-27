import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const data = localStorage.getItem('user-info');
        if (!data) {
            navigate('/login');
        } 
    }, [navigate]);
  return (
    <div>
      Homepage
    </div>
  )
}

export default Homepage;
