import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password_hash: '',
    full_name: '',
    phone_number: '',
    role: '',
    createdAt: '',
  });

  const [alertMessage, setAlertMessage] = useState(''); // State for alert message
  const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility
  const [alertType, setAlertType] = useState(''); // State for alert type ('success' or 'error')
  const navigate =  useNavigate();

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    if (/^\d{0,10}$/.test(phone)) {
      setFormData({
        ...formData,
        phone_number: phone,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost/Hotel_reservation/Api_controller/register', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();

      console.log('Response:', data);

      if (data.status === 'error') {
        setAlertMessage(data.message); // Set the error message from the response
        setAlertType('error'); // Set the alert type to 'error'
      } else {
        console.log('Success:', data);
        setAlertMessage('User added successfully!'); // Show success message
        setAlertType('success'); // Set the alert type to 'success'
      setTimeout(() => {
        navigate('/adminData');
      }, 3000);
        
      }

      setAlertVisible(true); // Show the alert message
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page to show the message

      // Hide alert after 3 seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An unexpected error occurred.'); // Generic error message
      setAlertType('error'); // Set the alert type to 'error'
      setAlertVisible(true); // Show the alert message

      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page to show the message

      // Hide alert after 3 seconds
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    }
  };
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Insert User Record</h2>
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
            value={formData.username || ''}
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
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password_hash"
            name="password_hash"
            value={formData.password_hash || ''}
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
            value={formData.full_name || ''}
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
            value={formData.phone_number || ''}
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
            value={formData.role || ''}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddAdmin;
