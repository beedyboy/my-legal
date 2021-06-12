import React, { useContext, useState, Fragment, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import Utils from "../../shared/localStorage";
import BlogStore from "../../stores/BlogStore";
import BlogList from "./Components/BlogList";
import BlogForm from "./Components/BlogForm";

const Blog = () => {
  const store = useContext(BlogStore);
  const {
    blogs,
    getBlogs,
    removeBlog,
    resetProperty,
    message,
    error,
    action,
    removed,
  } = store;
  const [mode, setMode] = useState("");
  const [rowData, setRowData] = useState();
  const [modal, setModal] = useState(false);
  const [acl, setACL] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    getBlogs();
  }, []);
  const handleClose = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (removed === true) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return () => {
      resetProperty("removed", false);
      resetProperty("message", "");
    };
  }, [removed]);
  useEffect(() => {
    if (action === "newBlog") {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setModal(false);
    }
    return () => {
      resetProperty("message", "");
      resetProperty("action", "");
      setModal(false);
    };
  }, [action]);
  useEffect(() => {
    if (error === true && action === "newBlogError") {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    return () => {
      resetProperty("error", false);
      resetProperty("message", "");
      resetProperty("action", "");
      setModal(false);
    };
  }, [error]);
  const createBlog = () => {
    setModal(true);
    setMode("Add");
  };
  let canDel = Utils.canAccess("blog", "del");
  let canModify = Utils.canAccess("blog", "modify");
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <Row>
            <Col md="5" sm="12">
              <h5>Blog Management</h5>
            </Col>
            <Col md={{ size: 3, offset: 4 }} sm="12">
              {Utils.canAccess("blog", "add") ? (
                <Fragment>
                  {" "}
                  <Button
                    color="secondary"
                    className="float-right"
                    onClick={createBlog}
                  >
                    Add Blog
                  </Button>{" "}
                </Fragment>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12" sm="12" className="mt-2">
              <BlogList
                canDel={canDel}
                canModify={canModify}
                data={blogs}
                setMode={setMode}
                setId={setId}
                toggle={handleClose}
                removeData={removeBlog}
                rowData={setRowData}
              />
            </Col>
          </Row>
          <BlogForm
            mode={mode}
            open={modal}
            toggle={handleClose}
            store={store}
            initial_data={rowData}
          />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default observer(Blog);
