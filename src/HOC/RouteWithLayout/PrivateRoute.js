import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 
// import Utility from '../../shared/Storage';

const PrivateRoute = props => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => ( 
        <Layout>
          <Component {...matchProps} />
        </Layout>
         
      )}
    />
  );
};
 

// return (
//   <Route
//     {...rest}
//     render={matchProps => (
//       Utility.get('token')
//       ?
//       <Layout>
//         <Component {...matchProps} />
//       </Layout>
//        :

//        <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
    
//     )}
//   />
// );
// };

export default PrivateRoute;
