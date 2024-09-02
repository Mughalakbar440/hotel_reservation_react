import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Admin/Dashbord'; // Updated name to match your import
import Login from './Admin/login';
import AdminData from './Admin/AdminData';
import AddAdmin from './Admin/addAdmin';
import Homepage from './Admin/homepage';
import Logout from './Admin/logout';
import UpdateAdmin from './Admin/updateAdmin';
import HotelData from './Admin/hotelData';
import AddRooms from './Admin/addRooms';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />}>
                    {/* Default route for dashboard redirects to homepage */}
                    <Route index element={<Navigate to="/homepage" />} />
                    {/* Nested routes under Dashboard */}
                    <Route path="homepage" element={<Homepage />} />
                    <Route path="addAdmin" element={<AddAdmin />} />
                    <Route path="addRooms" element={<AddRooms />} />
                    <Route path="hotelData" element={<HotelData />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="updateAdmin/:id" element={<UpdateAdmin />} />
                    <Route path="adminData" element={<AdminData />} />
                </Route>
                {/* Catch-all route to redirect any undefined routes to the main page */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
        
    );
}

export default App;
