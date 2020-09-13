import React, { Fragment } from "react";
import { Button } from "reactstrap";
import CheckOutForm from "./CheckOutForm";

const CartTotal = ({
  total,
  canModify,
  open,
  toggle,
  count,
  emptyCart,
  checkout,
  sending,
  ckclose,
  toggleCKClose,
}) => {
  const sendCart = (e) => {
    e.preventDefault();
    toggle(true);
  };
  const clearCart = (e) => {
    e.preventDefault();
    emptyCart();
  };
  return (
    <Fragment>
      <div className="my-2 d-flex justify-content-around">
        <span className="pull-left">Total: {total} </span>

        <span className="pull-right">
          <Button
            type="button"
            color="danger"
            onClick={(e) => clearCart(e)}
            disabled={count < 1}
          >
            Empty Cart
          </Button>
        </span>

        <span className="pull-right">
          {canModify ? (
            <Button
              type="button"
              color="primary"
              onClick={(e) => sendCart(e)}
              disabled={count < 1}
            >
              Checkout
            </Button>
          ) : null}
        </span>
      </div>
      <CheckOutForm
        open={open}
        toggle={toggle}
        checkout={checkout}
        sending={sending}
        ckclose={ckclose}
        toggleCKClose={toggleCKClose}
      />
    </Fragment>
  );
};

export default CartTotal;
