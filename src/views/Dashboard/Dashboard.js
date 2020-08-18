import React, { Fragment } from 'react'; 
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap'; 
 

const Dashboard = () => { 

  return (
    <Fragment>
      {/* <Container> */}
      <Card className='mt-2'>
            <CardHeader>
              Dashboard
            </CardHeader>
            <CardBody>
          
        <Row>
        <Col md="3" sm="6" xs="12">
          <Card>
             <CardHeader> Total Branch</CardHeader>
             <CardBody>15</CardBody>
           </Card>
          </Col>
          <Col md="3" sm="6" xs="12">
           <Card>
             <CardHeader> Total Assets</CardHeader>
             <CardBody>32</CardBody>
           </Card>
          </Col>
          <Col md="3" sm="6" xs="12">
          <Card>
             <CardHeader> Total Products</CardHeader>
             <CardBody>15</CardBody>
           </Card>
          </Col>
          <Col md="3" sm="6" xs="12">
          <Card>
             <CardHeader> Total User</CardHeader>
             <CardBody>15</CardBody>
           </Card>
          </Col>
        </Row>
     

            </CardBody>
          </Card>
       {/* </Container> */}
    </Fragment>
    
  );
};

export default Dashboard;
