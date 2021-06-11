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
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; 

const schema = {
  title: {
    isEmpty: false,
    min: 1,
    message: "Blog title is required",
  },
  content: {
    isEmpty: false,
    min: 1,
    message: "content is required",
  },
};
const BlogForm = ({ mode, store, open, toggle, initial_data }) => {
  const { createBlog, updateBlog, sending, close, exist } = store;
  const [pageTitle, setPageTitle] = useState("Add Blog");
  const [formState, setFormState] = useState({
    values: {
      id: "",
      title: "",
      content: "",
      published: false,
    },
    touched: {},
    errors: {},
  });
  const [uploadImage, setUploadImage] = useState({
    touched: false,
    preview: "",
    file: "choose file",
  });
  useEffect(() => {
    if (mode === "Edit") {
      setPageTitle("Edit Blog");
      let shouldSetData = typeof initial_data !== "undefined" ? true : false;
      if (shouldSetData) {
        const data = initial_data;
        setFormState((state) => ({
          ...state,
          values: {
            ...state.values,
            id: data && data.id,
            title: data && data.title,
            content: data && data.content,
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
          title: "",
          content: "",
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
        errors.title.error ||
        errors.content.error ||
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
      toggle();
    }
  }, [close]);

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

  const handleContentChange = (e) => {
    setFormState((state) => ({
      ...state,
      values: {
        ...state.values,
        content: e,
      },
      touched: {
        ...state.touched,
        content: true,
      },
    }));
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field].error;

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", uploadImage.file);
    fd.append("name", formState.values.name);
    fd.append("cat_id", formState.values.cat_id);
    fd.append("branch_id", formState.values.branch_id);
    fd.append("description", formState.values.description);
    mode === "Add" ? createBlog(fd) : updateBlog(formState.values);
  };
  const resetForm = () => {
    setFormState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        id: "",
        title: "",
        content: "",
        published: false,
      },
      touched: {
        ...formState.touched,
        title: false,
        content: false,
        published: false,
      },
      errors: {},
    }));
  };
  const closeBtn = (
    <Button className="close" onClick={toggle}>
      &times;
    </Button>
  );
  return (
    <Fragment>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          {pageTitle}
        </ModalHeader>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <ModalBody>
            <Card>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup
                      className={hasError("title") ? "has-danger" : null}
                    >
                      <Label for="deptName">title</Label>
                      <Input
                        type="text"
                        value={formState.values.title || ""}
                        name="title"
                        id="title"
                        onChange={handleChange}
                        placeholder="title"
                        invalid={hasError("title")}
                      />
                      <FormFeedback>
                        {hasError("title")
                          ? formState.errors.title &&
                            formState.errors.title.message
                          : null}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup
                      className={hasError("content") ? "has-danger" : null}
                    >
                      <Label for="deptName">content</Label>
                      <SunEditor
                        onChange={handleContentChange}
                        name="content"
                        setContents={formState.values.content}
                      />
                      <FormFeedback>
                        {hasError("content")
                          ? formState.errors.content &&
                            formState.errors.content.message
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
                </Row>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
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

export default BlogForm;
