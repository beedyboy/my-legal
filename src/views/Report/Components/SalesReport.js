import React, { Fragment } from 'react'; 
import DataTable  from 'react-data-table-component';
import { Row, Col } from 'reactstrap';  
import PerfectScrollBar from 'react-perfect-scrollbar';
 
 
// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' } ];
const SalesReport = ({data}) => { 
const columns = [
  {
    name: 'Invoice',
    selector: 'order_no',
    sortable: true,
  },
  {
    name: 'Date',
    selector: 'sales_date',
    sortable: true,
  },
  {
    name: 'Total',
    selector: 'total',
    sortable: true,
  },
  {
    name: 'Status',
    selector: 'status',
    wrap: true,
    sortable: true,
    hidden: 'sm'
  }, 
];
 
    return (
      <Fragment>
       <PerfectScrollBar>
       <Row>
          <Col md="12"> 
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
       
      </Fragment>
    
    )
}


export default SalesReport;