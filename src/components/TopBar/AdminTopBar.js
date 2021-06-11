import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Utils from "../../shared/localStorage";

const AdminTopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <div className="logos">MLS</div>
      <div>Welcome {Utils.get("name")} </div>
      <ul>
        <li className="right-icon-btn">
          <i className="fa fa-search"></i>
        </li>
        <li className="right-icon-link">
          <Link to="/profile">
            <i className="fa fa-user"></i>
          </Link>
        </li>
        <li className="right-icon-btn" onClick={(e) => Utils.logout()}>
          <i className="fa fa-sign-out"></i>
        </li>
      </ul>
    </Fragment>
  );
};
export default AdminTopBar;
