import React, { useContext, useState, Fragment } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap";
import ProductStore from "../../stores/ProductStore";
import AddProduct from "./Components/AddProduct";
import ProductList from "./Components/ProductList";
import Utility from "../../services/UtilityService";

const Product = () => {
  const productStore = useContext(ProductStore);
  const { info: products, removeProduct } = productStore;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };
  const createProduct = () => {
    setModal(true);
    setMode("Add");
  };
  let canDel = Utility.canAccess("product", "del");
  let canView = Utility.canAccess("product", "view");
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <Row>
            <Col md="5" sm="12">
              <h5>Product Management</h5>
            </Col>
            <Col md={{ size: 3, offset: 4 }} sm="12">
              {Utility.canAccess("product", "add") ? (
                <Fragment>
                  <Button
                    color="secondary"
                    className="float-right"
                    onClick={createProduct}
                  >
                    Add Product
                  </Button>{" "}
                </Fragment>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              {canView ? (
                <ProductList
                  canDel={canDel}
                  data={products}
                  setMode={setMode}
                  toggle={handleClose}
                  removeData={removeProduct}
                  rowData={setRowData}
                />
              ) : (
                "You do not have access to view list of products"
              )}
            </Col>
          </Row>
          <AddProduct
            mode={mode}
            open={modal}
            handleClose={handleClose}
            initial_data={rowData}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default observer(Product);
