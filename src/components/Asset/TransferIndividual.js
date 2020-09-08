import React, { Fragment, useContext, useState, useEffect } from 'react'
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import Select from 'react-select'; 
import dataHero from 'data-hero'; 
import { observer } from "mobx-react";
import DepartmentStore from '../../stores/DepartmentStore'; 
import AllocationStore from '../../stores/AllocationStore';
import UserStore from '../../stores/UserStore';
const schema = {
  staff_id:  {
      isEmpty: false,
      min: 1,
      message: 'Staff is required'
    },
    dept_id:  {
        isEmpty: false,
        min: 1,
      message: 'Department is required'
    } 
};     
const TransferIndividual = ({id, mode, open, handleClose, initial_data}) => {
    const deptStore = useContext(DepartmentStore);
    const userStore = useContext(UserStore);
    const allocStore = useContext(AllocationStore);
  const { fetchDepartments, deptSelect: departments } = deptStore;  
  const { fetchUsers, userSelect: users } = userStore;  
  const { createIndividual, updateIndividual, sending, close, toggleClose } = allocStore;  
  const [title, setTitle]  = useState('Add Individual Allocation');
    const [formState, setFormState] = useState({ 
     values: {  id: '', staff_id: '',  quantity: '', note: '',  dept_id: '', asset_id: id},
      touched: {},
        errors: {}
      }); 
    useEffect(() => {
      fetchDepartments();
      fetchUsers();
    }, [])
  useEffect(() => {
    if(mode === "Edit") {
        setTitle('Edit Individual Allocation');
      let shouldSetData =  typeof initial_data !== 'undefined' ? true : false; 
    if (shouldSetData) {  
    const data = initial_data; 
    setFormState(state => ({
      ...state, 
    values:  {
      ...state.values,
      id: data && data.id,
      dept_id: data && data.dept_id,
      note: data && data.note,
      quantity: data && data.quantity,
      staff_id: data && data.staff_id, 
      asset_id: id
     }
    })); 
    }
    } 
    return () => {
      setFormState(prev => ({
        ...prev,
      values: { 
        ...prev.values,  id: '', asset_id: '', staff_id: '',  quantity: '', note: '',  dept_id: ''}
      }))
    }
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
      ...formState,
      isValid: errors.staff_id.error  || errors.dept_id.error ?  false: true,
      errors: errors || {}
    }));
  }, [formState.values]);
   useEffect(() => {
     if(close === true) {
      resetForm();
      handleClose(); 
     } 
     return() => {
       toggleClose()
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

const handleStaff = e => {  
  if(e !== null) {
   setFormState(state => ({
     ...state,
     values: {
       ...state.values,
       staff_id: e.value 
     },
     touched: {
       ...state.touched,
     staff_id: true
   }
   }));
  } else {
   setFormState(prev => ({
     ...prev,
     values: {
       ...prev.values,
       staff_id: ''
     }
   }))
  }
 }

const handleDept = e => {  
  if(e !== null) {
   setFormState(state => ({
     ...state,
     values: {
       ...state.values,
       dept_id: e.value 
     },
     touched: {
       ...state.touched,
     dept_id: true
   }
   }));
  } else {
   setFormState(prev => ({
     ...prev,
     values: {
       ...prev.values,
       dept_id: ''
     }
   }))
  }
 }
const hasError = field =>
      formState.touched[field] && formState.errors[field].error;  

const handleSubmit = e => {
    e.preventDefault();
    mode === 'Add'? createIndividual(formState.values) : updateIndividual(formState.values);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values,   id: '', staff_id: '',  quantity: '', note: '',  dept_id: '', asset_id: ''},
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
              <FormGroup >
            <Label for="staff_id">Staff</Label> 
               <Select
                 placeholder="Select Option"
                 name="staff_id"
                 value={users.filter(obj => obj.value === formState.values.staff_id) || ''} 
                 onChange={handleStaff}  
                 isLoading={users && users.length > 0 ? false: true}
                 isClearable={true}
                 options={users} 
             />
              <span className={ hasError('staff_id') ? 'text-danger' : null}>
                {
                hasError('staff_id') ? formState.errors.staff_id && formState.errors.staff_id.message : null
                }  
            </span>
          </FormGroup> 
              </Col> 
              <Col md="12">  
              <FormGroup >
            <Label for="dept_id">Department</Label> 
               <Select
                 placeholder="Select Option"
                 name="dept_id"
                 value={departments.filter(obj => obj.value === formState.values.dept_id) || ''} 
                 onChange={handleDept}  
                 isLoading={departments && departments.length > 0 ? false: true}
                 isClearable={true}
                 options={departments} 
             />
              <span className={ hasError('dept_id') ? 'text-danger' : null}>
                {
                hasError('dept_id') ? formState.errors.dept_id && formState.errors.dept_id.message : null
                }  
            </span>
          </FormGroup> 
              </Col> 
             
              <Col md="12"> 
                <FormGroup>
                    <Label for="note">Note</Label>
                    <Input
                    type="textarea" 
                    value={formState.values.note || ''}
                    name="note" 
                    onChange={handleChange} 
                    placeholder="Note"
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
export default observer(TransferIndividual)
