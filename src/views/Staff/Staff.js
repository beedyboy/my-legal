import React, { useContext, useState, Fragment, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap"; 
import StaffList from "./Components/StaffList";
import StaffForm from "./Components/StaffForm"; 
import {   toast } from 'react-toastify';
import RoleForm from "./Components/RoleForm";
import Utility from "../../services/UtilityService"; 
import AccountStore from "../../stores/AccountStore";

const Staff = () => {
  const store = useContext(AccountStore);
  const {  users, getUsers, removeStaff } = store;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false); 
  const [acl, setACL] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    getUsers();
  }, []);
  const handleClose = () => {
    setModal(!modal);
  }; 
  const assignACL = () => {
    if (acl === false) {
      setACL(true);
    } else {
      setACL(false);
      setId(0);
    }
  }; 

  useEffect(() => {
    if (removed === true) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    return () => {
      resetProperty("removed", false);
      resetProperty("message", "");
    };
  }, [removed]);
  useEffect(() => {
    if (action === "newStaff") {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
      })
      setOpen(false);
    }
    return () => {
      resetProperty("message", "");
      resetProperty("action", "");
      setOpen(false);
    };
  }, [action]);
  useEffect(() => {
    if (action === "hasRole") {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
      })
      setModal(false);
    }
    return () => {
      resetProperty("message", "");
      resetProperty("action", "");
      setModal(false);
    };
  }, [action]);
  useEffect(() => {
    if (error === true && action === "newStaffError") {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    return () => {
      resetProperty("error", false);
      resetProperty("message", "");
      resetProperty("action", "");
      setOpen(false);
    };
  }, [error]);
  useEffect(() => {
    if (error === true && action === "hasRoleError") {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    return () => {
      resetProperty("error", false);
      resetProperty("message", "");
      resetProperty("action", "");
      setModal(false);
    };
  }, [error]);
  const createStaff = () => {
    setModal(true);
    setMode("Add");
  };
  let canDel = Utility.canAccess("staff", "del");
  let canModify = Utility.canAccess("staff", "modify");
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <Row>
            <Col md="5" sm="12">
              <h5>Staff Management</h5>
            </Col>
            <Col md={{ size: 3, offset: 4 }} sm="12">
              {Utility.canAccess("staff", "add") ? (
                <Fragment>
                  {" "}
                  <Button
                    color="secondary"
                    className="float-right"
                    onClick={createStaff}
                  >
                    Add Staff
                  </Button>{" "}
                </Fragment>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              <StaffList
                canDel={canDel}
                canModify={canModify}
                data={users}
                setMode={setMode}
                setACL={assignACL} 
                setId={setId} 
                toggle={handleClose}
                removeData={removeStaff}
                rowData={setRowData}
              />
            </Col>
          </Row>
          <StaffForm
            mode={mode}
            open={modal}
            handleClose={handleClose}
            store={store}
            initial_data={rowData}
          />
         
          <RoleForm
            open={acl}
            handleClose={assignACL}
            id={id}
            initial_data={rowData}
          /> 
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default observer(Staff);
