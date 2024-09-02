import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const HotelData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost/Hotel_reservation/Api_controller/rooms_data')
            .then(response => {
                setData(response.data.user_data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);
    console.log(data);

    useEffect(() => {
        // Initialize DataTables
        if (data.length) {
            $('#dataTable').DataTable();
        }
    }, [data]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const handelRoomsButton = () => {
        navigate('/addRooms');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            axios.post(`http://localhost/Hotel_reservation/Api_controller/DeleteRooms/${id}`)
                .then(response => {
                    const data = response.data;

                    if (data.status === 'success') {
                        // Update the state to remove the deleted record from the UI
                        setData(prevData => prevData.filter(item => item.room_id !== id));
                        alert(data.message); // Display success message
                    } else {
                        // Handle errors returned from the API
                        alert(`Error: ${data.message}`); // Display error message from the API
                    }
                })
                .catch(error => {
                    console.error('Error deleting record:', error);
                    alert('An error occurred while deleting the record.'); // Fallback error message for unexpected issues
                });
        }
    };


    return (
        <div className="container-fluid">

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold text-primary">Rooms data</h6>
                        <button className="btn btn-primary" onClick={handelRoomsButton}>Add Rooms</button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Rooms image</th>
                                    <th>Room number</th>
                                    <th>Room type</th>
                                    <th>Created at</th>
                                    <th>Is Availabel</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>#</th>
                                    <th>Rooms image</th>
                                    <th>Room number</th>
                                    <th>Room type</th>
                                    <th>Created at</th>
                                    <th>Is Availabel</th>
                                    <th>Action</th>

                                </tr>
                            </tfoot>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.room_id}>
                                        <td>{index + 1}</td>
                                        <td><img src={`/uploads/${item.image}`} alt="image" height={40} width={70} /></td>
                                        <td>{item.room_number}</td>
                                        <td>{item.room_type}</td>

                                        <td>{moment(item.created_at).format('DD-MM-YYYY HH:mm:ss')}</td>
                                        <td>
                                            <span className={`badge ${item.is_available === '1' ? 'bg-success border border-success' : 'bg-danger border border-danger'}`}>
                                                {item.is_available === '1' ? 'Available' : 'Not Available'}
                                            </span>
                                        </td>


                                        <td>

                                            <div className="btn-group">
                                                <button className='btn btn-primary mr-2' onClick={() => navigate(`/updateAdmin/${item.id}`)}><i className='fa fa-edit'></i></button>
                                                <button className='btn btn-danger' onClick={() => handleDelete(item.id)} ><i className='fa fa-trash'></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotelData
