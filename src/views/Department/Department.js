import React, {Fragment, useContext, useState} from 'react'; 
import DepartmentList from './Components/DepartmentList'
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap'
import DepartmentStore from '../../stores/DepartmentStore';
import AddDepartment from './Components/AddDepartment';
import { observer } from 'mobx-react';
 
const  Department = () => {
  const deptStore = useContext(DepartmentStore);
  const { info:departments, removeDepartment} = deptStore;  
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState(); 
  const [modal, setModal] = useState(false);  
  const handleClose = () => {
    setModal(!modal);  
  }
  const createDepartment = () => {
    setModal(true); 
    setMode('Add'); 
  }  
  return ( 
      <Fragment>
         <Card className='mt-2'>
            <CardHeader>
            </CardHeader>
            <CardBody>
            <Row>
              <Col md="5" sm="12">
                <h5>Department Management</h5> 
              </Col>
              <Col md={{ size: 3, offset: 4 }} sm="12"> 
              <Button color="secondary" className='float-right' onClick={createDepartment}
              >Add Department</Button>{' '}
              </Col>
              <Col md="12" sm="12" className='mt-2'>
                <DepartmentList setMode={setMode} data={departments} toggle={handleClose}   removeData={removeDepartment} rowData={setRowData} /> 
              </Col>
            </Row>
            <AddDepartment mode={mode} open={modal} handleClose={handleClose} initial_data={rowData} /> 

          {/* <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
              <ModalBody>
                  <AddDepartment mode={mode} open={modal}  initial_data={rowData} />
              </ModalBody>
          </Modal>  */}

            </CardBody>
          </Card>
      
      </Fragment>  
  );
}

export default observer(Department);