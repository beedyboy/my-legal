import React, { Fragment, useContext, useState, useEffect } from "react";
import PerfectScrollBar from "react-perfect-scrollbar";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import OrderStore from "../../../stores/OrderStore";
import AddItem from "./AddItem";
import CartList from "./CartList";
import { observer } from "mobx-react";
import Utility from "../../../services/UtilityService";
import CartTotal from "./CartTotal";

const SalesWindow = ({ canModify }) => {
  const ordStore = useContext(OrderStore);
  const {
    stocks: pos,
    cart,
    total,
    cartTotal,
    removeOrder,
    productStockByName,
    generateOrderNo,
    startNewOrder,
    createOrder,
    updateOrder,
    emptyCart,
    sending,
    close,
    toggleClose,
    checkout,
    ckclose,
    toggleCKClose,
  } = ordStore;
  const [modal, setModal] = useState(false);
  const [cmodal, setCModal] = useState(false);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const active = Utility.get("receiptNumber");
    if (active === undefined || active === null) {
      generateOrderNo();
    }
    cartTotal();
  }, []);
  const AddNewStock = (e, row) => {
    setMode("Add");
    setRowData(row);
    setModal(true);
  };
  const handleSearch = (event) => {
    event.persist();
    setSearch(event.target.value);
    if (event.target.value.length > 1) {
      productStockByName(event.target.value);
    }
  };
  const handleNewOrder = () => {
    startNewOrder();
  };
  return (
    <Fragment>
      <Row className="m-b-5">
        <Col md="12">
          <Button
            color="secondary"
            type="button"
            className="pull-right"
            onClick={handleNewOrder}
          >
            New Order
          </Button>
        </Col>
        <Col md="12">
          <Col md="12">
            <FormGroup>
              <Label for="name">Search Product</Label>
              <Input
                type="text"
                value={search || ""}
                name="name"
                id="name"
                onChange={handleSearch}
                placeholder="Search Product"
              />
            </FormGroup>
          </Col>
        </Col>
      </Row>
      <Row className="m-t-2 m-b-5">
        <Col md="6" className="border-right">
          <PerfectScrollBar>
            <Row>
              {pos &&
                pos.map((stock) => (
                  <Col md="4" className="mt-2" key={stock.uid}>
                    <Card>
                      <CardBody>
                        <div className="card-img-actions">
                          <img
                            src={stock.images}
                            className="card-img img-fluid"
                            width="96"
                            height="150"
                            alt={stock.uid}
                          />
                        </div>
                        <div className="bg-light text-center">
                          <div className="mb-2">
                            <h6 className="font-weight-semibold mb-2">
                              <span
                                className="text-default mb-2"
                                data-abc="true"
                              >
                                {stock.product_name}
                              </span>
                            </h6>
                            <span className="text-muted" data-abc="true">
                              {stock.quantity}
                            </span>
                            <h3 className="mb-0 font-weight-semibold">
                              {stock.price}
                            </h3>
                          </div>
                          <Button
                            type="button"
                            className="btn bg-cart"
                            onClick={(e) => AddNewStock(e, stock)}
                          >
                            <i className="fa fa-cart-plus mr-2"></i>Buy
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
            </Row>
          </PerfectScrollBar>
        </Col>

        <Col md="6">
          <PerfectScrollBar>
            <Row>
              <Col md="12">
                <CartList
                  canModify={canModify}
                  data={cart}
                  open={modal}
                  toggle={setModal}
                  setMode={setMode}
                  mode={mode}
                  removeData={removeOrder}
                  setRowData={setRowData}
                />
                <CartTotal
                  canModify={canModify}
                  count={cart.length}
                  checkout={checkout}
                  sending={sending}
                  ckclose={ckclose}
                  toggleCKClose={toggleCKClose}
                  total={total}
                  open={cmodal}
                  emptyCart={emptyCart}
                  toggle={setCModal}
                />
              </Col>
            </Row>
          </PerfectScrollBar>
        </Col>
      </Row>
      <AddItem
        open={modal}
        toggle={setModal}
        createOrder={createOrder}
        updateOrder={updateOrder}
        sending={sending}
        close={close}
        toggleClose={toggleClose}
        mode={mode}
        data={rowData}
      />
    </Fragment>
  );
};

export default observer(SalesWindow);
