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
// const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' } ];
const StaffList = ({data, setMode, setLogin, removeData, rowData, toggle}) => {
  const columns = useMemo(() => [
    {
      name: 'Name', 
      sortable: true,
      cell: row => <Fragment>
        {row.firstname + " " + row.lastname}
      </Fragment>
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Phone',
      selector: 'phone_number',
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
       onClick={(e) =>{ if(window.confirm('Delete the item?')){deleteData(e, row.id)};}}>
        <i className="fa fa-trash"></i>
        </Button>{' '}
        {row.can_login === "No" ? (
          <Button size="sm" color="danger" onClick={e => createLogin(e, row)}>
          <i className="fa fa-plus"></i>
          </Button>  
        ): null}
       </div>
    },
  ]); 
const editData = (e, row) => {
  e.persist(); 
  setMode('Edit')
  rowData(row);
  toggle(true);
};
const createLogin = (e, row) => {
  e.persist();  
  rowData(row);
  setLogin();
};
const deleteData = (e, id) => {
  removeData(id);
}
    return (
      <Fragment>
        <Row>
          <Col md="12">
             <DataTable
      title="Staff List"
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


export default StaffList;