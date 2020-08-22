import React, { Fragment } from 'react'; 
import DataTable from 'react-data-table-component';
import { Row, Col,  Button } from 'reactstrap';  
 
 
// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' } ];
const StockList = ({data, setMode, removeData, rowData, toggle}) => {
  
const columns = [
  {
    name: 'Name',
    selector: 'stock_name',
    sortable: true,
  },
  {
    name: 'Quantity',
    selector: 'quantity',
    sortable: true,
  },
  {
    name: 'Price',
    selector: 'price',
    sortable: true,
  },
  {
    name: 'Expiry',
    selector: 'expiry',
    sortable: true,
  },
  {
    name: 'Created',
    selector: 'created_at',
    sortable: true,
    right: true,
  }, 
  {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
    <Button size="sm" color="warning" onClick={e => editData(e, row)}>
      <i className="fa fa-edit"></i>
      </Button>{' '}
    <Button size="sm" color="danger" 
    onClick={(e) =>{ if(window.confirm('Delete this stock?')){deleteData( e, row.id)};}}>
      <i className="fa fa-trash"></i>
      </Button>  
     </div>
  },
];
const editData = (e, row) => {
  e.persist(); 
  setMode('Edit')
  rowData(row);
  toggle(true);
};
const deleteData = id => {
  removeData(id);
}
    return (
      <Fragment>
        <Row>
          <Col md="12">
             <DataTable
      title="Asset List"
      columns={columns}
      data={data}
      pagination={true}
      theme="solarized"
    />
    
          </Col>
        </Row>
      </Fragment>
    
    )
}


export default StockList;