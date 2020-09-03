import React, { Fragment, useState } from 'react'; 
import DataTable from 'react-data-table-component';
import { Row, Col,  Button } from 'reactstrap';  
import AddStock from './AddStock';
 
 
// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' } ];
const StockList = ({id, data, removeData, deleting, deleteInBulk}) => {   
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState(); 
  const [isOpen, setIsOpen] = useState(false);   
  const [selectedRows, setSelectedRows] = useState([]);
  //  const [toggleCleared, setToggleCleared] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);  
    // toggleClose()
  }
  const createStock = () => {
    setRowData([]);
    setMode('Add')
    toggle(true);
  }

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
    sortable: true
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
  setRowData(row);
  toggle(true);
};
const deleteData = item => {
  removeData(id, item);
}

const bulkDelete = e => {
  if (window.confirm(`Are you sure you want to delete selected items?`)) {
    deleteInBulk(id, selectedRows);
  }
  
}
 
  const handleChange = React.useCallback(state => {
    let id = state.selectedRows.map(r => r.id);
    setSelectedRows(id); 
  }, []);
  
    return (
      <Fragment>
        <Row>
          <Col md="12"> 
         <div className="m-b-2">
             {selectedRows.length > 0 ? (
                <Button color="danger" className='float-right' disabled={deleting} onClick={bulkDelete}> {deleting ? (
                  <span> Deleting data  <i className="fa fa-spinner"></i></span>
                  ): 'Delete'}</Button>
             ) : ''} {" "}
         <Button color="secondary" className='float-left' onClick={createStock}>Add Stock</Button> {" "}
         </div>
          </Col>
          <Col md="12" className="m-t-2">
             <DataTable
              title="Stock List"
              columns={columns}
              data={data}
              pagination={true}
              // striped={true}
              highlightOnHover={true}
              selectableRows={true}
              selectableRowsHighlight={true}
              onSelectedRowsChange={handleChange}
              theme="solarized"
             />
    
          </Col>
        </Row>
        <AddStock  id={id} mode={mode} open={isOpen} initial_data={rowData} handleClose={toggle} />
      </Fragment>
    
    )
}


export default StockList;