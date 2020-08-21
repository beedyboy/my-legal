import React, { useEffect, useState, useContext, Fragment } from 'react'
import dataHero from 'data-hero';
import BranchStore from '../../../stores/BranchStore';
import{ Button, Card, CardBody, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react';
const schema = {
  name:  {
      isEmpty: false,
      min: 1,
      message: 'A valid asset name is required'
    },
    address:  {
      min: 5,
      message: 'Address is required'
    } 
}; 
const AddAsset = ({mode, open, handleClose, initial_data}) => {
  const deptStore = useContext(AssetStore);
  const { createAsset, updateAsset, sending } = deptStore;  
  const [title, setTitle]  = useState('Add Asset');
    const [formState, setFormState] = useState({ 
     values: {  id: '', name: '',  email: '', phone: '',  address: ''},
      touched: {},
        errors: {}
      });
  useEffect(() => {
    if(mode === "Edit") {
        setTitle('Edit Asset');
      let shouldSetData =  typeof initial_data !== 'undefined' ? true : false; 
    if (shouldSetData) {  
    const data = initial_data; 
    setFormState(state => ({
      ...state, 
    values:  {
      ...state.values, id: data && data.id,
      name: data && data.name,
      email: data && data.email,
      phone: data && data.phone, 
      address: data && data.address  }
    })); 
    }
    } 
    return () => {
      setFormState(prev => ({
        ...prev,
      values: { 
        ...prev.values, id: '', name: '',  email: '', phone: '',  address: ''}
      }))
    }
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
      ...formState,
      isValid: errors.name.error ?  false: true,
      errors: errors || {}
    }));
  }, [formState.values]);
     
const handleChange = event => {
  event.persist();  
  setFormState(formState => ({
    ...formState,
    values: {
      ...formState.values,
      [event.target.name]: event.target.value
    },
    touched: {
      ...formState.touched,
      [event.target.name]: true
    }
  })); 
   
}
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  

const handleSubmit = e => {
    e.preventDefault();
    mode === 'Add'? createAsset(formState.values) : updateAsset(formState.values);
  }
  const closeBtn = <Button className="close" onClick={handleClose}>&times;</Button>;
    return (
        <Fragment>
        <Modal isOpen={open} toggle={handleClose}>
            <ModalHeader toggle={handleClose} close={closeBtn}>{title}</ModalHeader>
         <form noValidate autoComplete="off"  onSubmit={handleSubmit}>
      
    <ModalBody>
    <Card>
      <CardBody> 
          <Row>
              <Col md="12"> 
                <FormGroup  className={
                        hasError('name') ? 'has-danger' : null} >
                        <Label for="deptName">Branch Name</Label>
                        <Input
                        type="text" 
                        value={formState.values.name || ''}
                        name="name"
                        id="deptName"
                        onChange={handleChange} 
                        placeholder="Asset Name"
                        />
                    </FormGroup>  
              </Col>

              <Col md="12"> 
                <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input
                    type="text" 
                    value={formState.values.email || ''}
                    name="email"
                    id="email"
                    onChange={handleChange} 
                    placeholder="Email Address"
                    />
               </FormGroup>  
              </Col>
              <Col md="12"> 
                <FormGroup>
                    <Label for="phone">Phone Number</Label>
                    <Input
                    type="text" 
                    value={formState.values.phone || ''}
                    name="phone"
                    id="phone"
                    onChange={handleChange} 
                    placeholder="Phone Number"
                    />
               </FormGroup>  
              </Col>
              <Col md="12"> 
                <FormGroup className={
                        hasError('address') ? 'has-danger' : null} >
                        <Label for="address">Address</Label>
                        <Input
                        type="textarea" 
                        value={formState.values.address || ''}
                        name="address"
                        id="address"
                        onChange={handleChange} 
                        placeholder="Enter address"
                        />
                    </FormGroup>  
              </Col>
          </Row>
     </CardBody>
    </Card> 
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
            Close
        </Button> {" "}
        <Button color="primary" disabled={!formState.isValid || sending}  type="submit">
            Save changes
        </Button>
    </ModalFooter>
      </form>
</Modal>
          
     
              
    </Fragment >
    )
}

export default observer(AddAsset)
