import React, { Fragment } from "react"; 
import DataTable from "react-data-table-component";
import { 
  Card,
  CardBody, 
  Row,
  Col,
} from "reactstrap"; 

const MyAllocations = ({ data }) => {
    const columns = [
        {
          name: "Asset",
          selector: "title",
          sortable: true,
        },
        {
          name: "Department",
          selector: "status",
          sortable: true,
        },
        {
          name: "Staff", 
          sortable: true,
          cell: (row) => (
              <div>{row.firstname + " "+ row.lastname}</div>
          )
        }, 
        {
          name: "Status",
          selector: "status",
          sortable: true,
        },   
        {
          name: "Date",
          selector: "created_at",
          sortable: true,
        }
      ];
  return (
    <Fragment>
      <Row>
        <Col md="12">
          <Card>
             
            <CardBody>
              <DataTable
                title="Allocation History"
                columns={columns}
                data={data}
                pagination={true}
                theme="solarized"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default MyAllocations;
