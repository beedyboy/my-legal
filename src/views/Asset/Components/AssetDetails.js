import React, { useEffect, useContext, Fragment, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import {
  Badge,
  Card,
  CardBody,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Row,
  Col,
} from "reactstrap";
import PerfectScrollBar from "react-perfect-scrollbar";
import { observer } from "mobx-react";
import Status from "./Status";
import AssetStore from "../../../stores/AssetStore";
import TransferDept from "../../../components/Asset/TransferDept";
import TransferIndividual from "../../../components/Asset/TransferIndividual";
import MyAllocations from "../../../components/Asset/MyAllocations";
import Utility from "../../../services/UtilityService";

let canModify = Utility.canAccess("asset", "modify");
const AssetDetails = (props) => {
  const assetStore = useContext(AssetStore);
  const {
    getAssetById,
    asset,
    sending,
    close,
    getAssetAllocations,
    myAllocation,
    toggleClose,
    toggleStatus,
  } = assetStore;
  const [modal, setModal] = useState(false);
  const [deptModal, setDeptModal] = useState(false);
  const [indModal, setIndModal] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };
  const toggleDepartmental = () => {
    setDeptModal(!deptModal);
  };
  const toggle = () => setOpen(!dropdownOpen);
  const toggleIndividual = () => {
    setIndModal(!indModal);
  };
  useEffect(() => {
    let id = parseInt(props.match.params.id);
    getAssetById(id);
    getAssetAllocations(id);
  }, [props]);
  return (
    <Fragment>
      <Row>
        <Col md="8" className="border-right">
          <Card className="mt-2">
            <CardBody>
              <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                Asset Activities
              </h6>
              <Row>
                <Col md="12">
                  <MyAllocations data={myAllocation} />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Row>
            <Col md="12">
              <Card className="mt-2">
                <CardBody>
                  <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                    Asset Information
                    {canModify ? (
                      <Fragment>
                        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                          <DropdownToggle caret color="primary">
                            Transfer
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={toggleIndividual}>
                              Individual
                            </DropdownItem>
                            <DropdownItem onClick={toggleDepartmental}>
                              Department
                            </DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>{" "}
                        <Button color="warning">Maintenance</Button>{" "}
                      </Fragment>
                    ) : null}
                  </h6>
                  <TransferDept
                    id={parseInt(props.match.params.id)}
                    mode="Add"
                    handleClose={toggleDepartmental}
                    open={deptModal}
                  />
                  <TransferIndividual
                    id={parseInt(props.match.params.id)}
                    mode="Add"
                    handleClose={toggleIndividual}
                    open={indModal}
                  />
                  <Row>
                    <Col md="12">
                      <p className="m-b-10 f-w-600">Name</p>
                      <h6 className="text-muted f-w-400">
                        {" "}
                        {asset && asset.title}
                      </h6>
                    </Col>
                    <Col md="12">
                      <p className="m-b-10 f-w-600">Serial Number</p>
                      <h6 className="text-muted f-w-400">
                        {" "}
                        {asset && asset.serial}
                      </h6>
                    </Col>
                    <Col md="12">
                      <p className="m-b-10 f-w-600">Sub Category</p>
                      <h6 className="text-muted f-w-400">
                        {" "}
                        {asset && asset.subName}
                      </h6>
                    </Col>
                    <Col md="12">
                      <p className="m-b-10 f-w-600">Created On</p>
                      <h6 className="text-muted f-w-400">
                        {" "}
                        {asset && asset.created_at}
                      </h6>
                    </Col>

                    <Col md="12">
                      <p className="m-b-10 f-w-600">Status</p>
                      <h6 className="text-muted f-w-400">
                        <Badge>{asset && asset.status}</Badge>{" "}
                        {canModify ? (
                          <Button
                            size="sm"
                            color="warning"
                            onClick={handleClose}
                          >
                            <i className="fa fa-edit"></i>
                          </Button>
                        ) : null}
                      </h6>
                      <Status
                        open={modal}
                        handleClose={handleClose}
                        sending={sending}
                        data={asset.status}
                        close={close}
                        toggleStatus={toggleStatus}
                        toggleClose={toggleClose}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Note</h6>
                      <PerfectScrollBar>
                        {ReactHtmlParser(asset.description)}
                      </PerfectScrollBar>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(AssetDetails);
