import React, { useEffect, useContext, Fragment } from 'react'
import TicketStore from '../../../stores/TicketStore'
import ReactHtmlParser from 'react-html-parser'; 
import { Badge, Card, CardBody, Row, Col } from 'reactstrap';
import PerfectScrollBar from 'react-perfect-scrollbar'
import { observer } from 'mobx-react';

const TicketDetails = props => {
    const tickStore = useContext(TicketStore);
    const { getTicketById, ticket } = tickStore;
    useEffect(() => {
        let id = parseInt(props.match.params.id); 
        getTicketById(id)
        
    }, [props])
    return (
        <Fragment>
            <Row>
                <Col md="12">
                <Card className="mt-2">
                  <CardBody>
                  <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Ticket Information</h6>
                  <Row>
                    <Col md="12">
                    <p className="m-b-10 f-w-600">Subject</p>
                        <h6 className="text-muted f-w-400"> {ticket && ticket.title}</h6> 
                    </Col>
                    <Col md="4"> 
                            <p className="m-b-10 f-w-600">Created On</p>
                        <h6 className="text-muted f-w-400"> {ticket && ticket.created_at}</h6>
                    </Col>
                    <Col md="4"> 
                            <p className="m-b-10 f-w-600">Ticket Manager</p>
                        <h6 className="text-muted f-w-400"> {ticket && ticket.assigned_to}</h6>
                    </Col>
                    <Col md="4"> 
                            <p className="m-b-10 f-w-600">Status</p>
                        <h6 className="text-muted f-w-400"> {ticket && ticket.status}</h6>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                     <PerfectScrollBar>
                     {ReactHtmlParser(ticket.description)}
                     </PerfectScrollBar>
                    </Col>
                </Row>
                  </CardBody>
                </Card>
                </Col>
            </Row>
              
        </Fragment>
    )
}

export default observer(TicketDetails);
