import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Row, Col, Button } from "reactstrap";

const CategoryList = ({
  data,
  canDel,
  canAdd,
  setMode,
  removeData,
  rowData,
  toggle,
}) => {
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      wrap: true,
      sortable: true,
    },
    {
      name: "Created",
      selector: "created_at",
      sortable: true,
      right: true,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <div>
          {canAdd ? (
            <Fragment>
              <Button
                size="sm"
                color="warning"
                onClick={(e) => editData(e, row)}
              >
                <i className="fa fa-edit"></i>
              </Button>{" "}
            </Fragment>
          ) : null}
          {canDel ? (
            <Button
              size="sm"
              color="danger"
              onClick={(e) => {
                if (window.confirm("Delete this category?")) {
                  deleteData(e, row.id);
                }
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
          ) : null}
        </div>
      ),
    },
  ];
  const editData = (e, row) => {
    e.persist();
    setMode("Edit");
    rowData(row);
    toggle(true);
  };
  const deleteData = (e, id) => {
    removeData(id);
  };
  return (
    <Fragment>
      <Row>
        <Col md="12">
          <DataTable
            title="Category List"
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

export default CategoryList;
