import React, { Fragment, useEffect, useState } from "react";
import { Container, Input, Button, Row, Col } from "reactstrap";
import dataHero from "data-hero";
const schema = {
  firstname: {
    isEmpty: false,
    min: 1,
    message: "Firstname is required",
  },
  lastname: {
    isEmpty: false,
    min: 1,
    message: "Lastname is required",
  },
};
const EditProfile = ({ initial_data, edit, submit, sending, toggle }) => {
  const [formState, setFormState] = useState({
    values: {
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      phone_number: "",
      branchName: "",
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
          firstname: data && data.firstname,
          lastname: data && data.lastname,
          email: data && data.email,
          phone_number: data && data.phone_number,
          branchName: data && data.branchName,
        },
      }));
    }
    return () => {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          id: "",
          firstname: "",
          lastname: "",
          email: "",
          phone_number: "",
          branchName: "",
        },
      }));
    };
  }, [initial_data]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.firstname.error || errors.lastname.error ? false : true,
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
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        branchName: "",
      },
      touched: {
        ...formState.touched,
        firstname: false,
        lastname: false,
        email: false,
        phone_number: false,
      },
      errors: {},
    }));
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
                  <h6><span onClick={toggle}>Back to profile</span></h6>
                </div>
                <h6 className="text-right">Edit Profile</h6>
              </div>
              <Row className="mt-2">
                <Col md="6">
                  <Input
                    type="text"
                    name="firstname"
                    className="form-control"
                    placeholder="first name"
                    value={formState.values.firstname}
                    onChange={handleChange}
                  />
                </Col>
                <Col md="6">
                  <Input
                    type="text"
                    className="form-control"
                    value="Doe"
                    placeholder="last name"
                    name="lastname"
                    value={formState.values.lastname}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md="6">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={formState.values.email}
                    disabled={true}
                  />
                </Col>
                <Col md="6">
                  <Input
                    type="text"
                    className="form-control"
                    value="+19685969668"
                    placeholder="Phone number"
                    name="phone_number"
                    value={formState.values.phone_number}
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
                >{sending ? (
                    <span> Saving Profile  <i className="fa fa-spinner"></i></span>
                    ): 'Save Profile'} 
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default EditProfile;
