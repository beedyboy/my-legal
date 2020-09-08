import React, { Fragment, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Row, Col, Badge } from "reactstrap";
import TicketStore from "../../../stores/TicketStore";
import { Link } from "react-router-dom";

const TicketList = () => {
  const tickStore = useContext(TicketStore);
  const { fetchMyTicket, myTickets: data } = tickStore;
  useEffect(() => {
    fetchMyTicket();
  }, []);
  const columns = [
    {
      name: "Subject",
      selector: "title",
      sortable: true,
    },
    {
      name: "Ticket date",
      selector: "ticket_date",
      sortable: true,
    },
    {
      name: "Status",
      sortable: true,
      cell: (row) => <Badge>{row.status}</Badge>,
    },
    {
      name: "Actions",
      sortable: true,
      cell: (row) => (
        <div>
          <Link to={`/ticket/${row.id}/view`} className="btn btn-info btn-sm">
            View
          </Link>
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <Row>
        <Col md="12" className="m-t-2">
          <DataTable
            title="My Tickets"
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

export default TicketList;
