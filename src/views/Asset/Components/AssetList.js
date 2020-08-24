import React, { Fragment, useState } from 'react'; 
import DataTable from 'react-data-table-component';
import { Row, Col,  Button } from 'reactstrap';  
 
// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' } ];
const AssetList = ({data, setMode, removeData, rowData, toggle}) => { 
  console.log({data})
const columns = [
  {
    name: 'Name',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Serial',
    selector: 'serial',
    sortable: true,
  },
  {
    name: 'Sub Category',
    selector: 'subName',
    sortable: true,
  },
  {
    name: 'Date',
    selector: 'purchased_date',
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
    sortable: true,
  },
  {
    name: 'Description',
    selector: 'description',
    wrap: true,
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
    onClick={(e) =>{ if(window.confirm('Delete the item?')){deleteData( e, row.id)};}}>
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


export default AssetList;