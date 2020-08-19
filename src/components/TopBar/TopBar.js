import React, { Fragment, useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav, 
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
  Container
} from 'reactstrap';
import Utility from '../../services/UtilityService';

 const TopBar = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
    return (
        <Fragment>
            <div className="logo">Inventory</div>
                    <ul>
                        <li><i className="fa fa-search"></i></li>
                        <li><i className="fa fa-bell"></i></li> 
                         <li><i className="fa fa-user"></i></li>
                    </ul>
          {/* <Navbar className="topbar" expand="md">
          <Container fluid={true}>
        <NavbarBrand href="/">Inventory APP</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
           
             
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {Utility.get('name')}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Profile
                </DropdownItem> 
                <DropdownItem divider />
                <DropdownItem onClick={e => Utility.logout()}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          
        </Collapse>
        </Container>
      </Navbar>  */}
        </Fragment>
    )
}
export default TopBar