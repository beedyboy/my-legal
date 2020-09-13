import React, { Fragment, useState } from "react";
import DataTable from "react-data-table-component";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

const AssetList = ({
  data,
  canAdd,
  canDel,
  canModify,
  setMode,
  removeData,
  rowData,
  createAsset,
  toggle,
  deleting,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const handleChange = React.useCallback((state) => {
    let id = state.selectedRows.map((r) => r.id);
    setSelectedRows(id);
  }, []);

  const transfer = () => {
    // deleteInBulk(id, selectedRows);
  };
  const columns = [
    {
      name: "Name",
      selector: "title",
      sortable: true,
    },
    {
      name: "Serial",
      selector: "serial",
      sortable: true,
    },
    {
      name: "Sub Category",
      selector: "subName",
      sortable: true,
    },
    {
      name: "Date",
      selector: "purchased_date",
      sortable: true,
    },
    {
      name: "Price",
      selector: "purchased_price",
      sortable: true,
    },
    {
      name: "Condition",
      selector: "condition",
      sortable: true,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <div>
          {canModify ? (
            <Fragment>
              <Button
                size="sm"
                color="warning"
                onClick={(e) => editData(e, row)}
              >
                <i className="fa fa-edit"></i>
              </Button>{" "}
              <Link
                to={`/asset/${row.id}/view`}
                className="btn btn-info btn-sm"
              >
                View
              </Link>{" "}
            </Fragment>
          ) : (
            ""
          )}
          {canDel ? (
            <Button
              size="sm"
              color="danger"
              onClick={(e) => {
                if (window.confirm("Delete the item?")) {
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
  ];
  const editData = (e, row) => {
    e.persist();
    setMode("Edit");
    rowData(row);
    toggle(true);
  };
  const deleteData = (id) => {
    removeData(id);
  };
  return (
    <Fragment>
      <Row>
        <Col md="12" sm="12">
          <div className="m-b-2 ">
            {canModify ? (
              <Fragment>
                {selectedRows.length > 0 ? (
                  <Button
                    color="info"
                    className="float-right my-1"
                    disabled={deleting}
                    onClick={transfer}
                  >
                    {" "}
                    {deleting ? (
                      <span>
                        {" "}
                        Transfering <i className="fa fa-spinner"></i>
                      </span>
                    ) : (
                      "Transfer"
                    )}
                  </Button>
                ) : (
                  ""
                )}{" "}
              </Fragment>
            ) : null}
            {canAdd ? (
              <Fragment>
                <Button
                  color="secondary"
                  className="float-right my-1"
                  onClick={createAsset}
                >
                  Add Asset
                </Button>{" "}
              </Fragment>
            ) : (
              ""
            )}
          </div>
        </Col>
        <Col md="12">
          <DataTable
            title="Asset List"
            columns={columns}
            data={data}
            pagination={true}
            theme="solarized"
            highlightOnHover={true}
            selectableRows={true}
            selectableRowsHighlight={true}
            onSelectedRowsChange={handleChange}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default AssetList;
