import React, { Fragment, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Button, 
} from "reactstrap";
 
const StaffList = ({
  data,
  setMode, 
  setId,
  setACL, 
  removeData,
  rowData,
  toggle,
  canDel,
  canModify,
}) => {
  const columns = useMemo(() => [
    {
      name: "Name",
      sortable: true,
      cell: (row) => (
        <Fragment>
          <Link to={`/staff/${row.id}/view`} className="text-info">
            {row.firstname + " " + row.lastname}
          </Link>
        </Fragment>
      ),
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    }, 
    {
      name: "Phone",
      selector: "phone",
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
          {canModify ? (
            <Fragment>
              <Button size="sm" color="info" onClick={(e) => editData(e, row)}>
                <i className="fa fa-edit"></i>
              </Button>{" "}
              <Button size="sm" color="info" onClick={(e) => assignACL(e, row)}>
                <i className="fa fa-key"></i> Roles
              </Button>{" "}
            </Fragment>
          ) : (
            ""
          )}
          {canDel ? (
            <Fragment>
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
            </Fragment>
          ) : (
            ""
          )}
          
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
  const assignACL = (e, row) => {
    e.persist();
    rowData(row);
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
