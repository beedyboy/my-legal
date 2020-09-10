import React, { useEffect, useContext, Fragment, useState } from "react";
import TicketStore from "../../../stores/TicketStore";
import ReactHtmlParser from "react-html-parser";
import { Badge, Card, CardBody, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import PerfectScrollBar from "react-perfect-scrollbar";
import { observer } from "mobx-react";
import Conversation from "../../../components/Conversation/Conversation";
import Status from "./Status";
import AssignTicket from "./AssignTicket";

const AdminTicketDetails = (props) => {
  const tickStore = useContext(TicketStore);
  const {
    getTicketById,
    ticket,
    toggleStatus,
    sending,
    close,
    toggleClose,
  } = tickStore;
  const [modal, setModal] = useState(false);
  const [assign, setAssign] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };
  const toggleAssign = () => {
    setAssign(!assign);
  };
  useEffect(() => {
    let id = parseInt(props.match.params.id);
    getTicketById(id);
  }, [props]);
  return (
    <Fragment>
      <Row>
        <Col md="12">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="d-flex flex-row align-items-center back">
              <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
              <h6>
                <Link to={`/admin/ticket`} className="btn btn-info btn-sm">
                  Back to Tickets
                </Link>
              </h6>
            </div> 
          </div>
        </Col>
        <Col md="8">
          <Card className="mt-2">
            <CardBody>
              <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Conversation</h6>
              <Row>
                <Col md="12">
                  <Conversation
                    id={parseInt(props.match.params.id)}
                    respondent="TaskPerson"
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Row>
            <Col md="12">
              <Card className="mt-2">
                <CardBody>
                  <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                    Ticket Information
                  </h6>
                  <Row>
                    <Col md="12">
                      <p className="m-b-10 f-w-600">Subject</p>
                      <h6 className="text-muted f-w-400">
                        {" "}
                        {ticket && ticket.title}
                      </h6>
                    </Col>
                    <Col md="12">
                      <p className="m-b-10 f-w-600">Created On</p>
                      <h6 className="text-muted f-w-400">
                        {" "}
                        {ticket && ticket.created_at}
                      </h6>
                    </Col>
                    <Col md="12">
                      <p className="m-b-10 f-w-600">
                        Ticket Manager {" "}
                        <Button
                          size="sm"
                          color="warning"
                          onClick={toggleAssign}
                        >
                          <i className="fa fa-edit"></i>
                        </Button>
                      </p>
                      <h6 className="text-muted f-w-400">
                        {" "}
                      {` ${ticket && ticket.firstname}  ${ticket && ticket.lastname}`}
                      </h6>
                      <AssignTicket
                        open={assign}
                        handleClose={toggleAssign}
                        ticket={ticket.id}
                      />
                    </Col>
                    <Col md="12">
                      <p className="m-b-10 f-w-600">Status</p>
                      <h6 className="text-muted f-w-400">
                        <Badge>{ticket && ticket.status}</Badge> {" "}
                        <Button size="sm" color="warning" onClick={handleClose}>
                          <i className="fa fa-edit"></i>
                        </Button>
                      </h6>
                      <Status
                        open={modal}
                        handleClose={handleClose}
                        sending={sending}
                        data={ticket.status}
                        close={close}
                        toggleStatus={toggleStatus}
                        toggleClose={toggleClose}
                      />
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
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(AdminTicketDetails);
