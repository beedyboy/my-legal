import React, { useEffect, useState, Fragment } from "react";
import dataHero from "data-hero";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";

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
  password: {
    isEmpty: false,
    min: 1,
    message: "Password is required",
  },
  email: {
    isEmpty: false,
    min: 5,
    message: "A valid email is required",
  },
};
const StaffForm = ({ mode, store, open, handleClose, initial_data }) => {
  const {
    createStaff,
    updateStaff,
    sending,
    close,
    exist,
    confirmEmail,
  } = store;
  const [title, setTitle] = useState("Add Staff");
  const [formState, setFormState] = useState({
    values: {
      id: "",
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      phone: "",
      address: "",
    },
    touched: {},
    errors: {},
  });
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Staff");
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
            password: data && data.password,
            email: data && data.email,
            phone: data && data.phone_number,
            address: data && data.address,
          },
        }));
      }
    }
    return () => {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          id: "",
          firstname: "",
          lastname: "",
          password: "",
          email: "",
          phone: "",
          address: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid:
        errors.firstname.error ||
        errors.lastname.error ||
        errors.password.error ||
        errors.email.error
          ? false
          : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    if (close === true) {
      resetForm();
      handleClose();
    }
  }, [close]);

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
    if (event.target.name === "email") {
      confirmEmail(event.target.value);
    }
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add"
      ? createStaff(formState.values)
      : updateStaff(formState.values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        phone: "",
        address: "",
      },
      touched: {
        ...formState.touched,
        firstname: false,
        lastname: false,
        password: false,
        email: false,
        phone: false,
        address: false,
      },
      errors: {},
    }));
  };
  const closeBtn = (
    <Button className="close" onClick={handleClose}>
      &times;
    </Button>
  );
  return (
    <Fragment>
      <Modal isOpen={open} toggle={handleClose}>
        <ModalHeader toggle={handleClose} close={closeBtn}>
          {title}
        </ModalHeader>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <ModalBody>
            <Card>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup
                      className={hasError("firstname") ? "has-danger" : null}
                    >
                      <Label for="deptName">FirstName</Label>
                      <Input
                        type="text"
                        value={formState.values.firstname || ""}
                        name="firstname"
                        id="firstname"
                        onChange={handleChange}
                        placeholder="FirstName"
                        invalid={hasError("firstname")}
                      />
                      <FormFeedback>
                        {hasError("firstname")
                          ? formState.errors.firstname &&
                            formState.errors.firstname.message
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup
                      className={hasError("lastname") ? "has-danger" : null}
                    >
                      <Label for="deptName">LastName</Label>
                      <Input
                        type="text"
                        value={formState.values.lastname || ""}
                        name="lastname"
                        id="lastname"
                        onChange={handleChange}
                        placeholder="LastName"
                        invalid={hasError("lastname")}
                      />
                      <FormFeedback>
                        {hasError("lastname")
                          ? formState.errors.lastname &&
                            formState.errors.lastname.message
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="email">Email Address</Label>
                      <Input
                        type="text"
                        value={formState.values.email || ""}
                        name="email"
                        id="email"
                        onChange={handleChange}
                        placeholder="Email Address"
                        invalid={hasError("email") || exist}
                      />
                      <FormFeedback>
                        {hasError("email")
                          ? formState.errors.email &&
                            formState.errors.email.message
                          : null}
                        <p> {exist ? "Email already exist" : null}</p>
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  {mode === "Add" ? (
                    <>
                      {" "}
                      <Col md="12">
                        <FormGroup>
                          <Label for="password">Password</Label>
                          <Input
                            type="password"
                            value={formState.values.password || ""}
                            name="password"
                            id="password"
                            onChange={handleChange}
                            placeholder="Password"
                            invalid={hasError("password")}
                          />
                          <FormFeedback>
                            {hasError("password")
                              ? formState.errors.password &&
                                formState.errors.password.message
                              : null}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </>
                  ) : null}

                  <Col md="12">
                    <FormGroup>
                      <Label for="phone">Phone Number</Label>
                      <Input
                        type="text"
                        value={formState.values.phone || ""}
                        name="phone"
                        id="phone"
                        onChange={handleChange}
                        placeholder="Phone Number"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              Close
            </Button>{" "}
            <Button
              color="primary"
              disabled={!formState.isValid || exist || sending}
              type="submit"
            >
              {sending ? (
                <span>
                  {" "}
                  Saving data <i className="fa fa-spinner"></i>
                </span>
              ) : (
                "Save changes"
              )}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </Fragment>
  );
};

export default StaffForm;
