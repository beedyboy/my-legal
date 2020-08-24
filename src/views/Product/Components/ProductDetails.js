import React, { useEffect, useContext, useState, Fragment } from 'react'
import ProductStore from '../../../stores/ProductStore' 
import StockStore from '../../../stores/StockStore';
import { Card, CardBody, Row, Col } from "reactstrap";
import { observer } from 'mobx-react';
import StockList from '../../../components/Stock/StockList';

const ProductDetails = props => {
    const productStore = useContext(ProductStore);
    const stockStore = useContext(StockStore);
    const { getProductById, product } = productStore;
    const { productStock, stocks, removeStock, deleteInBulk,deleting } = stockStore;
    const [productData, setProductData] = useState({
        id: '',
        images: '',
        product_name: '',
        catName: '',
        cat_id: '',
        branchName: '',
        branch_id: '',
        description: ''

    }) 
    useEffect(() => {
      let   id = props.match.params.id
        getProductById(id);   
        productStock(id);  
    }, [props]);

    useEffect(() => {
        let shouldSetData =  product && product.id; 
        if (shouldSetData) {  
        const data = product; 
        setProductData(state => ({
          ...state,  
           id: data && data.id,
          product_name: data && data.product_name,
          cat_id: data && data.cat_id,
          images: data && data.images,
          catName: data && data.catName,
          branch_id: data && data.branch_id, 
          branchName: data && data.branchName, 
          description: data && data.description  
        })); 
        }
        return () => {
        setProductData(prev => ({
            ...prev, id: '', images: '', product_name: '', catName: '',  cat_id: '', branchName: '',
               branch_id: '', description: ''
            }));
        }
    }, [product]); 
    return (
        <Fragment>
            <Card className="mt-2">
                <CardBody>
                    <Row>
                        <Col md="12">
                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                            <Row>
                                 <Col md="3">
                                     <img src={productData.images} alt={productData.product_name} width="50" height="50" />
                                 </Col>
                                <Col md="5"> 
                                     <p className="m-b-10 f-w-600">Product Name</p>
                                    <h6 className="text-muted f-w-400"> {productData.product_name}</h6>                                     
                                </Col>
                                <Col md="4"> 
                                     <p className="m-b-10 f-w-600">Branch</p>
                                    <h6 className="text-muted f-w-400"> {productData.branchName}</h6>
                               </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                <p className="m-b-10 f-w-600">Description</p>
                                    <h6 className="text-muted f-w-400"> {productData.description}</h6> 
                                </Col>
                                <Col md="4"> 
                                     <p className="m-b-10 f-w-600">Category</p>
                                    <h6 className="text-muted f-w-400"> {productData.catName}</h6>
                               </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12" className="mt-2">
                            <StockList data={stocks} id={parseInt(props.match.params.id)} removeData={removeStock} deleteInBulk={deleteInBulk} deleting={deleting} />
                        </Col>
                    </Row>
                </CardBody>
                 
            </Card>
        </Fragment>
    )
}

export default observer(ProductDetails);
