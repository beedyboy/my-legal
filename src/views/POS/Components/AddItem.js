import React, { useEffect, useState, useContext, Fragment } from 'react'
import OrderStore from '../../../stores/OrderStore';
import dataHero from 'data-hero'; 
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react';
import Utility from '../../../services/UtilityService';
const schema = {
    quantity:  {
        isEmpty: false,
        min: 1,
        message: 'Quantity is required'
    } 
}; 

const AddItem = ({data, open, mode, toggle, initial_data}) => {
    const ordStore = useContext(OrderStore);
  const { createOrder, updateOrder, sending, close } = ordStore;  
  const [title, setTitle]  = useState('Add Item');
    const [formState, setFormState] = useState({ 
     values: {  id: '', stock_id: '', order_no: '', available: '',  quantity: '', item_price: '',  sold_price: '', discount: ''},
      touched: {},
        errors: {}
      });
  useEffect(() => {
    if(mode === "Edit") {
        setTitle('Edit Item');
      let shouldSetData =  typeof initial_data !== 'undefined' ? true : false; 
    if (shouldSetData) {  
    const iniData = initial_data; 
    setFormState(state => ({
      ...state, 
    values:  {
      ...state.values, id: iniData && iniData.id,
      available: iniData && iniData.available,
      stock_id: iniData && iniData.stock_id,
      order_no: iniData && iniData.order_no,
      quantity: iniData && iniData.quantity,
      item_price: iniData && iniData.item_price, 
      sold_price: iniData && iniData.sold_price  }
    })); 
    }
    } 
    return () => {
      setFormState(prev => ({
        ...prev,
      values: { 
        ...prev.values, id: '', stock_id: '', available: '',  quantity: '', item_price: '',  sold_price: ''}
      }))
    }
  }, [initial_data, mode]);
  useEffect(() => {
    if(mode === "Add") {  
    setFormState(state => ({
      ...state, 
    values:  {
      ...state.values,
       stock_id: data && data.stock_id,
      available: data && data.quantity, 
      item_price: data && data.price,
      order_no: Utility.get('receiptNumber')
     }
    }));  
    }  
  }, [data]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
      ...formState,
      isValid: errors.quantity.error ?  false: true,
      errors: errors || {}
    }));
  }, [formState.values]);
   useEffect(() => {
     if(close === true) {
      resetForm();
      handleClose(); 
     } 
   }, [close])  
const handleClose = () => {
    toggle(false);
}
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
//   if(event.target.name === 'name' && event.target.value.length >= 2) {
//     console.log('length', event.target.value.length)
//     confirmName(event.target.value);
//   }   
}
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  

const handleSubmit = e => {
    e.preventDefault();
    mode === 'Add'? createOrder(formState.values) : updateOrder(formState.values);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values,  id: '', stock_id: '', available: '',  quantity: '', item_price: '',  sold_price: '', discount: ''},
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
              <Col md="6">
                  <Row>
                      
              <Col md="12"> 
                <FormGroup>
                  <Label for="quantity">Qty</Label>
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
                    <Label for="discount">Discount</Label>
                    <Input
                    type="number" 
                    value={formState.values.discount || ''}
                    name="discount"
                    id="discount"
                    onChange={handleChange} 
                    placeholder="Discount"
                    />
               </FormGroup>  
              </Col>               
         
                  </Row>
              </Col>
              <Col md="6">
    <p>Available Quantity: {formState.values.available}</p>
    <p>Item Price: {formState.values.item_price}</p>
    <p>Sold Price: {formState.values.sold_price}</p>
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
            <span> Adding Order  <i className="fa fa-spinner"></i></span>
            ): 'Add Order'}
        </Button>
    </ModalFooter>
      </form>
</Modal>
          
     
              
    </Fragment >
    )
}

export default observer(AddItem);
