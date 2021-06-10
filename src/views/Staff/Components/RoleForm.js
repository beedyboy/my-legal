import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
const RoleForm = ({ handleClose, open, id, initial_data, toggle, store }) => {
  const {
    assignRole,
    resetProperty: reset,
    message,
    action,
    error,
    sending,
  } = store;

  const [priviledges, setPriviledges] = useState({
    blog: { add: false, view: false, del: false },
    subscriber: { add: false, view: false, del: false },
    staff: { add: false, view: false, del: false, modify: false },
  });

  useLayoutEffect(() => {
    const data = initial_data && initial_data.roles;
    const id = initial_data && initial_data.id;
    setId(id);
    if (data) {
      setPriviledges((state) => ({
        ...state,
        blog: {
          add: (data && data.blog.add) || false,
          view: (data && data.blog.view) || false,
          del: (data && data.blog.del) || false,
        },
        subscriber: {
          add: (data && data.subscriber.add) || false,
          view: (data && data.subscriber.view) || false,
          del: (data && data.subscriber.del) || false,
        },
        staff: {
          add: (data && data.staff.add) || false,
          view: (data && data.staff.view) || false,
          del: (data && data.staff.del) || false,
          modify: (data && data.staff.modify) || false,
        },
      }));
    }
  }, [initial_data]);

  useEffect(() => {
    if (action === "hasRole") {
      resetForm();
    }
    return () => {
      reset("saved", false);
      reset("message", "");
      resetForm();
      toggle(false);
    };
  }, [action]);

  useEffect(() => {
    if (error === true && action === "hasRoleError") {
    }
    return () => {
      reset("error", false);
      reset("message", "");
      resetForm();
      toggle(false);
    };
  }, [error]);

  const handleRoleChange = (event, role) => {
    event.persist();
    setPriviledges((formState) => ({
      ...formState,
      [role]: {
        ...formState[role],
        [event.target.name]: event.target.checked,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      priviledges,
      id: parseInt(id),
    };
    assignRole(data);
  };
  const resetForm = () => {
    setPriviledges((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        blog: { add: false, view: false, del: false },
        subscriber: { add: false, view: false, del: false },
        staff: { add: false, view: false, del: false, modify: false },
      },
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
          {" "}
          Access Level
        </ModalHeader>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <ModalBody>
            <Card>
              <CardBody>
                <h4 className="title"> Assign responsibility </h4>
                <Row>
                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Blog:</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.blog.add || false}
                          name="add"
                          onChange={(event) => handleRoleChange(event, "blog")}
                        />
                        Add
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.blog.view || false}
                          name="view"
                          onChange={(event) => handleRoleChange(event, "blog")}
                        />
                        View
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.blog.del || false}
                          name="del"
                          onChange={(event) => handleRoleChange(event, "blog")}
                        />
                        Del
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Subscribers</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.subscriber.add || false}
                          name="add"
                          onChange={(event) =>
                            handleRoleChange(event, "subscriber")
                          }
                        />
                        Add
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.subscriber.view || false}
                          name="view"
                          onChange={(event) =>
                            handleRoleChange(event, "subscriber")
                          }
                        />
                        View
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.subscriber.del || false}
                          name="del"
                          onChange={(event) =>
                            handleRoleChange(event, "subscriber")
                          }
                        />
                        Del
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Staff</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.staff.add || false}
                          name="add"
                          onChange={(event) => handleRoleChange(event, "staff")}
                        />
                        Add
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.staff.view || false}
                          name="view"
                          onChange={(event) => handleRoleChange(event, "staff")}
                        />
                        View
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.staff.del || false}
                          name="del"
                          onChange={(event) => handleRoleChange(event, "staff")}
                        />
                        Del
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.staff.modify || false}
                          name="modify"
                          onChange={(event) => handleRoleChange(event, "staff")}
                        />
                        Modify
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button color="primary" disabled={sending} type="submit">
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
        </Form>
      </Modal>
    </Fragment>
  );
};

export default RoleForm;
