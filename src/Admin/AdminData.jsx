import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import $ from 'jquery';
import 'datatables.net';
import './style.css';
import { useNavigate } from 'react-router-dom';

const AdminData = ({tablename}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost/Hotel_reservation/Api_controller/AdminData')
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
    const handelAdminButton = () => {
        navigate('/addAdmin');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            axios.post(`http://localhost/Hotel_reservation/Api_controller/DeleteAdmin/${id}`)
                .then(response => {
                    const data = response.data;
    
                    if (data.status === 'success') {
                        // Update the state to remove the deleted record from the UI
                        setData(prevData => prevData.filter(item => item.id !== id));
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
            <h1 className="h3 mb-2 text-gray-800">Tables</h1>
            <p className="mb-4">
                DataTables is a third-party plugin used to generate the demo table below.
                For more information about DataTables, visit the <a target="_blank" href="https://datatables.net">official DataTables documentation</a>.
            </p>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold text-primary">{tablename}</h6>
                        <button className="btn btn-primary" onClick={handelAdminButton}>Add Admin</button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Full Name</th>
                                    <th>Phone number</th>
                                    <th>Role</th>
                                    <th>Created at</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Full Name</th>
                                    <th>Phone number</th>
                                    <th>Role</th>
                                    <th>Created at</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {data.map((item,index) => (
                                    <tr key={item.id}>
                                        <td>{index+1}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.full_name}</td>
                                        <td>{item.phone_number}</td>
                                        <td>{item.role}</td>
                                        <td>{moment(item.created_at).format('DD-MM-YYYY HH:mm:ss')}</td>
                                        <td>
                                        <div className="btn-group">
                                            <button className='btn btn-primary mr-2' onClick={()=> navigate(`/updateAdmin/${item.id}`)}><i className='fa fa-edit'></i></button>
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
};

export default AdminData;
