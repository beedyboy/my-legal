import React, { Fragment, useMemo } from "react";
import DataTable from "react-data-table-component"; 
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";

const BlogList = ({
  data,
  setMode,
  setId,
  removeData,
  rowData,
  toggle,
  canDel,
  canModify,
}) => {
  const columns = useMemo(() => [
    {
      name: "Title",
      sortable: true,
      cell: (row) => (
        <Fragment>
          <Link to={`/blog/${row.id}/view`} className="text-info">
            {row.title}
          </Link>
        </Fragment>
      ),
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
                  if (window.confirm("Delete this blog?")) {
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

  const deleteData = (e, id) => {
    removeData(id);
  };
  return (
    <Fragment>
      <Row>
        <Col md="12">
          <DataTable
            title="Blog List"
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

export default BlogList;
