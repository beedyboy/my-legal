import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Utility from "../../services/UtilityService";

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

  let totalAsset =
    Utility.canAccess("asset", "add") ||
    Utility.canAccess("asset", "view") ||
    Utility.canAccess("asset", "del") ||
    Utility.canAccess("asset", "modify");

  let totalBranch =
    Utility.canAccess("branch", "add") ||
    Utility.canAccess("branch", "view") ||
    Utility.canAccess("branch", "del");

    let company = Utility.canAccess("company", "manage");
  let totalCategory =
    Utility.canAccess("category", "add") ||
    Utility.canAccess("category", "view") ||
    Utility.canAccess("category", "del");

  let totalDept =
    Utility.canAccess("department", "add") ||
    Utility.canAccess("department", "view") ||
    Utility.canAccess("department", "del");

    let totalPos =
    Utility.canAccess("pos", "sell") ||
    Utility.canAccess("pos", "view") ||
    Utility.canAccess("pos", "modify");
    
    let totalProduct =
    Utility.canAccess("product", "add") ||
    Utility.canAccess("product", "view") ||
    Utility.canAccess("product", "del");


  let totalStaff =
    Utility.canAccess("staff", "add") ||
    Utility.canAccess("staff", "view") ||
    Utility.canAccess("staff", "del") ||
    Utility.canAccess("staff", "modify");

  let totalTicket =
    Utility.canAccess("ticket", "create") ||
    Utility.canAccess("ticket", "manage");

     
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

        {totalAsset ? (
          <li className="super">
            <span className="icon">
              <i className="fa fa-product-hunt" aria-hidden="true"></i>
            </span>
            <span
              className="title"
              onClick={(e) => getSuper("asset", superMenu.asset)}
            >
              Asset<i className="fa fa-chevron-down caret"></i>
            </span>
            <ul className={`submenu ${superMenu.asset ? " show" : ""}`}>
              <li>
                <Link to="/asset">Manage Asset </Link>
              </li>
              {Utility.canAccess("asset", "view") ? (
                <li>
                  <Link to="/maintenance">Maintenance </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </li>
        ) : (
          ""
        )}

        {totalStaff ? (
          <li>
            <Link to="/staff">
              <span className="icon">
                <i className="fa fa-group" aria-hidden="true"></i>
              </span>
              <span className="title">Staff</span>
            </Link>
          </li>
        ) : (
          ""
        )}
        {totalPos || totalProduct?
        <Fragment>
        <li className="super">
          <span className="icon">
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          </span>
          <span
            className="title"
            onClick={(e) => getSuper("inventory", superMenu.inventory)}
          >
            Inventory<i className="fa fa-chevron-down caret"></i>
          </span>
          <ul className={`submenu ${superMenu.inventory ? " show" : ""}`}>
           {totalProduct? <li>
              <Link to="/product">Product</Link>
            </li>
            : ''}
           {totalPos? <li>
              <Link to="/pos">pos</Link>
            </li> : ''}
          </ul>
        </li>
        </Fragment>
        : ''}
        {totalTicket ? (
          <Fragment>
            <li className="super">
              <span className="icon">
                <i className="fa fa-ticket" aria-hidden="true"></i>
              </span>
              <span
                className="title"
                onClick={(e) => getSuper("ticketing", superMenu.ticketing)}
              >
                Ticketing<i className="fa fa-chevron-down caret"></i>
              </span>
              <ul className={`submenu ${superMenu.ticketing ? " show" : ""}`}>
                {Utility.canAccess("ticket", "manage") ? (
                  <li>
                    <Link to="/admin/ticket">Admin </Link>
                  </li>
                ) : (
                  ""
                )}
                {Utility.canAccess("ticket", "create") ? (
                  <li>
                    <Link to="/ticket">Ticket </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </li>
          </Fragment>
        ) : (
          ""
        )}
         {totalCategory || totalBranch || totalDept || company ?
         <Fragment>
        <li className="super">
          <span className="icon">
            <i className="fa fa-cog" aria-hidden="true"></i>
          </span>
          <span
            className="title"
            onClick={(e) => getSuper("settings", superMenu.settings)}
          >
            Settings<i className="fa fa-chevron-down caret"></i>
          </span>
          <ul className={`submenu ${superMenu.settings ? " show" : ""}`}>
            {totalBranch ? (
              <li>
                <Link to="/branch">Branch </Link>
              </li>
            ) : (
              ""
            )}
            {company ? (
              <li>
                <Link to="/company">Company </Link>
              </li>
            ) : (
              ""
            )}
            {totalDept ? (
              <li>
                <Link to="/department">Department </Link>
              </li>
            ) : (
              ""
            )}
            {totalCategory ? (
              <Fragment>
                <li>
                  <Link to="/category">Category </Link>
                </li>
                <li>
                  <Link to="/subcategory">Sub Category</Link>
                </li>
              </Fragment>
            ) : (
              ""
            )}
          </ul>
        </li>
        </Fragment>
        :''}
        {Utility.canAccess("report", "manage") ? (
          <li>
            <Link to="/report">
              <span className="icon">
                <i className="fa fa-bar-chart" aria-hidden="true"></i>
              </span>
              <span className="title">Report</span>
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </Fragment>
  );
};

export default Sidebar;
