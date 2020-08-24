import React, { Fragment, useContext } from 'react'; 
import DataTable  from 'react-data-table-component';
import { Row, Col,  Button } from 'reactstrap';  
import TicketStore from '../../../stores/TicketStore';
 
  // staff_id, ticket_date, category, priority, 
const TicketList = () => { 
  const tickStore = useContext(TicketStore);
  const { info:data, removeTicket, toggleClose} = tickStore;
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
    name: 'ticket_date',
    selector: 'ticket_date',
    sortable: true,
  },
  {
    name: 'requester',
    selector: 'requester',
    sortable: true
  }, 
  {
    name: 'Description',
    selector: 'description',
    wrap: true,
    sortable: true,
    hide: 'md'
  },
  {
    name: 'Status',
    sortable: true,
    cell: row => <div>
    <Button size="sm" color="warning" onClick={e => editData(e, row)}>
      <i className="fa fa-edit"></i>
      </Button> 
     </div>
  },
  {
    name: 'Actions',
    sortable: true,
    cell: row => <div>
    <Button size="sm" color="warning" onClick={e => editData(e, row)}>
      <i className="fa fa-edit"></i>
      </Button>{' '}

    <Button size="sm" color="danger" 
      onClick={(key) =>{ if(window.confirm('Delete this ticket?')){deleteData( row.id)};}}>
      <i className="fa fa-trash"></i>
      </Button>  
     </div>
  },
];
const editData = (e, row) => {
  e.persist(); 
  // setMode('Edit')
  // rowData(row);
  // toggle(true);
};
const deleteData = (id) => {
  removeTicket(id); 
}
 
    return (
      <Fragment>
        <Row>
          <Col md="12"> 
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


export default TicketList;