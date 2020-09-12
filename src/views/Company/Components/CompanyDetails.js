import React, { Fragment } from 'react'
import { Button, Row, Col } from 'reactstrap'  
const CompanyDetails = ({data, toggle}) => {
    return (
        <Fragment>
            <Row>
                <Col md="12" sm="12">
                    {/* <Button color="primary" onClick={toggle}>Edit Profile</Button> */}
                    <div className="card-block  border-right">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                    <Row>
                        <Col sm="6">
                        <p className="m-b-10 f-w-600">Name</p>
                         <h6 className="text-muted f-w-400">{data.companyname}</h6>
                        </Col>
                        <Col sm="6">
                        <p className="m-b-10 f-w-600">App Name</p>
                         <h6 className="text-muted f-w-400">{data.appname || '-'}</h6>
                        </Col>
                        <Col sm="6">
                        <p className="m-b-10 f-w-600">Email</p>
                         <h6 className="text-muted f-w-400">{data.email}</h6>
                        </Col>
                        <Col sm="6">
                        <p className="m-b-10 f-w-600">Phone</p>
                         <h6 className="text-muted f-w-400">{data.phone || '-'}</h6>
                        </Col>
                        <Col sm="12">
                        <p className="m-b-10 f-w-600">Address</p>
                         <h6 className="text-muted f-w-400">{data.address || '-'}</h6>
                        </Col>
                    </Row>
                     
                    <Button color="info" size="sm" onClick={toggle}>
                        <i className="fa fa-edit"></i>
                    </Button>
                   
                    </div>

                </Col>
            </Row>

        </Fragment>
    )
}

export default CompanyDetails;