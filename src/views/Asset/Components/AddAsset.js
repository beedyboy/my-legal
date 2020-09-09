import React, { useEffect, useState, useContext, Fragment } from "react";
import dataHero from "data-hero";
import AssetStore from "../../../stores/AssetStore";
import {
  Button,
  ButtonGroup,
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
import Select from "react-select";
import { observer } from "mobx-react";
import CategoryStore from "../../../stores/CategoryStore";
import SubCategoryStore from "../../../stores/SubCategoryStore";
const schema = {
  name: {
    isEmpty: false,
    min: 1,
    message: "Asset name is required",
  },
  cat_id: {
    isEmpty: false,
    min: 1,
    message: "Category is required",
  },
  sub_id: {
    isEmpty: false,
    min: 1,
    message: "Sub Category is required",
  },
  purchased_price: {
    isEmpty: false,
    message: "Purchased price is required",
  },
};

const AddAsset = ({ mode, open, handleClose, initial_data }) => {
  const deptStore = useContext(AssetStore);
  const catStore = useContext(CategoryStore);
  const subStore = useContext(SubCategoryStore);
  const { createAsset, updateAsset, sending, close, toggleClose } = deptStore;
  const { info: categories } = catStore;
  const { getSubByCatId, catsubs } = subStore;
  const [title, setTitle] = useState("Add Asset");
  const [subCategories, setSubCategories] = useState([]);
  const [activeButton, setActiveButton] = useState("New");
  const [formState, setFormState] = useState({
    values: {
      id: "",
      name: "",
      cat_id: "",
      sub_id: "",
      purchased_price: "",
      serial: "",
      condition: "New",
      description: "",
      purchased_date: "",
      start_date: "",
      end_date: "",
      company_name: "",
    },
    touched: {},
    errors: {},
  });
  useEffect(() => {
    if (mode === "Edit") {
      setTitle("Edit Asset");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        getSubCategory(parseInt(data.cat_id));
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data.id,
            name: data && data.title,
            condition: data && data.condition,
            cat_id: data && data.cat_id,
            sub_id: data && data.sub_id,
            purchased_price: data && data.purchased_price,
            purchased_date: data && data.purchased_date,
            start_date: data && data.start_date,
            end_date: data && data.end_date,
            company_name: data && data.company_name,
            serial: data && data.serial,
            description: data && data.description,
          },
        }));
        handleButtonTab(data.condition);
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
          sub_id: "",
          purchased_price: "",
          purchased_date: "",
          serial: "",
          condition: "",
          description: "",
        },
      }));
    };
  }, [initial_data, mode]);
  useEffect(() => {
    const errors = dataHero.validate(schema, formState.values);
    setFormState((formState) => ({
      ...formState,
      isValid: errors.name.error || errors.purchased_price.error ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  useEffect(() => {
    setSubCategories(catsubs);
    return () => {
      setSubCategories([]);
    };
  }, [catsubs]);

  useEffect(() => {
    if (close === true) {
      resetForm();
      handleClose();
    }
    return () => {
      toggleClose();
    };
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
    if (event.target.name === "cat_id") {
      getSubCategory(event.target.value);
    }
  };
  const handleButtonTab = (data) => {
    if (activeButton != data) {
      setActiveButton(data);
      handleCondition(data);
    }
  };
  const handleCondition = (data) => {
    if (data === 'Leased') {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          condition: data,
          purchased_date: ''
        },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          condition: data,
          company_name: '',
          start_date: '',
          end_date: ''
        },
      }));
    }
  };

  const handleSubCategory = (e) => {
    if (e !== null) {
      setFormState((state) => ({
        ...state,
        values: {
          ...state.values,
          sub_id: e.value,
        },
        touched: {
          ...state.touched,
          sub_id: true,
        },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        values: {
          ...prev.values,
          sub_id: "",
        },
      }));
    }
  };
  const getSubCategory = (cat_id) => {
    // console.log({ cat_id });
    setSubCategories([]);
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        sub_id: "",
      },
    }));
    if (cat_id.length !== "") {
      getSubByCatId(parseInt(cat_id));
    }
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    mode === "Add"
      ? createAsset(formState.values)
      : updateAsset(formState.values);
  };
  const resetForm = () => {
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        id: "",
        name: "",
        cat_id: "",
        sub_id: "",
        purchased_price: "",
        serial: "",
        condition: "New",
        description: "",
        purchased_date: "",
        start_date: "",
        end_date: "",
        company_name: "",
      },
      touched: {
        ...formState.touched,
        name: false,
        cat_id: false,
        sub_id: false,
        purchased_price: false,
        serial: false,
        condition: false,
        description: false,
        purchased_date: false,
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
          {title}
        </ModalHeader>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <ModalBody>
            <Card>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup
                      className={hasError("name") ? "has-danger" : null}
                    >
                      <Label for="name">Asset Name</Label>
                      <Input
                        type="text"
                        value={formState.values.name || ""}
                        name="name"
                        id="name"
                        onChange={handleChange}
                        placeholder="Asset Name"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
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
                      <Label for="sub_id">Sub</Label>
                      <Select
                        placeholder="Select Option"
                        name="sub_id"
                        value={
                          subCategories.filter(
                            (obj) => obj.value === formState.values.sub_id
                          ) || ""
                        }
                        onChange={handleSubCategory}
                        isLoading={
                          subCategories && subCategories.length > 0
                            ? false
                            : true
                        }
                        isClearable={true}
                        options={subCategories}
                      />
                      <span
                        className={hasError("sub_id") ? "text-danger" : null}
                      >
                        {hasError("sub_id")
                          ? formState.errors.sub_id &&
                            formState.errors.sub_id.message
                          : null}
                      </span>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label for="serial">Serial</Label>
                      <Input
                        type="text"
                        value={formState.values.serial || ""}
                        name="serial"
                        id="serial"
                        onChange={handleChange}
                        placeholder="Serial"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <FormGroup>
                      <Label for="purchased_price">Price</Label>
                      <Input
                        type="text"
                        value={formState.values.purchased_price || ""}
                        name="purchased_price"
                        id="purchased_price"
                        onChange={handleChange}
                        placeholder="Price"
                      />
                    </FormGroup>
                  </Col>

                  <Col md="12" sm="12" className="mt-2">
                    <ButtonGroup>
                      <Button
                        color={activeButton === "New" ? "primary" : "info"}
                        onClick={(e) => handleButtonTab("New")}
                      >
                        New
                      </Button>
                      <Button
                        color={activeButton === "Leased" ? "primary" : "info"}
                        onClick={(e) => handleButtonTab("Leased")}
                      >
                        Leased
                      </Button>
                    </ButtonGroup>
                  </Col>

                  <Col
                    md="12"
                    className={activeButton === "Leased" ? "active" : "d-none"}
                  >
                    <FormGroup>
                      <Label for="start_date">Start Date</Label>
                      <Input
                        type="date"
                        value={formState.values.start_date || ""}
                        name="start_date"
                        id="start_date"
                        onChange={handleChange}
                        placeholder="Start Date"
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    md="12"
                    className={activeButton === "Leased" ? "active" : "d-none"}
                  >
                    <FormGroup>
                      <Label for="end_date">End Date</Label>
                      <Input
                        type="date"
                        value={formState.values.end_date || ""}
                        name="end_date"
                        id="end_date"
                        onChange={handleChange}
                        placeholder="End Date"
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    md="12"
                    className={activeButton === "Leased" ? "active" : "d-none"}
                  >
                    <FormGroup>
                      <Label for="company_name">Company Name</Label>
                      <Input
                        type="text"
                        value={formState.values.company_name || ""}
                        name="company_name"
                        id="company_name"
                        onChange={handleChange}
                        placeholder="Company Name"
                      />
                    </FormGroup>
                  </Col>

                  <Col
                    md="12"
                    className={activeButton === "New" ? "active" : "d-none"}
                  >
                    <FormGroup>
                      <Label for="purchased_date">Date</Label>
                      <Input
                        type="date"
                        value={formState.values.purchased_date || ""}
                        name="purchased_date"
                        id="purchased_date"
                        onChange={handleChange}
                        placeholder="Purchased Date"
                      />
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
              disabled={!formState.isValid || sending}
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

export default observer(AddAsset);
