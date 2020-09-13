import React, { Fragment, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Row, Col, Button } from "reactstrap";

const SubCatList = ({
  data,
  canDel,
  canAdd,
  setMode,
  removeData,
  rowData,
  toggle,
}) => {
  const columns = useMemo(() => [
    {
      name: "Category",
      selector: "catName",
      sortable: true,
    },
    {
      name: "Name",
      selector: "sub_name",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
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
          ) : (
            ""
          )}
          {canDel ? (
            <Button
              size="sm"
              color="danger"
              onClick={(e) => {
                if (window.confirm("Delete " + row.sub_name + " ?")) {
                  deleteData(e, row.id);
                }
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
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

  const deleteData = (e, id) => {
    removeData(id);
  };
  return (
    <Fragment>
      <Row>
        <Col md="12">
          <DataTable
            title="SubCategory List"
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

export default SubCatList;
