import React, { useEffect, useState, useContext, Fragment } from 'react'
import dataHero from 'data-hero';
import AssetStore from '../../../stores/AssetStore';
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react';
import CategoryStore from '../../../stores/CategoryStore';
import SubCategoryStore from '../../../stores/SubCategoryStore';
const schema = {
  name:  {
      isEmpty: false,
      min: 1,
      message: 'Asset name is required'
    },
    cat_id:  {
      isEmpty: false,
      min: 1,
      message: 'Category is required'
    },
    sub_id:  {
      isEmpty: false,
      min: 1,
      message: 'Sub Category is required'
    },
    purchased_price:  {
      isEmpty: false,
      message: 'Purchased price is required'
    } 
}; 
 

const AddAsset = ({mode, open, handleClose, initial_data}) => {
  const deptStore = useContext(AssetStore);
  const catStore = useContext(CategoryStore);
  const subStore = useContext(SubCategoryStore);
  const { createAsset, updateAsset, sending } = deptStore;  
  const { info:categories } = catStore; 
  const { getSubByCatId, catsubs, loading } = subStore;
  const [title, setTitle]  = useState('Add Asset');
  const [subCategories, setSubCategories]  = useState([]);
    const [formState, setFormState] = useState({ 
     values: {  id: '', name: '', cat_id: '', sub_id: '',  purchased_price: '', serial: '', condition: '',  description: '', purchased_date: ''},
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
      name: data && data.title,
      condition: data && data.condition,
      cat_id: data && data.cat_id,
      sub_id: data && data.sub_id, 
      purchased_price: data && data.purchased_price,
      purchased_date: data && data.purchased_date,
      serial: data && data.serial, 
      description: data && data.description  }
    })); 
    }
    } 
    // return () => {
    //   setFormState(prev => ({
    //     ...prev,
    //   values: { 
    //     ...prev.values, id: '', name: '', cat_id: '', sub_id: '',  purchased_price: '', purchased_date: '', serial: '', condition: '',  description: ''}
    //   }))
    // }
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
      ...formState,
      isValid: errors.name.error || errors.purchased_price.error ?  false: true,
      errors: errors || {}
    }));
  }, [formState.values]);
  
  useEffect(() => {
    setSubCategories(state => ({...state, subCategories: catsubs}))
    // return () => {
    //   setSubCategories([])
    // }
  }, [catsubs])
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
   if(event.target.name === 'cat_id' && event.target.value.length > 0) {
    getSubCategory(event.target.value);
   }
}
const getSubCategory = cat_id => {
  setFormState(prev => ({
    ...prev,
    values: {
      ...prev.values,
      sub_id: ''
    }
  }))
  setSubCategories([])
  getSubByCatId(parseInt(cat_id));
}
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  

const handleSubmit = e => {
    e.preventDefault();
    mode === 'Add'? createAsset(formState.values) : updateAsset(formState.values);
  }
console.log({subCategories})
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
                        <Label for="name">Asset Name</Label>
                        <Input
                        type="text" 
                        value={formState.values.name || ''}
                        name="name"
                        id="name"
                        onChange={handleChange} 
                        placeholder="Asset Name"
                        />
                    </FormGroup>  
              </Col> 
              <Col md="12"> 
              <FormGroup>
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
              <FormGroup >
            <Label for="sub_id">Sub</Label>
            <Input
              type="select" 
              value={formState.values.sub_id || ''}
              name="sub_id"
              id="sub_id"
              invalid={hasError('sub_id')}
              onChange={handleChange}>
                <option value="">select</option>
                {/* {subCategories && subCategories.map(sub => (
                  <option value={sub.id} key={sub.id}>{sub.sub_name}</option>
                ))} */}
              </Input>
              <FormFeedback>
                {
                hasError('sub_id') ? formState.errors.sub_id && formState.errors.sub_id.message : null
                } 
                    </FormFeedback>
          </FormGroup> 
              </Col>
              <Col md="12"> 
                <FormGroup>
                    <Label for="serial">Serial</Label>
                    <Input
                    type="text" 
                    value={formState.values.serial || ''}
                    name="serial"
                    id="serial"
                    onChange={handleChange} 
                    placeholder="Serial"
                    />
               </FormGroup>  
              </Col>
             
              <Col md="12"> 
                <FormGroup>
                    <Label for="purchased_price">Price</Label>
                    <Input
                      type="text" 
                      value={formState.values.purchased_price || ''}
                      name="purchased_price"
                      id="purchased_price"
                      onChange={handleChange} 
                      placeholder="Price"
                    />
               </FormGroup>  
              </Col>
              <Col md="12"> 
                <FormGroup>
                    <Label for="purchased_date">Date</Label>
                    <Input
                      type="date" 
                      value={formState.values.purchased_date || ''}
                      name="purchased_date"
                      id="purchased_date"
                      onChange={handleChange} 
                      placeholder="Purchased Date"
                    />
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
