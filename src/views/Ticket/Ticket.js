import React, { useContext, useState, Fragment, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { observer } from 'mobx-react';
import { Card, CardBody, Button, Row, Col, Collapse } from 'reactstrap' 
import TicketStore from '../../stores/TicketStore';
import TicketHome from './Components/TicketHome';
import TicketList from './Components/TicketList';
import CreateTicket from './Components/CreateTicket';
import TicketSummary from './Components/TicketSummary';
import TicketDetails from './Components/TicketDetails';

const Ticket = () => { 
  const tickStore = useContext(TicketStore);
  const { fetchMyTicket, myTickets:tickets} = tickStore;
  const [collapse, setCollapse] = useState(true); 
  const toggle = () => setCollapse(!collapse);
  useEffect(() => {
    fetchMyTicket();
  }, [])
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
       
   </Fragment>  

    )
}

export default observer(Ticket);