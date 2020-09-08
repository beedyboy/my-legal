import React, { Fragment, useContext, useState, useEffect } from 'react'
import{ Button, Card, CardBody, FormGroup, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Row, Col } from 'reactstrap';  
import Select from 'react-select'; 
import { observer } from "mobx-react";
import dataHero from 'data-hero'; 
import DepartmentStore from '../../stores/DepartmentStore';
import BranchStore from '../../stores/BranchStore';
import AllocationStore from '../../stores/AllocationStore';
const schema = {
  branch_id:  {
      isEmpty: false,
      min: 1,
      message: 'Branch is required'
    },
    dept_id:  {
        isEmpty: false,
        min: 1,
      message: 'Department is required'
    } 
};     
const TransferDept = ({id, mode, open, handleClose, initial_data}) => {
    const deptStore = useContext(DepartmentStore);
    const branchStore = useContext(BranchStore);
    const allocStore = useContext(AllocationStore);
  const { fetchDepartments, deptSelect: departments } = deptStore;  
  const { fetchBranch, branchSelect: branches } = branchStore;  
  const { createDept, updateDept, sending, close, toggleClose } = allocStore;  
  const [title, setTitle]  = useState('Add Department Allocation');
    const [formState, setFormState] = useState({ 
     values: {  id: '', branch_id: '',  quantity: '', note: '',  dept_id: '', asset_id: id},
      touched: {},
        errors: {}
      }); 
    useEffect(() => {
      fetchDepartments();
      fetchBranch();
    }, [])
  useEffect(() => {
    if(mode === "Edit") {
        setTitle('Edit Department Allocation');
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
      branch_id: data && data.branch_id, 
      asset_id: id
     }
    })); 
    }
    } 
    return () => {
      setFormState(prev => ({
        ...prev,
      values: { 
        ...prev.values,  id: '', asset_id: '', branch_id: '',  quantity: '', note: '',  dept_id: ''}
      }))
    }
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);  
    setFormState(formState => ({
      ...formState,
      isValid: errors.branch_id.error  || errors.dept_id.error ?  false: true,
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

const handleBranch = e => {  
  if(e !== null) {
   setFormState(state => ({
     ...state,
     values: {
       ...state.values,
       branch_id: e.value 
     },
     touched: {
       ...state.touched,
     branch_id: true
   }
   }));
  } else {
   setFormState(prev => ({
     ...prev,
     values: {
       ...prev.values,
       branch_id: ''
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
    mode === 'Add'? createDept(formState.values) : updateDept(formState.values);
  }
  const resetForm = () => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values,   id: '', branch_id: '',  quantity: '', note: '',  dept_id: '', asset_id: ''},
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
            <Label for="branch_id">Branch</Label> 
               <Select
                 placeholder="Select Option"
                 name="branch_id"
                 value={branches.filter(obj => obj.value === formState.values.branch_id) || ''} 
                 onChange={handleBranch}  
                 isLoading={branches && branches.length > 0 ? false: true}
                 isClearable={true}
                 options={branches} 
             />
              <span className={ hasError('branch_id') ? 'text-danger' : null}>
                {
                hasError('branch_id') ? formState.errors.branch_id && formState.errors.branch_id.message : null
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
export default observer(TransferDept)
