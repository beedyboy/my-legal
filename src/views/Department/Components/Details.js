import React from 'react'
import ServerTable from 'react-strap-table'; 
import {Button } from 'reactstrap';

const Details = (props) => {
const url = 'http://localhost:8000/api/department';
const columns = ['id', 'Name', 'Description', 'created_at', 'action'];
const options = {  
   headings: {id: '#', created_at: 'Created At'},  
   sortable: ['Name', 'Description'], }
return(
        <div  > 
         <ServerTable columns={columns}  
          url={url}  
          options={options} 
          bordered hover>
             {  
        function (row, column) {  
            switch (column) {  
                case 'action':  
                    return (  
                    <Button  key={row.id} color="primary">primary</Button>
                    );  
                case 'avatar':  
                    return (<img src={row.avatar}  className="table-image"/>); 
                default:  
                    return (row[column]);  
            }  
        }  
    }  
          </ServerTable>
        </div>
    )
}
export default Details; 