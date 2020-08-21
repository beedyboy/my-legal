import React, { Fragment } from 'react'
import { Link } from "react-router-dom"; 

const RSidebar = () => {
    return (
        <Fragment> 
                <ul className="sidebar_menu">
                    <li><Link to="/dashboard">
                        <span className="icon">
                            <i className="fa fa-dashboard" aria-hidden="true"></i>
                        </span>
                        <span className="title">Dashboard</span>
                        </Link></li>

                    <li><Link to="/branch">
                    <span className="icon">
                        <i className="fa fa-industry" aria-hidden="true"></i>
                        </span>
                    <span className="title">Branch</span>
                    </Link></li>

                    <li><Link to="/category">
                    <span className="icon">
                    <i className="fa fa-tags" aria-hidden="true"></i>
                    </span>
                    <span className="title">Category</span>      
                    </Link></li>

                    <li><Link to="/department">
                    <span className="icon">
                    <i className="fa fa-sitemap" aria-hidden="true"></i>
                    </span>
                    <span className="title">Department</span>
                    </Link></li>

                    <li><Link to="/staff">
                    <span className="icon">
                    <i className="fa fa-group" aria-hidden="true"></i>
                    </span>
                    <span className="title">Staff</span>
                    </Link></li>


                    <li><Link to="/product">
                    <span className="icon">
                    <i className="fa fa-product-hunt" aria-hidden="true"></i>
                    </span>
                    <span className="title">Product</span>
                    </Link></li>
                </ul>
            
        </Fragment>
    )
}

export default RSidebar
