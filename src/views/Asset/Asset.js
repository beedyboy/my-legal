import React, { useContext, useState, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap'
import AssetStore from '../../stores/AssetStore';
import AddAsset from './Components/AddAsset';
import AssetList from './Components/AssetList';

const Asset = () => { 
  const assetStore=  useContext(AssetStore);
  const { info:assets, removeAsset} = assetStore;  
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState(); 
  const [modal, setModal] = useState(false);   
  const handleClose = () => {
    setModal(!modal);  
  }
  const createAsset = () => {
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
             <h5>Asset Management</h5>
          
           </Col>
           <Col md={{ size: 3, offset: 4 }} sm="12"> 
           <Button color="secondary" className='float-right' onClick={createAsset}
           >Add Asset</Button>{' '}
           </Col>
           <Col md="12" sm="12" className='mt-2'>
             <AssetList  data={assets} setMode={setMode} toggle={handleClose} removeData={removeAsset} rowData={setRowData} /> 
           </Col>
         </Row>
         <AddAsset mode={mode} open={modal} handleClose={handleClose} initial_data={rowData} /> 

       {/* <Modal isOpen={modal} toggle={toggle}>
           <ModalHeader toggle={toggle} close={closeBtn}>{title}</ModalHeader>
           <ModalBody>
               <AddDepartment mode={mode} open={modal}  initial_data={rowData} />
           </ModalBody>
       </Modal>  */}

         </CardBody>
       </Card>
   
   </Fragment>  

    )
}

export default observer(Asset);