import React, { useEffect, useState, useContext, Fragment } from 'react'
import dataHero from 'data-hero'; 
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react';
import BranchStore from '../../../stores/BranchStore';
import UserStore from '../../../stores/UserStore';
const schema = {
  firstname:  {
      isEmpty: false,
      min: 1,
      message: 'Firstname is required'
    },
  lastname:  {
      isEmpty: false,
      min: 1,
      message: 'Lastname is required'
    },
    email:  {
      isEmpty: false,
      min: 5,
      message: 'A valid email is required'
    },
    branch_id:  {
      isEmpty: false,
      message: 'User must belong to a branch'
    } 
}; 
const AddStaff = ({mode, open, handleClose, initial_data}) => {
  const staffStore = useContext(UserStore);
  const branchStore = useContext(BranchStore);
  const { info: branches } = branchStore;  
  const { createStaff, updateStaff, sending } = staffStore;  
  const [title, setTitle]  = useState('Add Staff');
    const [formState, setFormState] = useState({ 
     values: {  id: '', firstname: '', lastname: '',  email: '', branch_id: '', phone: '',  address: ''},
      touched: {},
        errors: {}
      });
  useEffect(() => {
    if(mode === "Edit") {
        setTitle('Edit Staff');
      let shouldSetData =  typeof initial_data !== 'undefined' ? true : false; 
    if (shouldSetData) {  
    const data = initial_data; 
    setFormState(state => ({
      ...state, 
    values:  {
      ...state.values, id: data && data.id,
      firstname: data && data.firstname,
      lastname: data && data.lastname,
      branch_id: data && data.branch_id,
      email: data && data.email,
      phone: data && data.phone, 
      address: data && data.address
      }
    })); 
    }
    } 
    return () => {
      setFormState(prev => ({
        ...prev,
      values: { 
        ...prev.values, id: '', firstname: '', lastname: '', branch_id: '',  email: '', phone: '',  address: ''}
      }))
    }
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
      ...formState,
      isValid: errors.firstname.error || errors.lastname.error || errors.email.error || errors.branch_id.error ?  false: true,
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
const hasError = field => formState.touched[field] && formState.errors[field].error;  

const handleSubmit = e => {
    e.preventDefault();
    mode === 'Add'? createStaff(formState.values) : updateStaff(formState.values);
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
                        hasError('firstname') ? 'has-danger' : null} >
                        <Label for="deptName">FirstName</Label>
                        <Input
                        type="text" 
                        value={formState.values.firstname || ''}
                        name="firstname"
                        id="firstname"
                        onChange={handleChange} 
                        placeholder="FirstName"
                        invalid={ hasError('firstname')}
                        />
                        <FormFeedback>
                        {
                        hasError('firstname') ? formState.errors.firstname && formState.errors.firstname.message : null
                        } 
                        </FormFeedback>
                    </FormGroup>  
              </Col>
              <Col md="12"> 
                <FormGroup  className={
                        hasError('lastname') ? 'has-danger' : null} >
                        <Label for="deptName">LastName</Label>
                        <Input
                        type="text" 
                        value={formState.values.lastname || ''}
                        name="lastname"
                        id="lastname"
                        onChange={handleChange} 
                        placeholder="LastName"
                        invalid={ hasError('lastname')}
                        />
                        <FormFeedback>
                        {
                        hasError('lastname') ? formState.errors.lastname && formState.errors.lastname.message : null
                        } 
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
                    invalid={ hasError('email')}
                    />
                  <FormFeedback>
                    {
                    hasError('email') ? formState.errors.email && formState.errors.email.message : null
                    } 
                    </FormFeedback>
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
            hasError('branch_id') ? 'has-danger' : null} >
            <Label for="branch_id">Branch</Label>
            <Input
              type="select" 
              value={formState.values.branch_id || ''}
              name="branch_id"
              id="branch_id"
              invalid={hasError('branch_id')}
              onChange={handleChange}>
                <option value="">select</option>
                {branches && branches.map(branch => (
                  <option value={branch.id} key={branch.id}>{branch.name}</option>
                ))}
              </Input>
              <FormFeedback>
                {
                hasError('branch_id') ? formState.errors.branch_id && formState.errors.branch_id.message : null
                } 
                    </FormFeedback>
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
        <Button color="primary" disabled={!formState.isValid}  type="submit">
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

export default observer(AddStaff)
