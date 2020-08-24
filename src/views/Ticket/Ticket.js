import React, { useContext, useState, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react';
import { Card, CardBody, CardHeader, Button, Row, Col, Collapse } from 'reactstrap' 
import TicketStore from '../../stores/TicketStore';
import TicketHome from './Components/TicketHome';
import TicketList from './Components/TicketList';

const Ticket = () => { 
  const tickStore = useContext(TicketStore);
  const { info:tickets, removeTicket, toggleClose} = tickStore;
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('Closed');
  const toggle = () => setCollapse(!collapse);
  // const [mode, setMode] = useState('');
  // const [rowData, setRowData] = useState(); 
  // const [modal, setModal] = useState(false);   
  // const handleClose = () => {
  //   setModal(!modal);  
  //   toggleClose()
  // }
  // const createTicket = () => {
  //   setModal(true); 
  //   setMode('Add'); 
  // }  
    return( 
      <Fragment>
        <Row>
          <Col md="3">
            <Card>
              <CardBody>
              <div>
                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Your Recent Tickets</Button>
                <h5>Current state: {status}</h5>
                <Collapse
                  isOpen={collapse} 
                >
                  <Card>
                    <CardBody>
                     #id title 
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="9">
            <Switch>
              <Route exact path="/" component={TicketHome} />
              <Route exact path="/list" component={TicketList} />
            </Switch>
          </Col>
        </Row>
      {/* <Card className='mt-2'>
         <CardHeader>
         </CardHeader>
         <CardBody>
         <Row>
           <Col md="5" sm="12">
             <h5>Ticket Management</h5> 
           </Col>
           <Col md={{ size: 3, offset: 4 }} sm="12"> 
           <Button color="secondary" className='float-right' onClick={createTicket}
           >Add Ticket</Button>{' '}
           </Col>
           <Col md="12" sm="12" className='mt-2'>
             <TicketList  data={tickets} setMode={setMode} toggle={handleClose} removeData={removeTicket} rowData={setRowData} /> 
           </Col>
         </Row>
         <AddTicket mode={mode} open={modal} handleClose={handleClose} initial_data={rowData} /> 

      

         </CardBody>
       </Card>
    */}
   </Fragment>  

    )
}

export default observer(Ticket);