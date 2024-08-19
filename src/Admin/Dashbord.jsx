
import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';
import Header from './header';
import Sidebar from './sidebar';

const data = localStorage.getItem('user-info');
const Dashbord = () => {
    const [style, setStyle] = useState('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion');
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const data = localStorage.getItem('user-info');
        if (!data) {
            navigate('/login'); // Redirect to login if not logged in
        } else {
            setUserData(JSON.parse(data));
        }
    }, [navigate]);

    const fullName = userData?.user_data?.username || 'Guest';

    const logoutBtn = () => {
        setUserData(null);
        localStorage.removeItem('user-info');
        setTimeout(() => {
            
            navigate('/');
        }, 100);

    }

    const changeStyle = () => {
        setStyle(prevStyle =>
            prevStyle.includes('toggled')
                ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
                : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled'
        );
    }

    return (
        <>
            <body id="page-top">

                <div id="wrapper">

                    <Sidebar style={style} changeStyle={changeStyle} navigate={navigate}/>
                    <div id="content-wrapper" className="d-flex flex-column">

                        <div id="content">
                          <Header fullName={fullName} style={style}/>
                            <div className="container-fluid">

                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                        className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                                </div>

                                <div className="row">

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                            Earnings (Monthly)</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-success shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                            Earnings (Annual)</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-info shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                                                        </div>
                                                        <div className="row no-gutters align-items-center">
                                                            <div className="col-auto">
                                                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="progress progress-sm mr-2">
                                                                    <div className="progress-bar bg-info" role="progressbar" aria-valuenow="50" aria-valuemin="0"
                                                                        aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-warning shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                            Pending Requests</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-comments fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                

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


                <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                                <a className="btn btn-primary" onClick={logoutBtn}>Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )
}

export default Dashbord