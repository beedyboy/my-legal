import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom"; 

const Sidebar = () => {
    const [superMenu, setSuperMenu] = useState({
        inventory: false,
        laptop: false,
        settings: false
    });
const getSuper = (item, value) => {

    setSuperMenu(state => ({
        ...state,
        [item]: !value
    }));
}
    return (
        <Fragment> 
                <ul className="sidebar_menu">
                    <li><Link to="/dashboard">
                        <span className="icon">
                            <i className="fa fa-dashboard" aria-hidden="true"></i>
                        </span>
                        <span className="title">Dashboard</span>
                        </Link></li>

                      
                  <li><Link to="/asset">
                    <span className="icon">
                    <i className="fa fa-product-hunt" aria-hidden="true"></i>
                    </span>
                    <span className="title">Asset</span>
                    </Link></li> 
                    

                    <li><Link to="/staff">
                    <span className="icon">
                    <i className="fa fa-group" aria-hidden="true"></i>
                    </span>
                    <span className="title">Staff</span>
                    </Link></li> 

                    <li className="super"> 
                        <span className="icon">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </span>
                    <span className="title" onClick={e => getSuper('inventory', superMenu.inventory)} >Inventory<i className="fa fa-chevron-down caret"></i></span>
                        <ul className={`submenu ${superMenu.inventory ? ' show': ''}`}>
                            <li><Link to="/product">Product</Link></li>
                            <li><Link to="/pos">pos</Link></li> 
                        </ul> 
                  </li> 

                    <li><Link to="/ticket">
                    <span className="icon">
                    <i className="fa fa-ticket" aria-hidden="true"></i>
                    </span>
                    <span className="title">Ticket</span>
                    </Link></li>
                    
                    <li className="super"> 
                        <span className="icon">
                    <i className="fa fa-cog" aria-hidden="true"></i>
                    </span>
                    <span className="title" onClick={e => getSuper('settings', superMenu.settings)} >Settings<i className="fa fa-chevron-down caret"></i></span>
                        <ul className={`submenu ${superMenu.settings ? ' show': ''}`}>
                        <li><Link to="/branch">Branch </Link></li>
                        <li><Link to="/department">Department </Link></li>
                         <li><Link to="/category">Category </Link></li>
                            <li><Link to="/subcategory">Sub Category</Link></li> 
                        </ul> 
                  </li>
                  <li><Link to="/report">
                    <span className="icon">
                    <i className="fa fa-bar-chart" aria-hidden="true"></i>
                    </span>
                    <span className="title">Report</span>
                    </Link></li>
                  

                  {/* 
                    

                    <li><Link to="/subcategory">
                    <span className="icon">
                    <i className="fa fa-tags" aria-hidden="true"></i>
                    </span>
                    <span className="title">Sub Category</span>
                    </Link></li>

                    <li><Link to="/department">
                    <span className="icon">
                    <i className="fa fa-sitemap" aria-hidden="true"></i>
                    </span>
                    <span className="title">Department</span>
                    </Link></li>
 */}

                </ul>
            
        </Fragment>
    )
}

export default Sidebar
