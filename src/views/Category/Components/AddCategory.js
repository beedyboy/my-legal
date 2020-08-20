import React, { useEffect, useState, useContext, Fragment } from 'react'
import dataHero from 'data-hero';
import CategoryStore from '../../../stores/CategoryStore';
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react';

const AddCategory = ({mode, open, handleClose, initial_data}) => {
  const catStore = useContext(CategoryStore);
  const { createCat, updateCat, close, sending, exist, confirmName } = catStore; 
  const [hasError, setHasError]  = useState(false);
  const [title, setTitle]  = useState('Add Category');
    const [formState, setFormState] = useState({ 
        id: '', name: '',  description: ''
      });
  useEffect(() => {
    if(mode === "Edit") {
        setTitle('Edit Category');
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
    } 
    return () => {
      setFormState(prev => ({
        ...prev,
        id: '', name: '',  description: ''
      }))
    }
  }, [initial_data, mode]);
  useEffect(() => {
    if(close === true) {
     resetForm();
     handleClose(); 
    } 
  }, [close]) 
  useEffect(() => { 
    const error = dataHero.validator(formState.name, 'min', 2);
    setHasError(error); 
    setFormState(formState => ({
      ...formState,
      isValid: !error,
      errors: error?  'Name field must be a minimum of 2 characters': null
    })); 
  }, [formState.name]);  
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
    mode === 'Add'? createCat(formState) : updateCat(formState);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      id: '', name: '',  description: ''
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
                  <Label for="name">Category Name</Label>
                  <Input
                  type="text" 
                  value={formState.name || ''}
                  name="name"
                  id="name"
                  onChange={handleChange} 
                  placeholder="Category Name" 
                  invalid={hasError || exist}
                  />
                   <FormFeedback>  
                        { hasError ? 'Name field must be a minimum of 2 characters' : null } 
                        <p> { exist ? 'This category already exist' : null}</p>
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

export default observer(AddCategory)
