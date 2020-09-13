import React, { Fragment, useContext, useEffect } from "react";
import { Row, Col } from "reactstrap";
import UserStore from "../../../stores/UserStore";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { observer } from "mobx-react";
import Utility from "../../../services/UtilityService";

const StaffDetails = (props) => {
  const userStore = useContext(UserStore);
  const { profile: data, getProfileById } = userStore;
  useEffect(() => {
    let id = parseInt(props.match.params.id);
    getProfileById(id);
  }, [props]);
  let access = data && data.acl;
  let acl;

  let payload = "";
  function showAccess() {
    if (access && access.length > 0) {
      acl = JSON.parse(access);
      Object.keys(acl).map((key) => {
        stressAccess(key, acl[key]);
      });
    }
  }
  const stressAccess = (key, item) => {
    let add = "";
    for (let property in item) {
      if (item[property] === true) {
        add +=
          "<span class='border-right  badge bg-success p-1'> Can " +
          property +
          "</span>";
      } else {
        add +=
          "<span class='border-right badge bg-warning p-1'> Cannot " +
          property +
          "</span>";
      }
    }
    payload += "<div class='row mb-1 border-bottom'>";
    payload += "<h6 class='border-bottom'>" + key.toUpperCase() + "</h6>";
    payload += "<div class='col-12 p-1'>" + add + "</div>";
    payload += "</div>";
    return add;
  };
  
  let canView = Utility.canAccess("staff", "view");
  return (
    <Fragment>
      <Row>
        {" "}
        <Col md="12">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="d-flex flex-row align-items-center back">
              <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
              <h6>
                <Link to={`/staff`} className="btn btn-info btn-sm">
                  Back to Staff List
                </Link>
              </h6>
            </div> 
          </div>
        </Col>
        <Col md="12" sm="12">
          {canView?
          <div className="card-block  border-right">
            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
            <Row>
              <Col sm="6">
                <p className="m-b-10 f-w-600">Firstname</p>
                <h6 className="text-muted f-w-400">{data && data.firstname}</h6>
              </Col>
              <Col sm="6">
                <p className="m-b-10 f-w-600">Lastname</p>
                <h6 className="text-muted f-w-400">
                  {(data && data.lastname) || "-"}
                </h6>
              </Col>
              <Col sm="6">
                <p className="m-b-10 f-w-600">Email</p>
                <h6 className="text-muted f-w-400">{data && data.email}</h6>
              </Col>
              <Col sm="6">
                <p className="m-b-10 f-w-600">Phone</p>
                <h6 className="text-muted f-w-400">
                  {(data && data.phone_number) || "-"}
                </h6>
              </Col>
              <Col sm="12">
                <p className="m-b-10 f-w-600">Address</p>
                <h6 className="text-muted f-w-400">
                  {(data && data.address) || "-"}
                </h6>
              </Col>
            </Row>
            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">
              Emergency Contact
            </h6>
            <Row>
              <Col sm="6">
                <p className="m-b-10 f-w-600">Contact</p>
                <h6 className="text-muted f-w-400">
                  {data && data.emergency_contact}
                </h6>
              </Col>
              <Col sm="6">
                <p className="m-b-10 f-w-600">Phone Number</p>
                <h6 className="text-muted f-w-400">
                  {(data && data.emergency_phone) || "-"}
                </h6>
              </Col>
            </Row>

            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Permissions</h6>

            {showAccess()}
            {ReactHtmlParser(payload)}
          </div>
          : 'You do not have access to this page'}
        </Col>
      </Row>
    </Fragment>
  );
};

export default observer(StaffDetails);
