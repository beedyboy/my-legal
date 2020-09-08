import React, { Fragment, memo } from 'react';
import { Badge } from 'reactstrap';
import { Link } from 'react-router-dom';

const TicketSummary = memo(({row}) => {
    return (
        <Fragment>
            <div className="my-1">
           <span className="text-muted"> #{row.id}</span>  <Link to={`/ticket/${row.id}/view`} className="text-info">
           {row.title}   </Link> 
           <hr />
          <span><Badge>{row.status}</Badge> </span> <span className="pull-right">{row.created_at}</span>
            </div>
        </Fragment>
    )
})

export default TicketSummary
