import React, { useState, Fragment, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap";
import SubCategoryStore from "../../stores/SubCategoryStore";
import SubCatList from "./Components/SubCategoryList";
import AddSubCategory from "./Components/AddSubCategory";
import Utility from "../../services/UtilityService";

const SubCategory = () => {
  const subStore = useContext(SubCategoryStore);
  const { info: data, fetchSubCategory, removeSubCat } = subStore;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    fetchSubCategory();
  }, []);
  const handleClose = () => {
    setModal(!modal);
  };
  const createSubCategory = () => {
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
              <h5>SubCategory Management</h5>
            </Col>
            <Col md={{ size: 3, offset: 4 }} sm="12">
              {canAdd ? (
                <Button
                  color="secondary"
                  className="float-right"
                  onClick={createSubCategory}
                >
                  Add SubCategory
                </Button>
              ) : null}
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              {canView ? (
                <SubCatList
                  canDel={canDel}
                  canAdd={canAdd}
                  data={data}
                  setMode={setMode}
                  toggle={handleClose}
                  removeData={removeSubCat}
                  rowData={setRowData}
                />
              ) : (
                "You do not have access to view"
              )}
            </Col>
          </Row>
          <AddSubCategory
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

export default observer(SubCategory);
