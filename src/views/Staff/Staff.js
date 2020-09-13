import React, { useContext, useState, Fragment, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap' 
import UserStore from '../../stores/UserStore';
import StaffList from './Components/StaffList';
import AddStaff from './Components/AddStaff';
import AddLogin from './Components/AddLogin';
import RoleForm from './Components/RoleForm';
import Utility from '../../services/UtilityService';

const Staff = () => { 
  const userStore = useContext(UserStore);
  const { info:users, fetchUsers, removeUser} = userStore;  
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState(); 
  const [modal, setModal] = useState(false);   
  const [lmodal, setLModal] = useState(false);   
  const [acl, setACL] = useState(false);   
  const [id, setId] = useState(0);   
  useEffect(() => {
    fetchUsers(); 
  }, [])
  const handleClose = () => {
    setModal(!modal);  
  }
  const toggleLogin = () => {
    setLModal(!lmodal);  
  }
  const assignACL = () => {
    if(acl === false) { 
    setACL(true);  
    } else {
      setACL(false);
      setId(0);  
    }
  }
  const createStaff = () => {
    setModal(true); 
    setMode('Add'); 
  }  
  let canDel = Utility.canAccess("staff", "del");
  let canModify = Utility.canAccess("staff", "modify");
    return( 
      <Fragment>
      <Card className='mt-2'>
         <CardHeader>
           <Row>
           <Col md="5" sm="12">
             <h5>Staff Management</h5> 
           </Col>
           <Col md={{ size: 3, offset: 4 }} sm="12"> 
         {Utility.canAccess("staff", "add") ?
          <Fragment> <Button color="secondary" className='float-right' onClick={createStaff}
          >Add Staff</Button>{' '}</Fragment>
          :''}
           </Col>
           </Row>
         </CardHeader>
         <CardBody>
         <Row>
           
           <Col md="12" sm="12" className='mt-2'>
             <StaffList canDel={canDel} canModify={canModify} data={users} setMode={setMode} setACL={assignACL} setId={setId} setLogin={toggleLogin} toggle={handleClose} removeData={removeUser} rowData={setRowData} /> 
           </Col>
         </Row>
         <AddStaff mode={mode} open={modal} handleClose={handleClose} initial_data={rowData} />  
         <AddLogin open={lmodal}  handleClose={toggleLogin} initial_data={rowData} />
         <RoleForm open={acl} handleClose={assignACL} id={id} initial_data={rowData}  />
         </CardBody>
       </Card>
   
   </Fragment>  

    )
}

export default observer(Staff);