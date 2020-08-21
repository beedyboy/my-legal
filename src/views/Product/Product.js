import React, { useContext, useState, Fragment } from 'react';
import { observer } from 'mobx-react';
import { Card, CardBody, CardHeader, Button, Row, Col } from 'reactstrap'
import ProductStore from '../../stores/ProductStore';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';

const Product = () => { 
  const productStore = useContext(ProductStore);
  const { info:products, removeProduct} = productStore;  
  const [mode, setMode] = useState('');
  const [rowData, setRowData] = useState(); 
  const [modal, setModal] = useState(false);   
  const handleClose = () => {
    setModal(!modal);  
  }
  const createProduct = () => {
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
             <h5>Product Management</h5>
          
           </Col>
           <Col md={{ size: 3, offset: 4 }} sm="12"> 
           <Button color="secondary" className='float-right' onClick={createProduct}
           >Add Product</Button>{' '}
           </Col>
           <Col md="12" sm="12" className='mt-2'>
             <ProductList  data={products} setMode={setMode} toggle={handleClose} removeData={removeProduct} rowData={setRowData} /> 
           </Col>
         </Row>
         <AddProduct mode={mode} open={modal} handleClose={handleClose} initial_data={rowData} /> 

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

export default observer(Product);