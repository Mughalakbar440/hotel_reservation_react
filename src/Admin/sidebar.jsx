import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ style, changeStyle }) => {
    const navigate = useNavigate();

    const handleAdminDataClick = () => {
        navigate('/adminData');
    };
    const handleHotelClick = () => {
        navigate('/hotelData');
    }
    // const handleAddAdminClick = () => {
    //     navigate('/addAdmin');
    // };

    return (
        <ul className={style} id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item active">
                <a className="nav-link" href="index.html">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">Interface</div>

            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-cog"></i>
                    <span>Components</span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Custom Components:</h6>
                        <a className="collapse-item" href="buttons.html">Buttons</a>
                        <a className="collapse-item" href="cards.html">Cards</a>
                    </div>
                </div>
            </li>

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">Addons</div>

            <li className="nav-item">
                <a className="nav-link" 
                // onClick={handleAddAdminClick} for the check
                >
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>User Data</span>
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link" onClick={handleAdminDataClick}>
                    <i className="fas fa-fw fa-table"></i>
                    <span>Admin Data</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={handleHotelClick}>
                    <i className="fas fa-fw fa-table"></i>
                    <span>Hotel Data</span>
                </a>
            </li>
            
            <hr className="sidebar-divider d-none d-md-block" />

            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
            </div>

            <div className="sidebar-card d-none d-lg-flex">
                <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
                <p className="text-center mb-2">
                    <strong>SB Admin Pro</strong> is packed with premium features, components, and more!
                </p>
                <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
            </div>
        </ul>
    );
};

export default Sidebar;
