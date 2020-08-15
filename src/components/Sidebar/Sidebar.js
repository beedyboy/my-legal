import React from 'react'
// import PropTypes from 'prop-types'
import { Nav, NavItem, NavLink } from "reactstrap";

const Sidebar = props => {
    return (
        <>
            {/* <Nav className="col-md-12 d-none d-md-block bg-light sidebar"> */}
           
            <Nav vertical color="light" light expand="md" className="sidebar">
             <p>Menu</p>
               <div className="sidebar-sticky"></div>
                <NavItem>
                    <NavLink href="/dashboard">Dashboard</NavLink> 
                </NavItem>

                <NavItem> 
                    <NavLink href="/category">Category</NavLink>
                </NavItem>

                <NavItem> 
                    <NavLink href="/department">Department</NavLink>
                </NavItem>
     
                <NavItem> 
                    <NavLink href="/sign-in">Login</NavLink>
                </NavItem>
               
            </Nav>
        </>
    )
}

// Sidebar.propTypes = {

// }

export default Sidebar
