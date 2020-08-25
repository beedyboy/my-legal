import React, { useEffect, useState, useContext, Fragment } from 'react'
import dataHero from 'data-hero'; 
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, CardFooter, Row, Col } from 'reactstrap';  
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { observer } from 'mobx-react';
import TicketStore from '../../../stores/TicketStore';
const schema = {
  name:  {
      isEmpty: false,
      min: 1,
      message: 'Subject is required'
    },
    category:  {
        isEmpty: false,
        min: 1,
        message: 'Category is required'
      },
    description:  {
      min: 5,
      message: 'Description cannot be empty'
    } 
};
 

const CreateTicket = () => {
    const branchStore = useContext(TicketStore);
    const { createTicket, sending, saved, toggleClose} = branchStore;   
 
      const [formState, setFormState] = useState({ 
       values: {  id: '', name: '', category: '',  email: '', staff_id: '',  requester: 'Staff', priority: 'Low',  description: ''},
        touched: {},
          errors: {}
        }); 
    useEffect(() => {
      const errors = dataHero.validate(schema, formState.values);  
      setFormState(formState => ({
        ...formState,
        isValid: errors.name.error || errors.category.error || errors.description.error ?  false: true,
        errors: errors || {}
      }));
    }, [formState.values]);
     useEffect(() => {
       if(saved === true) {
        resetForm();
        toggleClose(); 
       } 
     }, [saved])  
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

  const onEditorStateChange = (e, editor) => {
    const data = editor.getData(); 
    setFormState(state => ({
        ...formState,
        values: {
          ...formState.values,
         description: data
        },
        touched: {
          ...formState.touched,
          description: true
        }
    }));
      // console.log('data', data);
  }
  const hasError = field =>
        formState.touched[field] && formState.errors[field].error;  
  
  const handleSubmit = e => {
      e.preventDefault();
      createTicket(formState.values);
    }
    const resetForm = () => {
      setFormState(prev => ({
        ...prev,
        values: { ...prev.values, id: '', name: '', category: '',  email: '', staff_id: '',  requester: 'Staff', priority: 'Low',  description: ''},
        touched: {},
        errors: {}
      }))
    }
    return (
        <Fragment>
            <Row>
                <Col md="12">
                <form noValidate autoComplete="off"  onSubmit={handleSubmit}>
                    <Card>
                    <CardBody> 
                        <Row>
                            <Col md="12"> 
                                <FormGroup>
                                <   Label for="name">Subject</Label>
                                    <Input
                                    type="text" 
                                    value={formState.values.name || ''}
                                    name="name" 
                                    onChange={handleChange} 
                                    placeholder="Ticket Subject" 
                                    invalid={hasError('name')}
                                    />
                                    <FormFeedback>  
                                    { hasError('name') ? formState.errors.name.message : null }  
                                    </FormFeedback>
                                </FormGroup>  
                            </Col>  
                        </Row>
                        <Row>
                            <Col md="4">
                            <FormGroup>
                            <Label for="category">Related Services</Label>
                            <Input
                            type="select" 
                            value={formState.values.category || ''}
                            name="category" 
                            onChange={handleChange} 
                            placeholder="Related Services"
                            >
                            <option value="">Select One</option>
                                <option value="Asset">Asset</option>
                                <option value="Order">Order</option> 
                            </Input>
               </FormGroup>  
                            </Col>
                            <Col md="4">
                            <FormGroup>
                            <Label for="priority">Priority</Label>
                            <Input
                            type="select" 
                            value={formState.values.priority || ''}
                            name="priority" 
                            onChange={handleChange}  
                            > 
                                <option value="High">High</option>
                                <option value="Medium">Medium</option> 
                                <option value="Low">Low</option> 
                            </Input>
               </FormGroup>  
                            </Col>
                              
                        <Col md="4"> 
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
             </Row>
                <Row>
                    <Col md="12">  
                        <FormGroup className={
                            hasError('description') ? 'has-danger' : null} >
                            <Label for="description">Description</Label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={formState.values.description}
                                // config={configuration}
                                onChange={onEditorStateChange}  />
                        </FormGroup>   
                    </Col>
                </Row>
                    </CardBody>
                    <CardFooter>
                     
                    <Button color="primary" disabled={!formState.isValid || sending }  type="submit">
                    {sending ? (
                        <span> Saving data  <i className="fa fa-spinner"></i></span>
                        ): 'Submit Ticket'}
                    </Button>
                    </CardFooter>
                </Card> 
                </form>
                </Col>

            </Row>
        </Fragment>
    )
}

export default observer(CreateTicket);
