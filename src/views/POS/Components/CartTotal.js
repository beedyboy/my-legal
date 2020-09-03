import React, { Fragment } from 'react'
import { Button } from 'reactstrap'
import CheckOutForm from './CheckOutForm'

const CartTotal = ({total, open, toggle, count,  checkout, sending, ckclose, toggleCKClose}) => {
    const sendCart = e => {
      e.preventDefault()
      toggle(true);
    }
    return (
        <Fragment>
            <div className="my-2">
                <span className="pull-left">Total: {total} </span>
               <span className="pull-right">
                    <Button type="button" color="primary" onClick={(e) =>sendCart(e)} disabled={count < 1}>Checkout</Button>
                </span>
            </div>
            <CheckOutForm open={open} toggle={toggle}  checkout={checkout} sending={sending} ckclose={ckclose} toggleCKClose={toggleCKClose} />
        </Fragment>

    )
}

export default CartTotal
