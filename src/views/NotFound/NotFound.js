import React from 'react'; 
import { Container, Row, Col } from 'reactstrap';
import './style.css';
const NotFound = () => { 

  return (
    <Container fluid className="root">
      <Row className="justify-center">
        <Col lg="6" xs="12">
        <div className="content">
            <h6  className="mb-0 mr-4 mt-2">
              404: The page you are looking for isn’t here
            </h6>
            <h6  className="mb-0 mr-4 mt-2">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </h6>
            <img
              alt="Under development"
              className="image"
              src="/images/undraw_page_not_found_su7k.svg"
            />
          </div>
        </Col>
      </Row>
    </Container>
    
  );
};

export default NotFound;

 