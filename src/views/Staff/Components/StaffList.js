import React, { Fragment, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import {
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' } ];
const StaffList = ({
  data,
  setMode,
  setLogin,
  setId,
  setACL, 
  removeData,
  rowData,
  toggle,
}) => {
  const [dropdownOpen, setOpen] = useState(false);
  const toggleAccess = () => setOpen(!dropdownOpen);
  const columns = useMemo(() => [
    {
      name: "Name",
      sortable: true,
      cell: (row) => <Fragment>{row.firstname + " " + row.lastname}</Fragment>,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Phone",
      selector: "phone_number",
      sortable: true,
    },
    {
      name: "Created",
      selector: "created_at",
      sortable: true,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <div>
          <Button size="sm" color="info" onClick={(e) => editData(e, row)}>
            <i className="fa fa-edit"></i>
          </Button>{" "}
          <Button
            size="sm"
            color="danger"
            onClick={(e) => {
              if (window.confirm("Delete this staff?")) {
                deleteData(e, row.id);
              }
            }}
          >
            <i className="fa fa-trash"></i>
          </Button>{" "} 
           <Fragment>
           <UncontrolledButtonDropdown size="sm">
              <DropdownToggle caret color="warning">
                Set
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem size="sm" onClick={(e) => assignACL(e, row)}>
                  <i className="fa fa-key"></i>   Roles
                </DropdownItem>
              {row.can_login === "No" ? ( 
                  <DropdownItem size="sm" onClick={(e) => createLogin(e, row)}> 
                  <i className="fa fa-plus"></i>  Login
                </DropdownItem>
          ) : null}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
           </Fragment>
        </div>
      ),
    },
  ]);
  const editData = (e, row) => {
    e.persist();
    setMode("Edit");
    rowData(row);
    toggle(true);
  };
  const createLogin = (e, row) => {
    e.persist();
    rowData(row);
    setLogin();
  };
  const assignACL = (e, row) => {
    e.persist();
    setId(row.id);
    setACL();
  };
  const deleteData = (e, id) => {
    removeData(id);
  };
  return (
    <Fragment>
      <Row>
        <Col md="12">
          <DataTable
            title="Staff List"
            columns={columns}
            data={data}
            pagination={true}
            theme="solarized"
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default StaffList;
