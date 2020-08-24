import React, { Fragment } from 'react'
import { Row, Col} from "reactstrap";
import SalesWindow from './Components/SalesWindow';

const POS = () => {
    return (
        <Fragment>
            <Row>
                <Col md="12">
                    <SalesWindow />
                </Col>
            </Row>
        </Fragment>
    )
}

export default POS
// Math.ceil(Math.random() * 10)