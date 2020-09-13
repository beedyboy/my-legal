import React, { useContext, useState, Fragment, useEffect } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import ProfileDetails from "./Components/CompanyDetails";
import EditProfile from "./Components/EditCompanyProfile";
import CompanyStore from "../../stores/CompanyStore";
import Utility from "../../services/UtilityService";

const Company = () => {
  const userStore = useContext(CompanyStore);
  const { profiles, getProfile, updateProfile, sending } = userStore;
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getProfile();
  }, []);

  const toggle = () => {
    setEdit(!edit);
  };

  let canManage = Utility.canAccess("company", "manage");
  return (
    <Fragment>
      <Card className="mt-2">
        {canManage ? (
          <Fragment>
            <CardHeader>
              <h5>Company Profile</h5>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="12" sm="12" className="mt-2">
                  {edit ? (
                    <>
                      {" "}
                      <EditProfile
                        sending={sending}
                        submit={updateProfile}
                        edit={edit}
                        toggle={toggle}
                        initial_data={profiles}
                      />
                    </>
                  ) : (
                    <>
                      {" "}
                      <ProfileDetails
                        edit={edit}
                        toggle={toggle}
                        data={profiles}
                      />
                    </>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Fragment>
        ) : (
          "You do not have access to this page"
        )}
      </Card>
    </Fragment>
  );
};

export default observer(Company);
