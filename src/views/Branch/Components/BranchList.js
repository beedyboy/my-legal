import React, { Fragment } from 'react'; 
import DataTable  from 'react-data-table-component';
import { Row, Col,  Button } from 'reactstrap';  
import PerfectScrollBar from 'react-perfect-scrollbar';
 
 
// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' } ];
const BranchList = ({data, setMode, removeData, rowData, toggle}) => { 
const columns = [
  {
    name: 'Name',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
  },
  {
    name: 'Phone',
    selector: 'phone',
    sortable: true,
  },
  {
    name: 'Address',
    selector: 'address',
    wrap: true,
    sortable: true,
    hidden: 'sm'
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
      onClick={(key) =>{ if(window.confirm('Delete this branch?')){deleteData( row.id)};}}>
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
const deleteData = (id) => {
  removeData(id); 
}
 
    return (
      <Fragment>
       <PerfectScrollBar>
       <Row>
          <Col md="12"> 
             <DataTable
            title="Branch List"
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


export default BranchList;