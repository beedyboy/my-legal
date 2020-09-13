import React, { useEffect, useState, useContext, Fragment } from "react";
import dataHero from "data-hero";
import ProductStore from "../../../stores/ProductStore";
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
import { observer } from "mobx-react";
import BranchStore from "../../../stores/BranchStore";
import CategoryStore from "../../../stores/CategoryStore";
const schema = {
  name: {
    isEmpty: false,
    min: 1,
    message: "A valid product name is required",
  },
  cat_id: {
    isEmpty: false,
    message: "Category is required",
  },
  branch_id: {
    isEmpty: false,
    message: "Branch is required",
  },
};
const AddProduct = ({ mode, open, handleClose, initial_data }) => {
  const branchStore = useContext(BranchStore);
  const catStore = useContext(CategoryStore);
  const prodStore = useContext(ProductStore);
  const { info: branches } = branchStore;
  const { info: categories } = catStore;
  const {
    createProduct,
    updateProduct,
    confirmProduct,
    sending,
    exist,
    close,
  } = prodStore;
  const [title, setTitle] = useState("Add Product");
  const [uploadImage, setUploadImage] = useState({
    touched: false,
    preview: "",
    file: "choose file",
  });
  const [formState, setFormState] = useState({
    values: { id: "", name: "", cat_id: "", branch_id: "", description: "" },
    touched: {},
    errors: {},
  });
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Product");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data.id,
            name: data && data.name,
            cat_id: data && data.cat_id,
            branch_id: data && data.branch_id,
            description: data && data.description,
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
          name: "",
          cat_id: "",
          branch_id: "",
          description: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.name.error || uploadImage.toggle === false ? false : true,
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
    if (
      (event.target.name === "name" ||
        event.target.name === "branch_id" ||
        event.target.name === "cat_id") &&
      formState.values.cat_id !== "" &&
      formState.values.branch_id !== "" &&
      formState.values.name.length > 0
    ) {
      confirmProduct(
        formState.values.cat_id,
        formState.values.branch_id,
        formState.values.name
      );
    }
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const readURI = (e) => {
    e.persist();
    let reader = new FileReader();
    let image = e.target.files[0];
    reader.onloadend = () => {
      setUploadImage((state) => ({
        ...state,
        touched: true,
        preview: reader.result,
        file: image,
      }));
    };
    reader.readAsDataURL(image);
  };

  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        name: "",
        cat_id: "",
        branch_id: "",
        description: "",
      },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", uploadImage.file);
    fd.append("name", formState.values.name);
    fd.append("cat_id", formState.values.cat_id);
    fd.append("branch_id", formState.values.branch_id);
    fd.append("description", formState.values.description);
    mode === "Add" ? createProduct(fd) : updateProduct(formState.values);
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
                      className={hasError("cat_id") ? "has-danger" : null}
                    >
                      <Label for="cat_id">Category</Label>
                      <Input
                        type="select"
                        value={formState.values.cat_id || ""}
                        name="cat_id"
                        id="cat_id"
                        invalid={hasError("cat_id")}
                        onChange={handleChange}
                      >
                        <option value="">select</option>
                        {categories &&
                          categories.map((category) => (
                            <option value={category.id} key={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </Input>
                      <FormFeedback>
                        {hasError("cat_id")
                          ? formState.errors.cat_id &&
                            formState.errors.cat_id.message
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="branch_id">Branch</Label>
                      <Input
                        type="select"
                        value={formState.values.branch_id || ""}
                        name="branch_id"
                        id="branch_id"
                        invalid={hasError("branch_id")}
                        onChange={handleChange}
                      >
                        <option value="">select</option>
                        {branches &&
                          branches.map((branch) => (
                            <option value={branch.id} key={branch.id}>
                              {branch.name}
                            </option>
                          ))}
                      </Input>
                      <FormFeedback>
                        {hasError("branch_id")
                          ? formState.errors.branch_id &&
                            formState.errors.branch_id.message
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="image">Image</Label>
                      <Input
                        accept="image/*"
                        type="file"
                        name="image"
                        id="image"
                        onChange={readURI}
                      />
                      <FormFeedback>
                        {uploadImage.touched ? null : "Image is important"}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    {uploadImage.touched ? (
                      <img
                        src={uploadImage.preview}
                        alt="First"
                        style={{ width: "100%", height: 90 }}
                      />
                    ) : null}
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label for="deptName">Product Name</Label>
                      <Input
                        type="text"
                        value={formState.values.name || ""}
                        name="name"
                        id="deptName"
                        onChange={handleChange}
                        placeholder="Product Name"
                        invalid={hasError("name") || exist}
                      />
                      <FormFeedback>
                        {hasError("name")
                          ? "Name field must be a minimum of 2 characters"
                          : null}
                        <p> {exist ? "This product already exist" : null}</p>
                      </FormFeedback>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        type="textarea"
                        value={formState.values.description || ""}
                        name="description"
                        id="description"
                        onChange={handleChange}
                        placeholder="Enter description"
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
              disabled={!formState.isValid || sending || exist}
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

export default observer(AddProduct);
