import React, { Fragment } from 'react'
import { Link } from "react-router-dom"; 

const RSidebar = () => {
    return (
        <Fragment>
            <div className="sidebar">
                <ul>
                    <li><Link to="/dashboard">
                        <span className="icon">
                            <i className="fa fa-dashboard" aria-hidden="true"></i>
                        </span>
                        <span className="title">Dashboard</span>
                        </Link></li>

                    <li><Link to="/branch">
                    <span className="icon">
                        <i className="fa fa-dashboard" aria-hidden="true"></i>
                        </span>
                    <span className="title">Branch</span>
                    </Link></li>

                    <li><Link to="/category">
                    <span className="icon">
                    <i className="fa fa-dashboard" aria-hidden="true"></i>
                    </span>
                    <span className="title">Category</span>
                    </Link></li>

                    <li><Link to="/department">
                    <span className="icon">
                    <i className="fa fa-dashboard" aria-hidden="true"></i>
                    </span>
                    <span className="title">Department</span>
                    </Link></li>
                </ul>
            </div>
        </Fragment>
    )
}

export default RSidebar
