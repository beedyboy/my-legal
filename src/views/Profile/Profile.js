import React, { useContext, useState, Fragment, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap' 
import UserStore from '../../stores/UserStore'; 
import ProfileDetails from './Components/ProfileDetails'; 
import EditProfile from './Components/EditProfile';

const Profile = () => { 
  const userStore = useContext(UserStore);
  const { profiles, getProfile, updateProfile, sending} = userStore;  
  const [edit, setEdit] = useState(false);    
  useEffect(() => {
    getProfile(); 
  }, [])
   
  const toggle = () => {
    setEdit(!edit);  
  }  
    return( 
      <Fragment>
      <Card className='mt-2'>
         <CardHeader>
           <h5>Profile Management</h5>
         </CardHeader>
         <CardBody>
         <Row> 
            
           <Col md="12" sm="12" className='mt-2'>
             {edit ? 
             <> <EditProfile sending={sending} submit={updateProfile} edit={edit} toggle={toggle} initial_data={profiles} /></>
            : 
              <> <ProfileDetails edit={edit} toggle={toggle} data={profiles} /></>
            }
            
           </Col>
         </Row>
        
         </CardBody>
       </Card>
   
   </Fragment>  

    )
}

export default observer(Profile);