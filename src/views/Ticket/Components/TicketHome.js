import React from 'react'
import { Jumbotron, Button } from 'reactstrap';

const TicketHome = () => {
    return (
        <div>
            <Jumbotron>
        <h1 className="display-3">Ticket Management</h1>
        <p className="lead">Your satisfaction is our joy</p>
        <hr className="my-2" />
        <p>If you have any issue with any of our products and services, you can submit a ticket by selecting the appropriate category.</p>
        <p className="lead">
          <Button color="primary">Create Ticket</Button>
        </p>
      </Jumbotron>
        </div>
    )
}

export default TicketHome
