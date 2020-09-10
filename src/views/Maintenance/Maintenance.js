import React, { useContext, useState, Fragment } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import MaintenanceStore from "../../stores/MaintenanceStore";
import MaintenanceList from "./Components/MaintenanceList";
import Status from "./Components/Status";

const Maintenance = () => {
  const maintainStore = useContext(MaintenanceStore);
  const {
    info: maintenance,
    toggleStatus,
    toggleClose,
    sending,
    close,
  } = maintainStore;
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };

  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader></CardHeader>
        <CardBody>
          <Row>
            <Col md="5" sm="12">
              <h5>Maintenance</h5>
            </Col>

            <Col md="12" sm="12" className="mt-2">
              <MaintenanceList
                data={maintenance}
                toggle={handleClose}
                rowData={setRowData}
              />
            </Col>
          </Row>

          <Status
            toggleStatus={toggleStatus}
            toggleClose={toggleClose}
            close={close}
            handleClose={handleClose}
            open={modal}
            data={rowData}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default observer(Maintenance);
