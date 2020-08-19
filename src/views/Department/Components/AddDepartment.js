import React, { useEffect, useLayoutEffect, useState, useContext, Fragment } from 'react'
import dataHero from 'data-hero';
import DepartmentStore from '../../../stores/DepartmentStore';
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react';

const AddDepartment = ({mode, open, handleClose, initial_data}) => {
  const deptStore = useContext(DepartmentStore);
  const { createDept, updateDept, close, sending, exist, confirmName } = deptStore; 
  const [hasError, setHasError]  = useState(false);
  const [title, setTitle]  = useState('Add Department');
    const [formState, setFormState] = useState({ 
        id: '', name: '',  description: ''
      });
    useLayoutEffect(() => {
    if(mode === "Edit") {
        setTitle('Edit Department');
      let shouldSetData =  typeof initial_data !== 'undefined' ? true : false; 
    if (shouldSetData) {  
    const data = initial_data; 
    setFormState(state => ({
      ...state, 
      id: data && data.id,
      name: data && data.name, 
      description: data && data.description  
    })); 
    }
    }  return () => {
        setFormState(prev => ({
            ...prev,
            id: '', name: '',  description: ''
        }))
    }
  }, [initial_data, mode]);
  useEffect(() => { 
    const error = dataHero.validator(formState.name, 'min', 2);
    setHasError(error); 
    setFormState(formState => ({
      ...formState,
      isValid: !error 
    })); 
  }, [formState.name]);  
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
      [event.target.name]:  event.target.value 
    })); 
    if(event.target.name === 'name' && event.target.value.length >= 2) {
      confirmName(event.target.value);
    }
  }
  const handleSubmit = e => {
    e.preventDefault();
    mode === 'Add'? createDept(formState) : updateDept(formState);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      id: '', name: '',  description: ''
    }))
  }
  const closeBtn = <Button className="close" onClick={e => handleClose()}>&times;</Button>; 
    return (
        <Fragment>
        <Modal isOpen={open} toggle={e => handleClose()}>
            <ModalHeader toggle={e => handleClose()} close={closeBtn}>{title}</ModalHeader>
         <form noValidate autoComplete="off"  onSubmit={handleSubmit}>
      
    <ModalBody>
    <Card>
      <CardBody> 
          <Row>
              <Col md="12"> 
                <FormGroup>
                  <Label for="deptName">Department Name</Label>
                  <Input
                  type="text" 
                  value={formState.name || ''}
                  name="name"
                  id="deptName"
                  onChange={handleChange} 
                  placeholder="Department Name"
                  invalid={hasError || exist}
                  />
                   <FormFeedback>  
                        { hasError ? 'Name field must be a minimum of 2 characters' : null } 
                        <p> { exist ? 'Department name already exist' : null}</p>
                    </FormFeedback>
                </FormGroup>  
                   
              </Col>

              <Col md="12"> 
                <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                        type="textarea" 
                        value={formState.description || ''}
                        name="description"
                        id="description"
                        onChange={handleChange} 
                        placeholder="Enter description"
                        />
                    </FormGroup>  
              </Col>
          </Row>
     </CardBody>
    </Card> 
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={e => handleClose()}>
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

export default observer(AddDepartment)
