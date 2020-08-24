import React, { Fragment, useContext, useState, useEffect } from 'react'
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react';
import dataHero from 'data-hero';
import StockStore from '../../stores/StockStore';
const schema = {
  stock_name:  {
      isEmpty: false,
      min: 1,
      message: 'A valid name is required'
    },
    price:  {
        isEmpty: false,
        min: 1,
      message: 'Address is required'
    } ,
    quantity:  {
        isEmpty: false,
        min: 1,
      message: 'Quantity is required'
    }
}; 

const AddStock = ({id, mode, open, handleClose, initial_data}) => {
    const stockStore = useContext(StockStore);
  const { createStock, updateStock, sending, close } = stockStore;  
  const [title, setTitle]  = useState('Add Stock');
    const [formState, setFormState] = useState({ 
     values: {  id: '', stock_name: '',  quantity: '', expiry: '',  price: '', product_id: id},
      touched: {},
        errors: {}
      }); 
  useEffect(() => {
    if(mode === "Edit") {
        setTitle('Edit Stock');
      let shouldSetData =  typeof initial_data !== 'undefined' ? true : false; 
    if (shouldSetData) {  
    const data = initial_data; 
    setFormState(state => ({
      ...state, 
    values:  {
      ...state.values,
      id: data && data.id,
      price: data && data.price,
      expiry: data && data.expiry,
      quantity: data && data.quantity,
      stock_name: data && data.stock_name, 
      product_id: id }
    })); 
    }
    } 
    return () => {
      setFormState(prev => ({
        ...prev,
      values: { 
        ...prev.values,  id: '', stock_name: '',  quantity: '', expiry: '',  price: ''}
      }))
    }
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
      ...formState,
      isValid: errors.stock_name.error  || errors.price.error || errors.quantity.error ?  false: true,
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
}
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  

const handleSubmit = e => {
    e.preventDefault();
    mode === 'Add'? createStock(formState.values) : updateStock(formState.values);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values,   id: '', stock_name: '',  quantity: '', expiry: '',  price: '', product_id: ''},
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
                  <Label for="deptName">Stock Name</Label>
                  <Input
                  type="text" 
                  value={formState.values.stock_name || ''}
                  name="stock_name" 
                  onChange={handleChange} 
                  placeholder="Stock Name" 
                  invalid={hasError('stock_name')}
                  />
                   <FormFeedback>  
                        { hasError('stock_name') ? formState.errors.stock_name.message : null }  
                    </FormFeedback>
                    </FormGroup>  
              </Col>

              <Col md="12"> 
                <FormGroup>
                    <Label for="quantity">Quantity</Label>
                    <Input
                    type="text" 
                    value={formState.values.quantity || ''}
                    name="quantity" 
                    onChange={handleChange} 
                    placeholder="Quantity"
                    invalid={hasError('quantity')}
                    />
                     <FormFeedback>  
                          { hasError('quantity') ? formState.errors.quantity.message : null }  
                      </FormFeedback>
               </FormGroup>  
              </Col> 
              <Col md="12"> 
                <FormGroup>
                        <Label for="price">Price</Label>
                        <Input
                        type="text" 
                        value={formState.values.price || ''}
                        name="price"
                        id="price"
                        onChange={handleChange} 
                        placeholder="Enter price"
                        invalid={hasError('price')}
                        />
                         <FormFeedback>  
                              { hasError('price') ? formState.errors.price.message : null }  
                          </FormFeedback>
                    </FormGroup>  
              </Col>
              <Col md="12"> 
                <FormGroup>
                    <Label for="expiry">Expiry</Label>
                    <Input
                    type="date" 
                    value={formState.values.expiry || ''}
                    name="expiry" 
                    onChange={handleChange} 
                    placeholder="Expiry"
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
        <Button color="primary" disabled={!formState.isValid || sending }  type="submit">
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
export default observer(AddStock)
