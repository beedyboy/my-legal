import React from 'react'
// import PropTypes from 'prop-types'
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom"; 
import brand from '../../assets/img/brand.png';
const Sidebar = props => {
    return (
        <>
            {/* <Nav className="col-md-12 d-none d-md-block bg-light sidebar"> */}
           
            <Nav vertical color="light"  expand="md"  id="sidebar-wrapper">
              {/* <div className="sidebar-sticky"></div> */}
              <img src={brand} className="sidelogo" alt="brand" />
                <NavItem>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link> 
                </NavItem>
                <span className="hr"></span>
                <NavItem> 
                    <Link to="/branch" className="nav-link">Branch</Link>
                </NavItem>
                <span className="hr"></span>
                <NavItem> 
                    <Link to="/category" className="nav-link">Category</Link>
                </NavItem>
                <span className="hr"></span>
                <NavItem> 
                    <Link to="/department" className="nav-link">Department</Link>
                </NavItem>
                <span className="hr"></span>
                <NavItem> 
                    <Link to="/staff" className="nav-link">Staff</Link>
                </NavItem> 
                <span className="hr"></span>
                <NavItem> 
                    <Link to="/product" className="nav-link">Product</Link>
                </NavItem>
                {/* <NavItem> 
                    <Link to="/sign-in" className="nav-link">Login</Link>
                </NavItem> */}
               
            </Nav>
        </>
    )
}

// Sidebar.propTypes = {

// }

export default Sidebar
