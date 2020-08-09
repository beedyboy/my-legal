import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';


const MainLayout = props => {
    const { children } = props;
console.log(props)
    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Col xs={2} lg="2" id="sidebar-wrapper">
                        <Sidebar />
                    </Col>
                    <Col xs={10} lg="10" id="page-content-wrapper" className="p-0 m-0" style={{background: 'red', width: '100%'}}>
                        <TopBar />
                        <Row>
                        
                            <Col md="12">
                                Hello
                            <main>{children}</main>
                            </Col>
                        </Row>
                       
                     
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}



export default MainLayout
