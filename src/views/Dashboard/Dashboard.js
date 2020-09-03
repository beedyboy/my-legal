import React, { Fragment, useContext } from 'react'; 
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'; 
import BranchStore from '../../stores/BranchStore';
import AssetStore from '../../stores/AssetStore';
import ProductStore from '../../stores/ProductStore';
import UserStore from '../../stores/UserStore';
import { observer } from 'mobx-react';
 

const Dashboard = () => { 
const branchStore = useContext(BranchStore);
const assetStore = useContext(AssetStore);
const prodStore = useContext(ProductStore);
const userStore = useContext(UserStore);
const { stats } = branchStore;
const { totalAsset } = assetStore;
const { totalProduct } = prodStore;
const { totalUser } = userStore;
  return (
    <Fragment>
      {/* <Container> */}
      <Card className='mt-2'>
            <CardHeader>
              Dashboard
            </CardHeader>
            <CardBody>
          
        <Row>
        <Col md="3" sm="6" xs="12">
        <Card className="bg-secondary text-white"> 
             <CardBody>
               <div className="d-flex justify-content-around">
                <div>
                {stats || 0} <br />
                Total Branch
                </div>
               <span><i className="fa fa-building" aria-hidden="true"></i></span>
               </div>
              
             </CardBody>
           </Card>   
          </Col>
          <Col md="3" sm="6" xs="12">
          <Card className="bg-primary text-white"> 
             <CardBody>
               <div className="d-flex justify-content-around">
                <div>
                {totalAsset || 0} <br />
                Total Assets
                </div>
               <span><i className="fa fa-product-hunt" aria-hidden="true"></i></span>
               </div>
              
             </CardBody>
           </Card>  
          </Col>
          <Col md="3" sm="6" xs="12">
          <Card className="bg-info text-white"> 
             <CardBody>
               <div className="d-flex justify-content-around">
                <div>
                {totalProduct || 0} <br />
                Total Products
                </div>
               <span><i className="fa fa-shopping-cart" aria-hidden="true"></i></span>
               </div>
              
             </CardBody>
           </Card> 
          </Col>
          <Col md="3" sm="6" xs="12">
          <Card className="bg-success text-white"> 
             <CardBody>
               <div className="d-flex justify-content-around">
                <div>
                {totalUser || 0} <br />
                Total User
                </div>
               <span><i className="fa fa-group" aria-hidden="true"></i></span>
               </div>
              
             </CardBody>
           </Card>
          </Col>
        </Row>
     

            </CardBody>
          </Card>
       {/* </Container> */}
    </Fragment>
    
  );
};

export default observer(Dashboard);
