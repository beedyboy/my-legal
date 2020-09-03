import React, { useContext, useState, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap'
import BranchStore from '../../stores/BranchStore';
import AddBranch from './Components/AddBranch';
import BranchList from './Components/BranchList'; 

const Branch = () => { 
  const branchStore = useContext(BranchStore);
  const { info:branches, removeBranch, toggleClose} = branchStore;  
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState(); 
  const [modal, setModal] = useState(false);   
  const handleClose = () => {
    setModal(!modal);  
    toggleClose()
  }
  const createBranch = () => {
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
             <h5>Branch Management</h5>
          
           </Col>
           <Col md={{ size: 3, offset: 4 }} sm="12"> 
           <Button color="secondary" className='float-right' onClick={createBranch}
           >Add Branch</Button>{' '}
           </Col>
           <Col md="12" sm="12" className='mt-2'>
           <BranchList  data={branches} setMode={setMode} toggle={handleClose} removeData={removeBranch} rowData={setRowData} /> 
            
           </Col>
         </Row>
         <AddBranch mode={mode} open={modal} handleClose={handleClose} initial_data={rowData} />  

         </CardBody>
       </Card>
   
   </Fragment>  

    )
}

export default observer(Branch);