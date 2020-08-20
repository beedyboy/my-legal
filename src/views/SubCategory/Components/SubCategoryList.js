import React, { Fragment,  useMemo } from 'react'; 
import DataTable, { createTheme } from 'react-data-table-component';
import { Row, Col,  Button } from 'reactstrap';  
 
createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});
const SubCatList = ({data, setMode, removeData, rowData, toggle}) => {
  const columns = useMemo(() => [
    {
      name: 'Category', 
      selector: 'cat_Name',
      sortable: true
    },
    {
      name: 'Name', 
      selector: 'name',
      sortable: true
    },
    {
      name: 'Description',
      selector: 'description',
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
       onClick={(e) =>{ if(window.confirm('Delete this sub?')){deleteData(e, row.id)};}}>
        <i className="fa fa-trash"></i>
        </Button> 
       </div>
    },
  ]); 
const editData = (e, row) => {
  e.persist(); 
  setMode('Edit')
  rowData(row);
  toggle(true);
};
 
const deleteData = (e, id) => {
  removeData(id);
}
    return (
      <Fragment>
        <Row>
          <Col md="12">
             <DataTable
              title="SubCategory List"
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


export default SubCatList;