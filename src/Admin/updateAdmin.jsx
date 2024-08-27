import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateAdmin = () => {
  const { id } = useParams(); // Extract ID from URL parameters
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password_hash: '',
    full_name: '',
    phone_number: '',
    role: ''
  });

  const [alertMessage, setAlertMessage] = useState(''); // State for alert message
  const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility
  const [alertType, setAlertType] = useState(''); // State for alert type ('success' or 'error')

  useEffect(() => {
    axios.get(`http://localhost/Hotel_reservation/Api_controller/singleAdmin/${id}`)
      .then(response => {
        const fetchedData = response.data.user_data[0]; // Accessing the first object of the response array
        if (fetchedData) {
          setFormData({
            username: fetchedData.username,
            email: fetchedData.email,
            password_hash: fetchedData.password_hash,
            full_name: fetchedData.full_name,
            phone_number: fetchedData.phone_number,
            role: fetchedData.role
          });
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle phone number change
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) { // Ensure input is a number and up to 10 digits
      setFormData({
        ...formData,
        phone_number: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password_hash', formData.password_hash);
    formDataToSend.append('full_name', formData.full_name);
    formDataToSend.append('phone_number', formData.phone_number);
    formDataToSend.append('role', formData.role);

    // Log FormData to console
    for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    axios.post(`http://localhost/Hotel_reservation/Api_controller/updateAdmin/${id}`, formDataToSend, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  })
  .then(response => {
      if (response.data.status === 'error') {
          setAlertMessage(response.data.message);
          setAlertType('error');
      } else {
          setAlertMessage('Admin updated successfully!');
          setAlertType('success');
          setTimeout(() => {
              navigate('/adminData');
          }, 3000);
      }
      setAlertVisible(true);
  })
  .catch(error => {
      setAlertMessage('Failed to update admin');
      setAlertType('error');
      console.error('API Error:', error);
      setAlertVisible(true);
  });
  
  

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        setAlertVisible(false);
    }, 3000);
};




  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Update Admin Record</h2>
      {alertVisible && (
        <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-danger'} fade-in-out`}>
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password_hash" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password_hash"
            name="password_hash"
            value={formData.password_hash}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handlePhoneChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Guest">Guest</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateAdmin;
