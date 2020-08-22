import React, { useEffect } from 'react'
// import { Router } from 'react-router-dom';

const ProductDetails = props => {
useEffect(() => {
    let id = props.match.params.id
    console.log(props, id)
    return () => {
         
    }
}, [props])
    return (
        <div>
            <h1>Product details</h1>
        </div>
    )
}

export default ProductDetails
