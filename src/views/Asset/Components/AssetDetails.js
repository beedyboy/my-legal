import React, { useEffect, useContext, Fragment, useState } from "react"; 
import ReactHtmlParser from "react-html-parser";
import { Badge, Card, CardBody, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Row, Col } from "reactstrap";
import PerfectScrollBar from "react-perfect-scrollbar";
import { observer } from "mobx-react"; 
import Status from "./Status"; 
import AssetStore from "../../../stores/AssetStore";
import MyAllocations from "../../../components/Asset/MyAllocations";


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
    toggleStatus
  } = assetStore;
  const [modal, setModal] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);
  const [assign, setAssign] = useState(false);
  const handleClose = () => {
    setModal(!modal);
  };
  const toggle = () => setOpen(!dropdownOpen);
  const toggleAssign = () => {
    setAssign(!assign);
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
              <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Asset Activities
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
             
<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
  <DropdownToggle caret color="primary">
    Transfer
  </DropdownToggle>
  <DropdownMenu>
    <DropdownItem>Individual</DropdownItem>
    <DropdownItem>Department</DropdownItem>
  </DropdownMenu>
</ButtonDropdown>{" "}
              <Button color="danger">Maintenance</Button>{" "}
              {/* <Button color="secondary">Transfer</Button>{" "} */}
                  </h6>
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
                    {/* <Col md="12">
                      <p className="m-b-10 f-w-600">Ticket Manager
                        <Button size="sm" color="warning" onClick={toggleAssign}>
                          <i className="fa fa-edit"></i>
                        </Button></p>
                      <h6 className="text-muted f-w-400">
                        {" "}
                        {asset && asset.assigned_to}
                      </h6>
                      <AssignTicket
                         open={assign}
                         handleClose={toggleAssign} 
                         asset={asset.id}
                      />
                    </Col> */}
                    <Col md="12">
                      <p className="m-b-10 f-w-600">Status</p>
                      <h6 className="text-muted f-w-400">
                        <Badge>{asset && asset.status}</Badge>
                        <Button size="sm" color="warning" onClick={handleClose}>
                          <i className="fa fa-edit"></i>
                        </Button>
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
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
                     Note
                  </h6>
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
