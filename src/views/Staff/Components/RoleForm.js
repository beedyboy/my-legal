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
    asset: { add: false, view: false, del: false },
    branch: { add: false, view: false, del: false },
    department: { add: false, view: false, del: false },
    pos: { sell: false, view: false, modify: false },
    product: { add: false, view: false, del: false },
    staff: { add: false, view: false, del: false },
    stock: { add: false, view: false, del: false },
    ticket: { create: false, assign: false },
  });

  useLayoutEffect(() => {
    let shouldSetPriviledges =
      typeof initial_data !== "undefined" ? true : false;
    if (shouldSetPriviledges) {
      const d = initial_data && initial_data.name;
      const data = initial_data && initial_data.priviledges;
      setPriviledges((state) => ({
        ...state,
        asset: {
          add: data && data.asset.add,
          view: data && data.asset.view,
          del: data && data.asset.del,
        },
        branch: {
          add: data && data.branch.add,
          view: data && data.branch.view,
          del: data && data.branch.del,
        },
        department: {
          add: data && data.department.add,
          view: data && data.department.view,
          del: data && data.department.del,
        },
        pos: {
          sell: data && data.pos.sell,
          view: data && data.pos.view,
          modify: data && data.pos.modify,
        },
        product: {
          add: data && data.product.add,
          view: data && data.product.view,
          del: data && data.product.del,
        },
        staff: {
          add: data && data.staffs.add,
          view: data && data.staffs.view,
          del: data && data.staffs.del,
        },
        stock: {
          add: data && data.stock.add,
          view: data && data.stock.view,
          del: data && data.stock.del,
        },
        ticket: {
          create: data && data.ticket.create,
          assign: data && data.ticket.assign,
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
        asset: { add: false, view: false, del: false },
        branch: { add: false, view: false, del: false },
        department: { add: false, view: false, del: false },
        pos: { sell: false, view: false, modify: false },
        product: { add: false, view: false, del: false },
        staff: { add: false, view: false, del: false },
        stock: { add: false, view: false, del: false },
        ticket: { create: false, assign: false },
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
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <ModalBody>
            <Card>
              <CardBody>
                <h4 className="title"> Assign responsibility </h4>
                <Row>
                  <Col md="12">
                    <Label>Asset:</Label>
                    <br />
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.asset.add || false}
                          name="add"
                          onChange={(event) => handleRoleChange(event, "asset")}
                        />
                        Add
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.asset.view || false}
                          name="view"
                          onChange={(event) => handleRoleChange(event, "asset")}
                        />
                        View
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.asset.del || false}
                          name="del"
                          onChange={(event) => handleRoleChange(event, "asset")}
                        />
                        Del
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <Label>Branch:</Label> <br />
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.branch.add || false}
                          name="add"
                          onChange={(event) =>
                            handleRoleChange(event, "branch")
                          }
                        />
                        Add
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.branch.view || false}
                          name="view"
                          onChange={(event) =>
                            handleRoleChange(event, "branch")
                          }
                        />
                        View
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.branch.del || false}
                          name="del"
                          onChange={(event) =>
                            handleRoleChange(event, "branch")
                          }
                        />
                        Del
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <Label>Department:</Label> <br />
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.department.add || false}
                          name="add"
                          onChange={(event) =>
                            handleRoleChange(event, "department")
                          }
                        />
                        Add
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.department.view || false}
                          name="view"
                          onChange={(event) =>
                            handleRoleChange(event, "department")
                          }
                        />
                        View
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.department.del || false}
                          name="del"
                          onChange={(event) =>
                            handleRoleChange(event, "department")
                          }
                        />
                        Del
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <Label>POS</Label> <br />
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.pos.sell || false}
                          name="sell"
                          onChange={(event) => handleRoleChange(event, "pos")}
                        />
                        Sell
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.pos.view || false}
                          name="view"
                          onChange={(event) => handleRoleChange(event, "pos")}
                        />
                        View
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.pos.modify || false}
                          name="modify"
                          onChange={(event) => handleRoleChange(event, "pos")}
                        />
                        Modify
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <Label>Products</Label> <br />
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.product.add || false}
                          name="add"
                          onChange={(event) =>
                            handleRoleChange(event, "product")
                          }
                        />
                        Add
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.product.view || false}
                          name="view"
                          onChange={(event) =>
                            handleRoleChange(event, "product")
                          }
                        />
                        View
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.product.del || false}
                          name="del"
                          onChange={(event) =>
                            handleRoleChange(event, "product")
                          }
                        />
                        Del
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <Label>Staff</Label> <br />
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.staff.add || false}
                          name="add"
                          onChange={(event) => handleRoleChange(event, "staff")}
                        />
                        Add
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.staff.view || false}
                          name="view"
                          onChange={(event) => handleRoleChange(event, "staff")}
                        />
                        View
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.staff.del || false}
                          name="del"
                          onChange={(event) => handleRoleChange(event, "staff")}
                        />
                        Del
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <Label>Stock</Label> <br />
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.stock.add || false}
                          name="add"
                          onChange={(event) => handleRoleChange(event, "stock")}
                        />
                        Add
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.stock.view || false}
                          name="view"
                          onChange={(event) => handleRoleChange(event, "stock")}
                        />
                        View
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.stock.del || false}
                          name="del"
                          onChange={(event) => handleRoleChange(event, "stock")}
                        />
                        Del
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <Label>Ticket</Label> <br />
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.ticket.create || false}
                          name="create"
                          onChange={(event) =>
                            handleRoleChange(event, "ticket")
                          }
                        />
                        Create
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label className="form-check-label">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          checked={priviledges.ticket.assign || false}
                          name="assign"
                          onChange={(event) =>
                            handleRoleChange(event, "ticket")
                          }
                        />
                        Assign
                        <span className="form-check-sign">
                          <span className="check"></span>
                        </span>
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
            <Button
              color="primary"
              disabled={  sending}
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

export default observer(RoleForm);
