import { makeObservable, observable, action, computed } from "mobx";
import { createContext } from "react";
import backend from "../config";

class BlogStore {
  error = false; 
  loading = false;
  sending = false;
  removed = false; 
  blogs = [];
  blog = []; 
  message = "";
  action = null;

  constructor() {
    makeObservable(this, {
      message: observable,
      sending: observable, 
      error: observable, 
      action: observable,
      removed: observable, 
      loading: observable,
      blog: observable,
      blogs: observable,
      getBlogs: action, 
      createBlog: action, 
      updateBlog: action,
      removeBlog: action,
      resetProperty: action, 
      stats: computed,
    });
  }
  getBlogs = () => {
    this.loading = true;
    try {
      backend.get("/blogs").then((res) => {
        this.loading = false;
        if (res.status === 200) {
          this.blogs = res.data;
        }
      });
    } catch (err) {
      this.error = err;
    }
  };
 
  createBlog = (data) => {
    try {
      this.sending = true;
      backend.post("blogs", data).then((res) => {
        this.sending = false;
        if (res.status === 201) {
          this.getBlogs();
          this.message = res.data.message;
          this.action = "newBlog";
        } else {
          this.message = res.data.error;
          this.action = "newBlogError";
          this.error = true;
        }
      });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  updateBlog = (blog) => {
    try {
      this.sending = true;
      backend
        .put(`blogs`, blog)
        .then((res) => {
          this.sending = false;
          if (res.status === 200) {
            this.getBlogs();
            this.message = res.data.message;
            this.action = "newBlog";
          } else {
            this.message = res.data.error;
            this.error = true;
            this.action = "newBlogError";
          }
        })
        .catch((err) => {
          this.sending = false;
          console.log({ err });
          if (err && err.response) {
            console.log("status", err.response.status);
          }
        });
    } catch (error) {
      this.sending = false;
      console.log({ error });
    }
  };
  removeBlog = (id) => {
    this.removed = false;
    try {
      backend.delete(`blogs/${id}`).then((res) => {
        if (res.status === 200) {
          this.getBlogs();
          this.message = res.data.message;
          this.removed = true;
        } else {
          this.message = res.data.error;
          this.error = true;
          this.removed = false;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  resetProperty = (key, value) => {
    this[key] = value;
  };
  get stats() {
    return this.blogs.length;
  } 
}

export default createContext(new BlogStore());
