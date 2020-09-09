import React, { Fragment, useContext, useState, useEffect } from 'react'
import{ Button,  FormGroup, Label, Row, Col } from 'reactstrap';  
import { observer } from 'mobx-react';
import dataHero from 'data-hero'; 
import ConversationStore from '../../stores/ConversationStore';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const schema = { 
    description:  {
        isEmpty: false,
        min: 1,
      message: 'Description is required'
    }  
}; 

const AddConversation = ({id, respondent}) => {
    const convoStore = useContext(ConversationStore);
  const { createConversation, sending, close } = convoStore;   
    const [formState, setFormState] = useState({ 
     values: {  id: '', respondent: respondent, description: '', ticket_id: id},
      touched: {},
        errors: {}
      }); 

  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
      ...formState,
      isValid: errors.description.error ?  false: true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
     if(close === true) {
      resetForm();
      // handleClose(); 
     } 
   }, [close])  
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
   createConversation(formState.values);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values,  respondent: respondent, description: '', ticket_id: id},
      touched: {},
      errors: {}
    }))
  }
     return (
        <Fragment>
               <form noValidate autoComplete="off"  onSubmit={handleSubmit}> 
          <Row>
              <Col md="12"> {respondent}
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
        <Button color="primary" disabled={!formState.isValid || sending }  type="submit">
        {sending ? (
            <span> Saving data  <i className="fa fa-spinner"></i></span>
            ): 'Save changes'}
        </Button> 
      </form>  
     
              
    </Fragment >
    )
}
export default observer(AddConversation)
