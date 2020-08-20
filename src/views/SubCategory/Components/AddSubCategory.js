import React, { useEffect, useState, useContext, Fragment } from 'react'
import dataHero from 'data-hero'; 
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react'; 
import CategoryStore from '../../stores/CategoryStore';
import SubCategoryStore from '../../../stores/SubCategoryStore';
const schema = {
  cat_id:  {
      isEmpty: false,
      min: 1,
      message: 'Category is required'
    },
  name:  {
      isEmpty: false,
      min: 1,
      message: 'Name is required'
    } 
}; 
const AddSubCategory = ({mode, open, handleClose, initial_data}) => {
  const catStore = useContext(CategoryStore);
  const subStore = useContext(SubCategoryStore); 
  const { info: categories } = catStore; 
  const { createSubCat, updateSubCat, sending, close, exist, confirmName } = subStore;  
  const [title, setTitle]  = useState('Add SubCategory');
    const [formState, setFormState] = useState({ 
     values: {  id: '', name: '', cat_id: '', description: ''},
      touched: {},
        errors: {}
      });
  useEffect(() => {
    if(mode === "Edit") {
        setTitle('Edit SubCategory');
      let shouldSetData =  typeof initial_data !== 'undefined' ? true : false; 
    if (shouldSetData) {  
    const data = initial_data; 
    setFormState(state => ({
      ...state, 
    values:  {
      ...state.values, id: data && data.id,
      name: data && data.name,
      cat_id: data && data.cat_id, 
      description: data && data.description
      }
    })); 
    }
    } 
    return () => {
      setFormState(prev => ({
        ...prev,
      values: { 
        ...prev.values, id: '', name: '', cat_id: '', description: ''}
      }))
    }
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
      ...formState,
      isValid: errors.name.error ||  errors.cat_id.error ?  false: true,
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
  if(event.target.name === "name" && formState.values.cat_id.length > 0) {
    confirmName(formState.values.cat_id, event.target.value);
  }
   
}
const hasError = field => formState.touched[field] && formState.errors[field].error;  

const handleSubmit = e => {
    e.preventDefault();
    mode === 'Add'? createSubCat(formState.values) : updateSubCat(formState.values);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values,  id: '',  name: '', cat_id: '', description: ''},
      touched: {
        ...formState.touched,
        name: false, 
        cat_id: false,
        description: false
      },
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
              <FormGroup className={
            hasError('cat_id') ? 'has-danger' : null} >
            <Label for="cat_id">Category</Label>
            <Input
              type="select" 
              value={formState.values.cat_id || ''}
              name="cat_id"
              id="cat_id"
              invalid={hasError('cat_id')}
              onChange={handleChange}>
                <option value="">select</option>
                {categories && categories.map(category => (
                  <option value={category.id} key={category.id}>{category.name}</option>
                ))}
              </Input>
              <FormFeedback>
                {
                hasError('cat_id') ? formState.errors.cat_id && formState.errors.cat_id.message : null
                } 
                    </FormFeedback>
          </FormGroup> 
              </Col>
              <Col md="12"> 
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                    type="text" 
                    value={formState.values.name || ''}
                    name="name"
                    id="name"
                    onChange={handleChange} 
                    placeholder="SUb Category Name"
                    invalid={ hasError('name') || exist}
                    />
                  <FormFeedback>
                    {  
                    hasError('name') ? formState.errors.name && formState.errors.name.message : null
                      } 
                      <p> { exist ? 'Sub category already exist' : null}</p>
                    </FormFeedback>
               </FormGroup>  
              </Col>
              <Col md="12"> 
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input
                    type="textarea" 
                    value={formState.values.description || ''}
                    name="description"
                    id="description"
                    onChange={handleChange} 
                    placeholder="Enter Description"
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
        <Button color="primary" disabled={!formState.isValid || exist || sending}  type="submit">
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

export default observer(AddSubCategory)
