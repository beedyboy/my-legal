import React, { useContext, useState, Fragment, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Card, CardBody, CardHeader, ButtonGroup, Button, Row, Col, FormGroup, FormFeedback, Label, Input } from 'reactstrap' 
import ReportStore from '../../stores/ReportStore';
import dataHero from 'data-hero';
import moment from 'moment'
import SalesReport from './Components/SalesReport';
const schema = {
  start_date:  {
      isEmpty: false,
      min: 1,
      message: 'Start date is required'
    },
    end_date:  {
      isEmpty: false,
      min: 1,
      message: 'End date is required'
    } 
}; 


const Report = () => { 
  const repStore = useContext(ReportStore);
  const { getSalesReport, sales, searching } = repStore;  
  const [formState, setFormState] = useState({ 
    values: {  start_date: '', end_date: ''},
     touched: {},
       errors: {}
     });
  const [ activeReport, setActiveReport ] = useState('sales');
     useEffect(() => {
      const errors = dataHero.validate(schema, formState.values);  
      setFormState(formState => ({
        ...formState,
        isValid: errors.start_date.error || errors.end_date.error ?  false: true,
        errors: errors || {}
      }));
    }, [formState.values]);
  
    const handleReportTab = data => {
      if(activeReport != data) setActiveReport(data);
    }
const dateFormat = 'YYYY/MM/DD';
const handleChange = event => {
  event.persist();  
  console.log(event.target.value)
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
   getSalesReport(formState.values);
  }
const resetForm = () => {
  setFormState(formState => ({
    ...formState,
    values: {
      ...formState.values,
      start_date: '', end_date: ''},
    touched: {
      ...formState.touched,
      start_date: false, end_date: false
    }
  })); 
} 
    return( 
      <Fragment>
      <Card className='mt-2'>
         <CardHeader>
         </CardHeader>
         <CardBody>
         <Row>
           <Col md="12" sm="12">
             <h5>Report Management</h5> 
           </Col> 
         </Row> 
         <form onSubmit={handleSubmit}> 
         <Row>
         <Col md={{ size: 3}} sm="12"> 
           <FormGroup>
                    <Label for="start_date">Start Date</Label>
                    <Input
                      type="date"  
                      // value={formState.values.start_date || ''}
                      locale="fr"
                      defaultValue={formState.values.start_date? moment(formState.values.start_date, dateFormat): moment()}
            
                      name="start_date"
                      id="start_date"
                      invalid={hasError('start_date')}
                      onChange={handleChange}  
                    />
                     <FormFeedback>
                    {
                    hasError('start_date') ? formState.errors.start_date && formState.errors.start_date.message : null
                    } 
                   </FormFeedback>
               </FormGroup>  
           </Col>
           <Col md={{ size: 3, offset: 4 }} sm="12"> 
           <FormGroup>
                    <Label for="end_date">End Date</Label>
                    <Input
                      type="date" 
                      // value={formState.values.end_date || ''}
                      defaultValue={formState.values.end_date? moment(formState.values.end_date, dateFormat): moment()}
                      name="end_date"
                      id="end_date"
                      invalid={hasError('end_date')}
                      onChange={handleChange}  
                    />
                     <FormFeedback>
                    {
                    hasError('end_date') ? formState.errors.end_date && formState.errors.end_date.message : null
                    } 
                   </FormFeedback>
               </FormGroup>  
           </Col>
               
        <Col md="3" sm="12">
        <Button color="secondary" size="sm" className='float-right' disabled={!formState.isValid || searching} onClick={handleSubmit}>Search Report</Button> 
        </Col>
         </Row>
        
         </form>
        <Row>
        <Col md="12" sm="12" className='mt-2'>
        <ButtonGroup>
          <Button color={activeReport === "sales" ? 'primary' : 'info'} onClick={e => handleReportTab('sales')}>
            Sales Report
          </Button>
          <Button color={activeReport === "asset" ? 'primary' : 'info'} onClick={e => handleReportTab('asset')}>
            Asset Report
          </Button>
        </ButtonGroup>
        <div className="card-block mt-2  border-right"> 
          <div className={activeReport === "sales" ? 'active' : 'd-none'}> 
            <SalesReport data={sales} /> 
          </div>
        </div>  
        </Col>
        </Row>
         </CardBody>
       </Card>
   
   </Fragment>  

    )
}

export default observer(Report);