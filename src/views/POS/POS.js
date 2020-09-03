import React, { Fragment, useState } from 'react'
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink} from "reactstrap";
import SalesWindow from './Components/SalesWindow';
import ReceivablesList from './Components/ReceivablesList';

const POS = () => {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    return (
        <Fragment>
            <Nav className="mt-2 mb-2" tabs>
                <NavItem>
                    <NavLink className={activeTab === '1'? 'active' : ''} onClick={() => {toggle('1'); }}>
                    Sales Point
                    </NavLink> 
                </NavItem>
                <NavItem>
                    <NavLink className={activeTab === '2'? 'active' : ''} onClick={() => {toggle('2'); }}>
                      Account  Receivables
                    </NavLink> 
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col md="12">
                            <SalesWindow />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col md="12">
                            <ReceivablesList />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </Fragment>
    )
}

export default POS
// Math.ceil(Math.random() * 10)