import React, { useEffect, useState, useContext, Fragment } from 'react' 
import dataHero from 'data-hero'; 
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react';
import Utility from '../../../services/UtilityService'; 
import OrderStore from '../../../stores/OrderStore';
const schema = {
  fullname:  {
        isEmpty: false,
        min: 1,
        message: 'Name is required'
    }

}; 

const CheckoutForm = ({ open, toggle, checkout, sending, ckclose, toggleCKClose}) => {
  //   const ordStore = useContext(OrderStore);
  // const { checkout, sending, ckclose, toggleCKClose } = ordStore;  
  const [title]  = useState('Checkout Form');
    const [formState, setFormState] = useState({ 
     values: {  
       order_no: Utility.get('receiptNumber'),
       fullname: '',
       email: '', 
       phone: '',  
       status: 'UNPAID',
       respondent: 'UNREGISTERED' 
      },
      touched: {},
        errors: {}
      });  
   
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
      ...formState,
      isValid: errors.fullname.error ?  false: true,
      errors: errors || {}
    }));
  }, [formState.values]);
   useEffect(() => {
     if(ckclose === true) {
      resetForm();
      handleClose(); 
     } 
   }, [ckclose])  
const handleClose = () => {
  toggleCKClose();
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
}
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  

const handleSubmit = e => {
    e.preventDefault();
    checkout(formState.values);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values,
      order_no: Utility.get('receiptNumber'),
      fullname: '',
      email: '', 
      phone: '',  
      status: 'UNPAID',
      respondent: 'UNREGISTERED' 
    },
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
                  <Label for="fullname">Fullname</Label>
                  <Input
                  type="text" 
                  value={formState.values.fullname || ''}
                  name="fullname" 
                  onChange={handleChange} 
                  placeholder="Fullname" 
                  invalid={hasError('fullname')}
                  />
                   <FormFeedback>  
                        { hasError('fullname') ? formState.errors.fullname.message : null } 
                        
                    </FormFeedback>
                    </FormGroup>  
              </Col>

              <Col md="12"> 
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                    type="number" 
                    value={formState.values.phone || ''}
                    name="phone"
                    id="phone"
                    onChange={handleChange} 
                    placeholder="Phone"
                    />
               </FormGroup>  
              </Col>               
         
                  </Row>
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
            <span> Transaction processing  <i className="fa fa-spinner"></i></span>
            ): 'Checkout'}
        </Button>
    </ModalFooter>
      </form>
</Modal>
          
     
              
    </Fragment >
    )
}

export default observer(CheckoutForm);
