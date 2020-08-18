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
            
          <Navbar className="topbar" expand="md">
          <Container fluid={true}>
        <NavbarBrand href="/">Inventory APP</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {/* <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem> */}
             
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
          {/* <NavbarText>Beedy</NavbarText> */}
        </Collapse>
        </Container>
      </Navbar> 
        </Fragment>
    )
}
export default TopBar