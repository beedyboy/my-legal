import React, { useContext, useState, Fragment } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap";
import AssetStore from "../../stores/AssetStore";
import AddAsset from "./Components/AddAsset";
import AssetList from "./Components/AssetList";
import Utility from "../../services/UtilityService";

const Asset = () => {
  const assetStore = useContext(AssetStore);
  const { info: assets, removeAsset, deleting } = assetStore;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };
  const createAsset = () => {
    setModal(true);
    setMode("Add");
  };

  let canAdd = Utility.canAccess("asset", "add");
  let canDel = Utility.canAccess("asset", "del");
  let canView = Utility.canAccess("asset", "view");
  let canModify = Utility.canAccess("asset", "modify");
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <h5>Asset Management</h5>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              {canView ? (
                <AssetList
                  canAdd={canAdd}
                  canDel={canDel}
                  canModify={canModify}
                  deleting={deleting}
                  createAsset={createAsset}
                  data={assets}
                  setMode={setMode}
                  toggle={handleClose}
                  removeData={removeAsset}
                  rowData={setRowData}
                />
              ) : (
                "You do not have access to view"
              )}
            </Col>
          </Row>
          <AddAsset
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

export default observer(Asset);
