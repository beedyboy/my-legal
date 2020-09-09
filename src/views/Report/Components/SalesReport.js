import React, { Fragment, useRef } from "react";
import DataTable from "react-data-table-component";
import { Row, Col, Button } from "reactstrap";
import PerfectScrollBar from "react-perfect-scrollbar";
import ReactToPrint from "react-to-print";
import { CSVLink } from "react-csv";
import PrintSales from "./PrintSales";

const SalesReport = ({ data, period }) => {
  const componentRef = useRef();
  const columns = [
    {
      name: "Invoice",
      selector: "order_no",
      sortable: true,
    },
    {
      name: "Date",
      selector: "sales_date",
      sortable: true,
    },
    {
      name: "Total",
      selector: "total",
      sortable: true,
    },
    {
      name: "Status",
      selector: "status",
      wrap: true,
      sortable: true,
      hidden: "sm",
    },
  ];
  const headers = [
    {
      label: "Invoice Number",
      key: "order_no",
    },
    {
      label: "Date",
      key: "sales_date",
    },
    {
      label: "Total",
      key: "total",
    },
    {
      label: "Status",
      key: "status",
    },
  ];
  var totalAmount = data && data.map((a) => a.total).reduce((a, b) => a + b, 0);
  return (
    <Fragment>
      <PerfectScrollBar>
        <Row>
          {data && data.length > 0 ? (
            <Fragment>
              <Col md="12">
                <ReactToPrint
                  trigger={() => (
                    <Button color="success">
                      <i className="fa fa-print"></i>
                      Print
                    </Button>
                  )}
                  content={() => componentRef.current}
                />{" "}
                <CSVLink
                  data={data}
                  filename={"salesReport " + period + ".csv"}
                  className="btn btn-info"
                  target="_blank"
                  headers={headers}
                  onClick={() => {
                    console.log("You click the link"); // 👍🏻 Your click handling logic
                  }}
                >
                  <i className="fa fa-file-excel-o" />
                  Export to excel
                </CSVLink>
              </Col>
            </Fragment>
          ) : null}
          <Col md="12" className="m-t-2">
            <DataTable
              title="Sales Report"
              columns={columns}
              data={data}
              pagination={true}
              theme="solarized"
            />
          </Col>
        </Row>
      </PerfectScrollBar>
      <React.Fragment>
        <div style={{ display: "none" }}>
          <PrintSales
            ref={componentRef}
            report={data}
            period={period}
            total={totalAmount}
          />
        </div>
      </React.Fragment>
    </Fragment>
  );
};

export default SalesReport;
