import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRooms = () => {
  const [formData, setFormData] = useState({
    room_number: '',
    room_type: '',
    price_per_night: '',
    is_available: '1', // default to available
    image: null, // to handle file upload
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0], // handle file upload
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost/Hotel_reservation/Api_controller/add_room', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await response.json();

      console.log('Response:', data);

      if (data.status === 'error') {
        setAlertMessage(data.message);
        setAlertType('error');
      } else {
        console.log('Success:', data);
        setAlertMessage('Room added successfully!');
        setAlertType('success');
        setTimeout(() => {
          navigate('/hotelData');
        }, 3000);
      }

      setAlertVisible(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An unexpected error occurred.');
      setAlertType('error');
      setAlertVisible(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-4">Add Room</h2>
        {alertVisible && (
          <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-danger'} fade-in-out`}>
            {alertMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="room_number" className="form-label">Room Number</label>
            <input
              type="number"
              className="form-control"
              id="room_number"
              name="room_number"
              value={formData.room_number || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="room_type" className="form-label">Room Type</label>
            <input
              type="text"
              className="form-control"
              id="room_type"
              name="room_type"
              value={formData.room_type || ''}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price_per_night" className="form-label">Price Per Night</label>
            <input
              type="number"
              className="form-control"
              id="price_per_night"
              name="price_per_night"
              value={formData.price_per_night || ''}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="is_available" className="form-label">Is Available</label>
            <select
              className="form-select"
              id="is_available"
              name="is_available"
              value={formData.is_available}
              onChange={handleChange}
              required
            >
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">Room Image</label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  );
};

export default AddRooms;
