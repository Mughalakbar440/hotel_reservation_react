import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';

const Dashboard = () => {
    const [style, setStyle] = useState('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion');
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const [url, setUrl] = useState('');

    const pathname = location.pathname;

    useEffect(() => {
        switch (true) {
            case pathname === '/homepage':
                setUrl('Dashboard');
                break;
            case pathname === '/adminData':
                setUrl('Admin Data');
                break;
            case pathname === '/addAdmin':
                setUrl('Add Data');
                break;
            case pathname.startsWith('/updateAdmin'):
                setUrl('Update Admin');
                break;
            default:
                setUrl('Admin Side');
                break;
        }
    }, [pathname]);

    useEffect(() => {
        document.title = url;
    }, [url]);

    useEffect(() => {
        const data = localStorage.getItem('user-info');
        if (!data) {
            navigate('/login');
        } else {
            setUserData(JSON.parse(data));
        }
    }, [navigate]);

    const fullName = userData?.user_data?.username || 'Guest';

    const logoutBtn = () => {
        setUserData(null);
        setTimeout(() => {
            navigate('/logout');
        }, 100);
    };

    const changeStyle = () => {
        setStyle(prevStyle =>
            prevStyle.includes('toggled')
                ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
                : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled'
        );
    };

    

    return (
        <>
            <div id="page-top">
                <div id="wrapper">
                    <Sidebar style={style} changeStyle={changeStyle} navigate={navigate} />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Header fullName={fullName} style={style} />
                            <div className="container-fluid">
                                <Outlet /> {/* This is where child routes will be rendered */}
                            </div>
                        </div>

                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright &copy; Your Website 2021</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>

                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
                <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                {/* Changed to a button element */}
                                <button className="btn btn-primary" onClick={logoutBtn}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
