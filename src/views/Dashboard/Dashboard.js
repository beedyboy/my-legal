import React, { Fragment } from 'react'; 
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
 
 

const Dashboard = () => { 

  return (
    <Fragment>
      <Container>
        <Row>
          <Col md="3" sm="6" xs="12">
           <Card>
             <CardHeader> Total Assets</CardHeader>
             <CardBody>32</CardBody>
           </Card>
          </Col>
          <Col md="3" sm="6" xs="12">
          <Card>
             <CardHeader> Total User</CardHeader>
             <CardBody>15</CardBody>
           </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
    
  );
};

export default Dashboard;
