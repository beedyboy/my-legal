import React, { useEffect, useState, useContext, Fragment } from 'react'
import dataHero from 'data-hero';
import BranchStore from '../../../stores/BranchStore';
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react';
const schema = {
  name:  {
      isEmpty: false,
      min: 1,
      message: 'A valid branch name is required'
    },
    address:  {
      min: 5,
      message: 'Address is required'
    } 
}; 
const AddBranch = ({mode, open, handleClose, initial_data}) => {
  const branchStore = useContext(BranchStore);
  const { createBranch, updateBranch, sending, close, confirmName, exist } = branchStore;  
  const [title, setTitle]  = useState('Add Branch');
    const [formState, setFormState] = useState({ 
     values: {  id: '', name: '',  email: '', phone: '',  address: ''},
      touched: {},
        errors: {}
      });
  useEffect(() => {
    if(mode === "Edit") {
        setTitle('Edit Branch');
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
   useEffect(() => {
     if(close === true) {
      resetForm();
      handleClose(); 
     } 
   }, [close])  
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
  if(event.target.name === 'name' && event.target.value.length >= 2) { 
    confirmName(event.target.value);
  }   
}
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  

const handleSubmit = e => {
    e.preventDefault();
    mode === 'Add'? createBranch(formState.values) : updateBranch(formState.values);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values,  id: '', name: '',  email: '', phone: '',  address: ''},
      touched: {},
      errors: {}
    }))
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
                <FormGroup>
                  <Label for="deptName">Branch Name</Label>
                  <Input
                  type="text" 
                  value={formState.values.name || ''}
                  name="name"
                  id="deptName"
                  onChange={handleChange} 
                  placeholder="Branch Name" 
                  invalid={hasError('name') || exist}
                  />
                   <FormFeedback>  
                        { hasError('name') ? 'Name field must be a minimum of 2 characters' : null } 
                        <p> { exist ? 'This branch already exist' : null}</p>
                    </FormFeedback>
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
        <Button color="primary" disabled={!formState.isValid || sending || exist}  type="submit">
        {sending ? (
            <span> Saving data  <i className="fa fa-spinner"></i></span>
            ): 'Save changes'}
        </Button>
    </ModalFooter>
      </form>
</Modal>
          
     
              
    </Fragment >
    )
}

export default observer(AddBranch)
