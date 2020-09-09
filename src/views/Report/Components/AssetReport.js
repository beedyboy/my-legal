import React, { Fragment, useRef } from 'react'; 
import DataTable  from 'react-data-table-component';
import { Row, Col, Button } from 'reactstrap';  
import PerfectScrollBar from 'react-perfect-scrollbar';
import ReactToPrint from "react-to-print";
import PrintSales from './PrintSales';


 
 
// purchased_date: '2020-09-09',
// date_sold: null, 
// company_name: null,
// start_date: null,
// end_date: null
const AssetReport = ({data}) => { 
  const componentRef= useRef(); 
const columns = [
  {
    name: 'Asset',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Serial',
    selector: 'serial',
    sortable: true,
  },
  {
    name: 'Price',
    selector: 'purchased_price',
    sortable: true,
  },
  {
    name: 'Condition',
    selector: 'condition',
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
         {/* <ReactToPrint
          trigger={() =>  <Button color="primary">
            <i className="fa fa-print"></i>
           Print</Button>}
          content={() => componentRef.current}
        /> */}
         </Col>
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
       <React.Fragment>
        <div style={{display: 'none'}}>
        {/* <PrintSales ref={componentRef} report={report} period={period} total={total} settings={settings} /> */}
        </div>
         </React.Fragment>
      </Fragment>
    
    )
}


export default AssetReport;