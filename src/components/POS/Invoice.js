import React, { Fragment } from 'react'

// .body-main {
//     background: #ffffff;
//     border-bottom: 15px solid #1E1F23;
//     border-top: 15px solid #1E1F23;
//     margin-top: 30px;
//     margin-bottom: 30px;
//     padding: 40px 30px !important;
//     position: relative;
//     box-shadow: 0 1px 21px #808080;
//     font-size: 10px
// }

// .main thead {
//     background: #1E1F23;
//     color: #fff
// }

// .img {
//     height: 100px
// }

// h1 {
//     text-align: center
// }
const Invoice = () => {
    return (
        <Fragment>
            <div className="container">
    <div className="page-header">
        <h1>Invoice </h1>
    </div>
    <div className="container">
        <div className="row">
            <div className="col-md-6 col-md-offset-3 body-main">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4"> <img className="img" alt="Invoce Template" src="http://pngimg.com/uploads/shopping_cart/shopping_cart_PNG59.png" /> </div>
                        <div className="col-md-8 text-right">
                            <h4 style="color: #F81D2D;"><strong>BBBootstrap</strong></h4>
                            <p>221 ,Baker Street</p>
                            <p>1800-234-124</p>
                            <p>example@gmail.com</p>
                        </div>
                    </div> <br />
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2>INVOICE</h2>
                            <h5>04854654101</h5>
                        </div>
                    </div> <br />
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <h5>Description</h5>
                                    </th>
                                    <th>
                                        <h5>Amount</h5>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="col-md-9">Samsung Galaxy 8 64 GB</td>
                                    <td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> 50,000 </td>
                                </tr>
                                <tr>
                                    <td className="col-md-9">JBL Bluetooth Speaker</td>
                                    <td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> 5,200 </td>
                                </tr>
                                <tr>
                                    <td className="col-md-9">Apple Iphone 6s 16GB</td>
                                    <td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> 25,000 </td>
                                </tr>
                                <tr>
                                    <td className="col-md-9">MI Smartwatch 2</td>
                                    <td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> 2,200 </td>
                                </tr>
                                <tr>
                                    <td className="text-right">
                                        <p> <strong>Shipment and Taxes:</strong> </p>
                                        <p> <strong>Total Amount: </strong> </p>
                                        <p> <strong>Discount: </strong> </p>
                                        <p> <strong>Payable Amount: </strong> </p>
                                    </td>
                                    <td>
                                        <p> <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> 500 </strong> </p>
                                        <p> <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> 82,900</strong> </p>
                                        <p> <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> 3,000 </strong> </p>
                                        <p> <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> 79,900</strong> </p>
                                    </td>
                                </tr>
                                <tr style="color: #F81D2D;">
                                    <td className="text-right">
                                        <h4><strong>Total:</strong></h4>
                                    </td>
                                    <td className="text-left">
                                        <h4><strong><i className="fas fa-rupee-sign" area-hidden="true"></i> 79,900 </strong></h4>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="col-md-12">
                            <p><b>Date :</b> 6 June 2019</p> <br />
                            <p><b>Signature</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </Fragment>

    )
}

export default Invoice
