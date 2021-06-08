import React, { useState, useEffect, useContext, Fragment } from "react";
import { withRouter, Redirect } from "react-router-dom";
import dataHero from "data-hero";
import { observer } from "mobx-react";
import {
  Container,
  Input,
  Button,
  Row,
  Col,
  Label,
  Card,
  Form,
  FormGroup,
  FormText,
} from "reactstrap";
import brand from "../../assets/img/brand.png";
import office from "../../assets/img/office.png";
import "./style.css";
import UserStore from "../../stores/UserStore";
import { Link } from "react-router-dom";

const schema = {
  email: {
    email: true,
    min: 10,
    message: "A valid email is required",
  },
  password: {
    min: 5,
    isEmpty: false,
    message: "password is required",
  },
};

const SignIn = (props) => {
  const userStore = useContext(UserStore);
  const { login, isAuthenticated, sending } = userStore;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      email: "",
      password: "",
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);

    setFormState((formState) => ({
      ...formState,
      isValid: errors.email.error || errors.password.error ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    login(formState.values);
    // isAuthenticated === true ? history.push('/'): null;
  };
  const { from } = props.location.state || { from: { pathname: "/dashboard" } };
  if (isAuthenticated === true) {
    return <Redirect to={from} />;
  }

  const hasError = (field) => {
    return formState.touched[field] && formState.errors[field].error;
  };
  return (
    <Fragment>
      <Container fluid className="px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <Card className="card0 border-0">
          <Row className="d-flex">
            <Col lg="6">
              <div className="card1 pb-5">
                <Row>
                  <img src={brand} className="logo" alt="brand" />
                </Row>
                <Row className="px-3 justify-content-center mt-4 mb-5 border-line">
                  <img src={office} className="image" alt="office" />
                </Row>
              </div>
            </Col>
            <Col lg="6">
              <div className="card2 card border-0 px-4 py-5">
                <Form onSubmit={handleSignIn}>
                  <Row className="mb-4 px-3">
                    <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                    <div className="facebook text-center mr-3">
                      <div className="fa fa-facebook"></div>
                    </div>
                    <div className="twitter text-center mr-3">
                      <div className="fa fa-twitter"></div>
                    </div>
                    <div className="linkedin text-center mr-3">
                      <div className="fa fa-linkedin"></div>
                    </div>
                  </Row>
                  <Row className="px-3 mb-4">
                    <div className="line"></div>{" "}
                    <small className="or text-center">Or</small>
                    <div className="line"></div>
                  </Row>
                  <Row className="px-3">
                    <Col lg="12">
                      <FormGroup
                        className={hasError("email") ? "has-danger" : null}
                      >
                        <Label className="mb-1">
                          <h6 className="mb-0 text-sm">Email Address</h6>
                        </Label>
                        <Input
                          className="mb-4"
                          name="email"
                          onChange={handleChange}
                          type="text"
                          value={formState.values.email || ""}
                          placeholder="Enter a valid email address"
                        />
                        <FormText>
                          <p className="text-danger">
                            {hasError("email")
                              ? formState.errors.email &&
                                formState.errors.email.message
                              : null}
                          </p>
                        </FormText>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="px-3">
                    <Col lg="12">
                      <FormGroup
                        className={hasError("password") ? "has-danger" : null}
                      >
                        <Label className="mb-1">
                          {" "}
                          <h6 className="mb-0 text-sm">Password</h6>
                        </Label>
                        <Input
                          name="password"
                          onChange={handleChange}
                          type="password"
                          value={formState.values.password || ""}
                          placeholder="Enter password"
                        />
                        <FormText>
                          <p className="text-danger">
                            {hasError("password")
                              ? formState.errors.password &&
                                formState.errors.password.message
                              : null}{" "}
                          </p>
                        </FormText>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="px-3 mb-4">
                    <Col lg="12">
                      <Row>
                        {/* <Col xs="12" sm="7" lg ="8"> 
                    <FormGroup check>
                      <Label className="custom-control-Label text-md" check>
                        <Input type="checkbox" />{' '}
                        Remember me
                      </Label>
                    </FormGroup>
                  </Col> */}
                        <Col xs="12" lg="12">
                          <Link to="/request-reset" className="ml-auto mb-0 text-sm">
                            Forgot Password?
                          </Link>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mb-3 px-3">
                    <Col lg="12">
                      <Button
                        type="submit"
                        disabled={!formState.isValid}
                        className="btn btn-blue text-center"
                      >
                        {" "}
                        {sending ? (
                          <span>
                            {" "}
                            Connecting to server{" "}
                            <i className="fa fa-spinner"></i>
                          </span>
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </Col>
                  </Row>
                  {/* <Row className="mb-4 px-3">
              <small className="font-weight-bold">
                Don't have an account?
              <a className="text-danger ">Register</a>
            </small>
          </Row> */}
                </Form>
              </div>
            </Col>
          </Row>
          <div className="bg-blue py-4">
            <Row className="px-3">
              <small className="ml-4 ml-sm-5 mb-2">
                Copyright &copy; 2020. All rights reserved.
              </small>
              <div className="social-contact ml-4 ml-sm-auto">
                <span className="fa fa-facebook mr-4 text-sm"></span>
                <span className="fa fa-google-plus mr-4 text-sm"></span>
                <span className="fa fa-linkedin mr-4 text-sm"></span>
                <span className="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
              </div>
            </Row>
          </div>
        </Card>
      </Container>
    </Fragment>
  );
};

export default withRouter(observer(SignIn));
