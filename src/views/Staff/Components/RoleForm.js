import React, {
  Fragment,
  useEffect,
  useLayoutEffect,
  useContext,
  useState,
} from "react";
import { observer } from "mobx-react";
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
import UserStore from "../../../stores/UserStore";

const RoleForm = ({ handleClose, open, id, initial_data }) => {
  const userStore = useContext(UserStore);
  const { assignRole, closeACL, toggleACLClose, sending } = userStore;

  const [priviledges, setPriviledges] = useState({
    asset: { add: false, view: false, del: false, modify: false },
    branch: { add: false, view: false, del: false },
    category: { add: false, view: false, del: false },
    company: { manage: false },
    department: { add: false, view: false, del: false },
    leave: { add: false, view: false, del: false },
    pos: { sell: false, view: false, modify: false },
    product: { add: false, view: false, del: false },
    staff: { add: false, view: false, del: false, modify: false },
    stock: { add: false, view: false, del: false },
    ticket: { create: false, manage: false },
    report: { manage: false },
  });

  useLayoutEffect(() => {
    let shouldSetPriviledges =
      typeof initial_data !== "undefined" ? true : false;
    if (shouldSetPriviledges) {
      const acl = initial_data && initial_data.acl;
      let data;
      data = JSON.parse(acl);
      setPriviledges((state) => ({
        ...state,
        asset: {
          add: (data && data.asset.add) || false,
          view: (data && data.asset.view) || false,
          del: (data && data.asset.del) || false,
          modify: (data && data.asset.modify) || false,
        },
        branch: {
          add: (data && data.branch.add) || false,
          view: (data && data.branch.view) || false,
          del: (data && data.branch.del) || false,
        },
        category: {
          add: (data && data.category.add) || false,
          view: (data && data.category.view) || false,
          del: (data && data.category.del) || false,
        },
        company: {
          manage: (data && data.company.manage) || false,
        },
        department: {
          add: (data && data.department.add) || false,
          view: (data && data.department.view) || false,
          del: (data && data.department.del) || false,
        },
        leave: {
          add: (data && data.leave && data.leave.add) || false,
          view: (data && data.leave && data.leave.view) || false,
          del: (data && data.leave && data.leave.del) || false,
        },
        pos: {
          sell: (data && data.pos.sell) || false,
          view: (data && data.pos.view) || false,
          modify: (data && data.pos.modify) || false,
        },
        product: {
          add: (data && data.product.add) || false,
          view: (data && data.product.view) || false,
          del: (data && data.product.del) || false,
        },
        staff: {
          add: (data && data.staff.add) || false,
          view: (data && data.staff.view) || false,
          del: (data && data.staff.del) || false,
          modify: (data && data.staff.modify) || false,
        },
        stock: {
          add: (data && data.stock.add) || false,
          view: (data && data.stock.view) || false,
          del: (data && data.stock.del) || false,
        },
        ticket: {
          create: (data && data.ticket.create) || false,
          manage: (data && data.ticket.manage) || false,
        },
        report: {
          manage: (data && data.report.manage) || false,
        },
      }));
    }
  }, [initial_data]);

  useEffect(() => {
    if (closeACL === true) {
      resetForm();
      toggleACLClose();
    }
  }, [closeACL]);
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
        asset: { add: false, view: false, del: false, modify: false },
        branch: { add: false, view: false, del: false },
        category: { add: false, view: false, del: false },
        company: { manage: false },
        department: { add: false, view: false, del: false },
        leave: { add: false, view: false, del: false },
        pos: { sell: false, view: false, modify: false },
        product: { add: false, view: false, del: false },
        staff: { add: false, view: false, del: false, modify: false },
        stock: { add: false, view: false, del: false },
        ticket: { create: false, manage: false },
        report: { manage: false },
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
                    <Label className="border-bottom bg-info">Asset:</Label>
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.asset.add || false}
                          name="add"
                          onChange={(event) => handleRoleChange(event, "asset")}
                        />
                        Add
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.asset.view || false}
                          name="view"
                          onChange={(event) => handleRoleChange(event, "asset")}
                        />
                        View
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.asset.del || false}
                          name="del"
                          onChange={(event) => handleRoleChange(event, "asset")}
                        />
                        Del
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.asset.modify || false}
                          name="modify"
                          onChange={(event) => handleRoleChange(event, "asset")}
                        />
                        Modify
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Branch:</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.branch.add || false}
                          name="add"
                          onChange={(event) =>
                            handleRoleChange(event, "branch")
                          }
                        />
                        Add
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.branch.view || false}
                          name="view"
                          onChange={(event) =>
                            handleRoleChange(event, "branch")
                          }
                        />
                        View
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.branch.del || false}
                          name="del"
                          onChange={(event) =>
                            handleRoleChange(event, "branch")
                          }
                        />
                        Del
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Category:</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.category.add || false}
                          name="add"
                          onChange={(event) =>
                            handleRoleChange(event, "category")
                          }
                        />
                        Add
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.category.view || false}
                          name="view"
                          onChange={(event) =>
                            handleRoleChange(event, "category")
                          }
                        />
                        View
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.category.del || false}
                          name="del"
                          onChange={(event) =>
                            handleRoleChange(event, "category")
                          }
                        />
                        Del
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Company:</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.company.manage || false}
                          name="manage"
                          onChange={(event) =>
                            handleRoleChange(event, "company")
                          }
                        />
                        Manage
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Department:</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.department.add || false}
                          name="add"
                          onChange={(event) =>
                            handleRoleChange(event, "department")
                          }
                        />
                        Add
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.department.view || false}
                          name="view"
                          onChange={(event) =>
                            handleRoleChange(event, "department")
                          }
                        />
                        View
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.department.del || false}
                          name="del"
                          onChange={(event) =>
                            handleRoleChange(event, "department")
                          }
                        />
                        Del
                      </Label>
                    </FormGroup>
                  </Col>


                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Vacation:</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.leave.add || false}
                          name="add"
                          onChange={(event) =>
                            handleRoleChange(event, "leave")
                          }
                        />
                        Add
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.leave.view || false}
                          name="view"
                          onChange={(event) =>
                            handleRoleChange(event, "leave")
                          }
                        />
                        View
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.leave.del || false}
                          name="del"
                          onChange={(event) =>
                            handleRoleChange(event, "leave")
                          }
                        />
                        Del
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">POS</Label> <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.pos.sell || false}
                          name="sell"
                          onChange={(event) => handleRoleChange(event, "pos")}
                        />
                        Sell
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.pos.view || false}
                          name="view"
                          onChange={(event) => handleRoleChange(event, "pos")}
                        />
                        View
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.pos.modify || false}
                          name="modify"
                          onChange={(event) => handleRoleChange(event, "pos")}
                        />
                        Modify
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Products</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.product.add || false}
                          name="add"
                          onChange={(event) =>
                            handleRoleChange(event, "product")
                          }
                        />
                        Add
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.product.view || false}
                          name="view"
                          onChange={(event) =>
                            handleRoleChange(event, "product")
                          }
                        />
                        View
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.product.del || false}
                          name="del"
                          onChange={(event) =>
                            handleRoleChange(event, "product")
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

                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Stock</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.stock.add || false}
                          name="add"
                          onChange={(event) => handleRoleChange(event, "stock")}
                        />
                        Add
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.stock.view || false}
                          name="view"
                          onChange={(event) => handleRoleChange(event, "stock")}
                        />
                        View
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.stock.del || false}
                          name="del"
                          onChange={(event) => handleRoleChange(event, "stock")}
                        />
                        Del
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Ticket</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.ticket.create || false}
                          name="create"
                          onChange={(event) =>
                            handleRoleChange(event, "ticket")
                          }
                        />
                        Create
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.ticket.manage || false}
                          name="manage"
                          onChange={(event) =>
                            handleRoleChange(event, "ticket")
                          }
                        />
                        Manage
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12" className="border mb-1">
                    <Label className="border-bottom bg-info">Report:</Label>{" "}
                    <br />
                    <FormGroup check inline>
                      <Label>
                        <Input
                          type="checkbox"
                          checked={priviledges.report.manage || false}
                          name="manage"
                          onChange={(event) =>
                            handleRoleChange(event, "report")
                          }
                        />
                        Manage
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

export default observer(RoleForm);
