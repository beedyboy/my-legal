import React from 'react';
import { Table } from 'reactstrap';



const Contact = (props) => {
     
    const {number, firstName , lastName, userName } = props
    return (
    <div>
    <Table striped>
          {/* <thead>
            <tr>
            <th>#</th>  
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            </tr>
          </thead> */}
          <tbody>
            <tr>
            <th scope="row">{number}</th>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{userName}</td>
            </tr>
            {/* <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            </tr>
            <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
            </tr> */}
        </tbody>
    </Table>


    </div>
    )
}


export default Contact;