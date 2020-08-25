import React, { useContext, useState, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { observer } from 'mobx-react';
import { Card, CardBody, CardHeader, Button, Row, Col, Collapse } from 'reactstrap' 
import TicketStore from '../../stores/TicketStore';
import TicketHome from './Components/TicketHome';
import TicketList from './Components/TicketList';
import CreateTicket from './Components/CreateTicket';
import TicketSummary from './Components/TicketSummary';
import TicketDetails from './Components/TicketDetails';

const Ticket = () => { 
  const tickStore = useContext(TicketStore);
  const { info:tickets, removeTicket, toggleClose} = tickStore;
  const [collapse, setCollapse] = useState(false);
  const [status, setStatus] = useState('Closed');
  const toggle = () => setCollapse(!collapse);
    return( 
      <Fragment>
        <Row>
          <Col md="3">
            <Card>
              <CardBody>
              <div>
                <Button color="warning" onClick={toggle} style={{ marginBottom: '1rem' }}>
                  Your Recent Tickets 
                  </Button> 
                <Collapse
                  isOpen={collapse} 
                >
                  <Card>
                    <CardBody>
                    {tickets && tickets.slice(0,5).map((ticket) => (
                       <TicketSummary key={ticket.id} row={ticket} />
                    ))}
                    </CardBody>
                  </Card>
                </Collapse>
              </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="9">
            <div className="my-3">
            <Link to="/ticket/create" className="btn btn-primary">Create Ticket</Link>{" "}
            <Link to="/ticket/list" className="btn btn-info">View Ticket</Link>
            </div>
            <Switch>
              <Route exact path="/ticket/" component={TicketHome} />
              <Route exact path="/ticket/list" component={TicketList} />
              <Route exact path="/ticket/create" component={CreateTicket} />
              <Route exact path="/ticket/:id/view" component={TicketDetails} />
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