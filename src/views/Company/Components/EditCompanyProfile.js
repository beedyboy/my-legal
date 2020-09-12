import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Button,
  Row,
  Col,
} from "reactstrap";
import dataHero from "data-hero";
const schema = {
  appname: {
    isEmpty: false,
    min: 1,
    message: "App name is required",
  },
  companyname: {
    isEmpty: false,
    min: 1,
    message: "Company name is required",
  },
};
const EditCompanyProfile = ({
  initial_data, 
  submit,
  sending,
  toggle,
}) => {
  const [formState, setFormState] = useState({
    values: {
      id: 1,
      companyname: "",
      appname: "",
      email: "",
      phone: "",
      address: "",
    },
    touched: {},
    errors: {},
  });
  useEffect(() => {
    let shouldSetData = typeof initial_data !== "undefined" ? true : false;
    if (shouldSetData) {
      const data = initial_data;
      setFormState((state) => ({
        ...state,
        values: {
          ...state.values,
          id: data && data.id,
          companyname: data && data.companyname,
          appname: data && data.appname,
          email: data && data.email,
          phone: data && data.phone,
          address: data && data.address,
        },
      }));
    }
    return () => {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          id: "",
          companyname: "",
          appname: "",
          email: "",
          phone: "",
          branchName: "",
        },
      }));
    };
  }, [initial_data]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.companyname.error || errors.appname.error ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(formState.values);
  };

  return (
    <Fragment>
      <Container className="rounded bg-white">
        <Row>
          <Col md="12">
            <div className="p-3 py-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex flex-row align-items-center back">
                  <i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                  <h6>
                    <span onClick={toggle}>Back to profile</span>
                  </h6>
                </div>
                <h6 className="text-right">Edit Company Profile</h6>
              </div>
              <Row className="mt-2">
                <Col md="12">
                  <FormGroup>
                    <Label for="deptName">Company Name</Label>
                    <Input
                      type="text"
                      value={formState.values.companyname || ""}
                      name="companyname"
                      id="companyname"
                      onChange={handleChange}
                      placeholder="Company Name"
                      invalid={hasError("companyname")}
                    />
                    <FormFeedback>
                      {hasError("companyname")
                        ? formState.errors.companyname &&
                          formState.errors.companyname.message
                        : null}
                    </FormFeedback>
                  </FormGroup>
                </Col>
                <Col md="12">
              <FormGroup>
                        <Label for="deptName">App Name</Label>
                        <Input
                        type="text" 
                        value={formState.values.appname || ''}
                        name="appname"
                        id="appname"
                        onChange={handleChange} 
                        placeholder="App Name"
                        invalid={ hasError('appname')}
                        />
                        <FormFeedback>
                        {
                        hasError('appname') ? formState.errors.appname && formState.errors.appname.message : null
                        } 
                        </FormFeedback>
                    </FormGroup>  
                 
                </Col>
                <Col md="12">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={formState.values.email}
                    disabled={true}
                  />
                </Col>
                <Col md="12">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Phone number"
                    name="phone"
                    value={formState.values.phone}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md="12">
                  <Input
                    type="textarea"
                    className="form-control"
                    placeholder="Address"
                    name="address"
                    value={formState.values.address}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <div className="mt-5 text-right">
                <Button
                  color="primary"
                  className="profile-button"
                  type="button"
                  onClick={handleSubmit}
                >
                  {sending ? (
                    <span>
                      {" "}
                      Saving Profile <i className="fa fa-spinner"></i>
                    </span>
                  ) : (
                    "Save Profile"
                  )}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default EditCompanyProfile;
