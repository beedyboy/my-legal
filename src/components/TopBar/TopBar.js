import React, { Fragment, useState } from 'react'; 
import { Link } from "react-router-dom"; 
import Utility from '../../services/UtilityService';

 const TopBar = () => {
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
    return (
        <Fragment>
            <div className="logos">Inventory</div>
            <div>Welcome  {Utility.get('name')} </div>
                    <ul>
                        <li className="right-icon-btn"><i className="fa fa-search"></i></li>
                         <li className="right-icon-link"><Link to="/profile"><i className="fa fa-user"></i></Link></li>
                        <li className="right-icon-btn" onClick={e => Utility.logout()}><i className="fa fa-sign-out"></i></li> 
                    </ul>
         
        </Fragment>
    )
}
export default TopBar