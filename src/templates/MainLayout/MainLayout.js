import React, { Fragment, useState } from 'react';
import { Container, Row, Col } from 'reactstrap'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import TopBar from '../../components/TopBar/TopBar';
import './styles.css'; 
 
const MainLayout = props => {
    const { children } = props; 
    const [collapse, setCollapse] = useState(true)
    const handleHamburger = () => {
        setCollapse(!collapse)
    }
    return (
        <Fragment>
             <div className={`wrapper ${collapse ? 'collapse_sidebar' : ''}`}>
                <div className="top_navbar">
                    <div className="hamburger" onClick={(e) => handleHamburger()}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="top_menu">
                        <TopBar />
                    </div>
                </div>

                <div className="sidebar"> <Sidebar /> </div>

<div className="main_container">
    <Container fluid={true}>
        <Row> 
            <Col md="12"> 
                <main>{children}</main>
            </Col>
        </Row>   
    </Container>
</div>
            </div>
            
        </Fragment>
    )
}



export default MainLayout
