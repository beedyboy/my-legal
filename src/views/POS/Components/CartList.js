import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Row, Col, Button } from "reactstrap";

const CartList = ({
  data,
  canModify,
  setMode,
  removeData,
  setRowData,
  toggle,
}) => {
  const columns = [
    {
      name: "Item",
      selector: "stock_name",
      sortable: true,
    },
    {
      name: "Quantity",
      selector: "quantity",
      sortable: true,
    },
    {
      name: "Total Price",
      selector: "sold_price",
      wrap: true,
      sortable: true,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <div>
          {canModify ? (
            <Button
              size="sm"
              color="danger"
              onClick={(key) => {
                if (window.confirm("Delete this item?")) {
                  deleteData(row.id);
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
    setRowData(row);
    toggle(true);
  };
  const deleteData = (id) => {
    removeData(id);
  };
  return (
    <Fragment>
      <Row>
        <Col md="12">
          <DataTable
            title="Cart List"
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

export default CartList;
