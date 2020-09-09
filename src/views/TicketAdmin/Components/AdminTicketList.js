import React, { Fragment, useContext } from 'react'; 
import DataTable  from 'react-data-table-component';
import { Row, Col,  Button, Badge } from 'reactstrap';   
import { Link } from 'react-router-dom'; 
 

  const AdminTicketList = ({data, setMode, rowData, toggle}) => {  
const columns = [
  {
    name: 'Subject',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
  },
  {
    name: 'Ticket date',
    selector: 'ticket_date',
    sortable: true,
  },
  {
    name: 'Requester',
    selector: 'requester',
    sortable: true
  }, 
  {
    name: 'Status',
    sortable: true,
    cell: row => <Badge>{row.status}
   
     </Badge>
  },
  {
    name: 'Actions',
    sortable: true,
    cell: row => <div> 
      <Link to={`/adminticket/view/${row.id}`} className="btn btn-info btn-sm">View</Link>
      {' '}
      <Button size="sm" color="warning" onClick={e => editData(e, row)}>
      <i className="fa fa-edit"></i>
      </Button>{' '}

    {/* <Button size="sm" color="danger" 
      onClick={(key) =>{ if(window.confirm('Delete this ticket?')){deleteData( row.id)};}}>
      <i className="fa fa-trash"></i>
      </Button>   */}
     </div>
  },
];
const editData = (e, row) => {
  e.persist(); 
  setMode('Edit')
  rowData(row);
  toggle(true);
};
// const deleteData = (id) => {
//   removeTicket(id); 
// }
 
    return (
      <Fragment>
      <Row>
      
        <Col md="12" className="m-t-2">
           <DataTable
            title="Ticket List"
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


export default AdminTicketList;