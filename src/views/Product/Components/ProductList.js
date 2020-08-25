import React, { Fragment } from 'react'; 
import DataTable, { createTheme } from 'react-data-table-component';
import { Row, Col,  Button } from 'reactstrap';  
import {Link} from 'react-router-dom'; 
 
// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' } ];
const ProductList = ({data, setMode, removeData, rowData, toggle}) => {
  
const columns = [ 
  {
    name: 'Image',
    sortable: true,
    cell: row => <div>
     <img src={row.images} alt={row.product_name} style={{width: '100%', height: '30'}} />
     </div>
  },
  {
    name: 'Name',
    selector: 'product_name',
    sortable: true 
  },
  {
    name: 'Category',
    selector: 'catName',
    sortable: true
  },
  {
    name: 'Branch',
    selector: 'branchName',
    sortable: true,
  },
  {
    name: 'Description',
    selector: 'description',
    wrap: true,
    sortable: true,
    hide: 'sm'
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
    <Link to={`/product/${row.id}`} className="danger">
      <Button color="info" size="sm"><i className="fa fa-eye"></i></Button>
      </Link>  
      {' '}
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
                title="Product List"
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


export default ProductList;