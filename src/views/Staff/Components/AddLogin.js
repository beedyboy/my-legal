import React, { useEffect, useState, useContext, Fragment } from 'react'
import dataHero from 'data-hero'; 
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react'; 
import UserStore from '../../../stores/UserStore';
const schema = {
  email:  {
      isEmpty: false,
      min: 5,
      message: 'A valid email is required'
    },
    password:  {
      min: 5,
      message: 'Invalid password provided'
    } 
}; 
const AddLogin = ({ open, handleClose, initial_data}) => {
  const staffStore = useContext(UserStore); 
  const { createLogin, closeLogin, sending } = staffStore;  
    const [formState, setFormState] = useState({ 
     values: {  id: '', email: '', password: ''},
      touched: {},
        errors: {}
      });
  useEffect(() => {  
      let shouldSetData =  typeof initial_data !== 'undefined' ? true : false; 
    if (shouldSetData) {  
    const data = initial_data; 
    setFormState(state => ({
      ...state, 
    values:  {
      ...state.values,
       id: data && data.id,  
      email: data && data.email,
      password: data && data.password 
      }
    })); 
    } 
    return () => {
      setFormState(prev => ({
        ...prev,
      values: { 
        ...prev.values, id: '', email: '', password: ''}
      }))
    }
  }, [initial_data]);
  useEffect(() => {
    if(closeLogin === true) {
     resetForm();
     handleClose(); 
    } 
  }, [closeLogin]) 
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
      ...formState,
      isValid: errors.email.error || errors.password.error ?  false: true,
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
    createLogin(formState.values);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values,  id: '', email: '', password: ''},
      touched: {
        ...formState.touched, 
        email: false,
        password: false
      },
      errors: {}
    }))
  }
  const closeBtn = <Button className="close" onClick={handleClose}>&times;</Button>;
    return (
        <Fragment>
        <Modal isOpen={open} toggle={handleClose}>
            <ModalHeader toggle={handleClose} close={closeBtn}> Create Login</ModalHeader>
         <form noValidate autoComplete="off"  onSubmit={handleSubmit}>
      
    <ModalBody>
    <Card>
      <CardBody> 
          <Row> 
              <Col md="12"> 
                <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input
                    type="text" 
                    value={formState.values.email || ''}
                    name="email"
                    id="email"
                    disabled={true}
                    />
               </FormGroup>  
              </Col>
              <Col md="12"> 
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                    type="password" 
                    value={formState.values.password || ''}
                    name="password"
                    id="password"
                    onChange={handleChange} 
                    placeholder="Password"
                    invalid={hasError('password')}
                    />
                    <FormFeedback> 
                        {
                        hasError('password') ? formState.errors.password && formState.errors.password.message : null
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

export default observer(AddLogin)
