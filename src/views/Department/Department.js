import React, { Fragment, useContext, useState } from "react";
import DepartmentList from "./Components/DepartmentList";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap";
import DepartmentStore from "../../stores/DepartmentStore";
import AddDepartment from "./Components/AddDepartment";
import { observer } from "mobx-react";
import Utility from "../../services/UtilityService";

const Department = () => {
  const deptStore = useContext(DepartmentStore);
  const { info: departments, removeDepartment } = deptStore;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };
  const createDepartment = () => {
    setModal(true);
    setMode("Add");
  };
  let canAdd = Utility.canAccess("department", "add");
  let canDel = Utility.canAccess("department", "del");
  let canView = Utility.canAccess("department", "view");
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <Row>
            <Col md="5" sm="12">
              <h5>Department Management</h5>
            </Col>
            <Col md={{ size: 3, offset: 4 }} sm="12">
              {canAdd ? (
                <Button
                  color="secondary"
                  className="float-right"
                  onClick={createDepartment}
                >
                  Add Department
                </Button>
              ) : null}
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              {canView ? (
                <DepartmentList
                  canAdd={canAdd}
                  canDel={canDel}
                  setMode={setMode}
                  data={departments}
                  toggle={handleClose}
                  removeData={removeDepartment}
                  rowData={setRowData}
                />
              ) : (
                "You do not have access to view"
              )}
            </Col>
          </Row>
          <AddDepartment
            mode={mode}
            open={modal}
            handleClose={handleClose}
            initial_data={rowData}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default observer(Department);
