import React, {Fragment} from 'react';
// import Contact from './Folder/Contact'
import Details from './Folder/Details'
import
 { Card, CardBody, CardHeader, Button , Row, Col } from 'reactstrap'




const  Department = () => {
    
  return ( 
      <Fragment>
         <Card className='mt-2'>
            <CardHeader>
            </CardHeader>
            <CardBody>
            <Row>
              <Col md="5" sm="12">
                <h5>Department Management</h5>
             
              </Col>
              <Col md={{ size: 3, offset: 4 }} sm="12"> 
              <Button color="secondary" className='float-right'
              >Add Staff</Button>{' '}
              </Col>
              <Col md="12" sm="12" className='mt-2'>
              <Details/> 
              </Col>
            </Row>
            </CardBody>
          </Card>
      {/* <Contact
       number = '1'
       firstName = 'jude'
       lastName = 'benson'
       userName = 'figma10'
         />
      <Contact
       number = '2'
       firstName = 'micheal'
       lastName = 'bolu'
       userName = 'untomuch'
         /> */}
      </Fragment>  
  );
}

export default Department;