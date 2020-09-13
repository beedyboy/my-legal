import React, { useContext, useState, Fragment } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap";
import CategoryStore from "../../stores/CategoryStore";
import AddCategory from "./Components/AddCategory";
import CategoryList from "./Components/CategoryList";
import Utility from "../../services/UtilityService";

const Category = () => {
  const catStore = useContext(CategoryStore);
  const { info: categories, removeCategory } = catStore;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };
  const createCategory = () => {
    setModal(true);
    setMode("Add");
  };
  let canAdd = Utility.canAccess("category", "add");
  let canDel = Utility.canAccess("category", "del");
  let canView = Utility.canAccess("category", "view");
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <Row>
            <Col md="5" sm="12">
              <h5>Category Management</h5>
            </Col>
            <Col md={{ size: 3, offset: 4 }} sm="12">
              {canAdd ? (
                <Button
                  color="secondary"
                  className="float-right"
                  onClick={createCategory}
                >
                  Add Category
                </Button>
              ) : null}
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              {canView ? (
                <CategoryList
                  canAdd={canAdd}
                  canDel={canDel}
                  data={categories}
                  setMode={setMode}
                  toggle={handleClose}
                  removeData={removeCategory}
                  rowData={setRowData}
                />
              ) : (
                "You do not have access to view"
              )}
            </Col>
          </Row>
          <AddCategory
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

export default observer(Category);
