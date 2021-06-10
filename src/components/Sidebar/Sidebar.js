import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Utils from "../../shared/localStorage";

const Sidebar = () => {
  const [superMenu, setSuperMenu] = useState({
    asset: false,
    inventory: false,
    ticketing: false,
    settings: false,
  });
  const getSuper = (item, value) => {
    setSuperMenu((state) => ({
      ...state,
      [item]: !value,
    }));
  };
  let acl;
  const obj = Utils.get("acl");
  if (obj && obj !== "") {
    acl = JSON.parse(obj);
  }

  const blogAdd = acl && acl.blog && acl.blog.add;
  const blogDel = acl && acl.blog && acl.blog.del;
  const blogView = acl && acl.blog && acl.blog.view;

  let totalBlog = blogAdd && blogDel && blogView;

  let totalStaff =
    Utils.canAccess("staff", "add") ||
    Utils.canAccess("staff", "view") ||
    Utils.canAccess("staff", "del") ||
    Utils.canAccess("staff", "modify");

  const staffAdd = acl && acl.staff && acl.staff.add;
  const staffDel = acl && acl.staff && acl.staff.del;
  const staffView = acl && acl.staff && acl.staff.view;

  let totalStaff = staffAdd && staffDel && staffView;

  return (
    <Fragment>
      <ul className="sidebar_menu">
        <li>
          <Link to="/dashboard">
            <span className="icon">
              <i className="fa fa-dashboard" aria-hidden="true"></i>
            </span>
            <span className="title">Dashboard</span>
          </Link>
        </li>

        {totalBlog ? (
          <li>
            <Link to="/blog">
              <span className="icon">
                <i className="fa fa-group" aria-hidden="true"></i>
              </span>
              <span className="title">Blog</span>
            </Link>
          </li>
        ) : null}

        {totalStaff ? (
          <li>
            <Link to="/staff">
              <span className="icon">
                <i className="fa fa-group" aria-hidden="true"></i>
              </span>
              <span className="title">Staff</span>
            </Link>
          </li>
        ) : null}
      </ul>
    </Fragment>
  );
};

export default Sidebar;
