import React, { useContext, useState, Fragment, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap' 
import UserStore from '../../stores/UserStore';
import StaffList from './Components/StaffList';
import AddStaff from './Components/AddStaff';
import AddLogin from './Components/AddLogin';

const Staff = () => { 
  const userStore = useContext(UserStore);
  const { info:users, fetchUsers, removeUser} = userStore;  
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState(); 
  const [modal, setModal] = useState(false);   
  const [lmodal, setLModal] = useState(false);   
  useEffect(() => {
    fetchUsers();
     
  }, [])
  const handleClose = () => {
    setModal(!modal);  
  }
  const toggleLogin = () => {
    setLModal(!lmodal);  
  }
  const createStaff = () => {
    setModal(true); 
    setMode('Add'); 
  }  
    return( 
      <Fragment>
      <Card className='mt-2'>
         <CardHeader>
         </CardHeader>
         <CardBody>
         <Row>
           <Col md="5" sm="12">
             <h5>Staff Management</h5>
          
           </Col>
           <Col md={{ size: 3, offset: 4 }} sm="12"> 
           <Button color="secondary" className='float-right' onClick={createStaff}
           >Add Staff</Button>{' '}
           </Col>
           <Col md="12" sm="12" className='mt-2'>
             <StaffList  data={users} setMode={setMode} setLogin={toggleLogin} toggle={handleClose} removeData={removeUser} rowData={setRowData} /> 
           </Col>
         </Row>
         <AddStaff mode={mode} open={modal} handleClose={handleClose} initial_data={rowData} />  
         <AddLogin open={lmodal}  handleClose={toggleLogin} initial_data={rowData} />
         </CardBody>
       </Card>
   
   </Fragment>  

    )
}

export default observer(Staff);