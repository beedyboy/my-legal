import React from 'react'
import { Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom'

const TicketHome = () => {
    return (
        <div>
            <Jumbotron>
        <h1 className="display-3">Ticket Management</h1>
        <p className="lead">Your satisfaction is our joy</p>
        <hr className="my-2" />
        <p>If you have any issue with any of our products and services, you can submit a ticket by selecting the appropriate category.</p>
        <p className="lead">
          <Link to="/ticket/create" className="btn btn-primary">Create Ticket</Link>
        </p>
      </Jumbotron>
        </div>
    )
}

export default TicketHome
