import React, { useContext, useState, Fragment } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap";
import TicketStore from "../../stores/TicketStore";
import AdminTicketList from "./Components/AdminTicketList";
import TicketForm from "./Components/TicketForm";
import Utility from "../../services/UtilityService";

const TicketAdmin = () => {
  const tickStore = useContext(TicketStore);
  const { info: tickets, removeTicket, toggleClose } = tickStore;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);

  const handleClose = () => {
    setModal(!modal);
    toggleClose();
  };
  const createTicket = () => {
    setModal(true);
    setMode("Add");
  };

  let canManage = Utility.canAccess("ticket", "manage");
  return (
    <Fragment>
      <Card className="mt-2">
        {canManage ? (
          <Fragment>
            <CardHeader>
              <Row>
                <Col md="5" sm="12">
                  <h5>Ticket Management</h5>
                </Col>
                <Col md={{ size: 3, offset: 4 }} sm="12">
                  <Button
                    color="secondary"
                    className="float-right"
                    onClick={createTicket}
                  >
                    Add Ticket
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="12" sm="12" className="mt-2">
                  <AdminTicketList
                    data={tickets}
                    setMode={setMode}
                    toggle={handleClose}
                    removeData={removeTicket}
                    rowData={setRowData}
                  />
                </Col>
              </Row>
              <TicketForm
                mode={mode}
                open={modal}
                handleClose={handleClose}
                initial_data={rowData}
              />
            </CardBody>
          </Fragment>
        ) : (
          "You do not have access to this page"
        )}
      </Card>
    </Fragment>
  );
};

export default observer(TicketAdmin);
