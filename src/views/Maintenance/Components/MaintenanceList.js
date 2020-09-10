import React, { Fragment } from "react";
import DataTable from "react-data-table-component";
import { Row, Col, Button } from "reactstrap";

const MaintenanceList = ({ data, rowData, toggle }) => {
  const columns = [
    {
      name: "Name",
      selector: "title",
      sortable: true,
    },
    {
      name: "Cost",
      selector: "cost",
      sortable: true,
    },
    {
      name: "Date",
      selector: "maintenance_date",
      sortable: true,
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <div>
          <Button size="sm" color="dark" onClick={(e) => setStatus(e, row.id)}>
            <i className="fa fa-edit"></i>
          </Button>
        </div>
      ),
    },
  ];
  const setStatus = (e, row) => {
    e.persist();
    rowData(row);
    toggle();
  };

  return (
    <Fragment>
      <Row>
        <Col md="12">
          <DataTable
            title="Maintenance List"
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

export default MaintenanceList;
