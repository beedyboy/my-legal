import React from 'react';  

const NormalLayout = props => {
  const { children } = props;
 

  console.log(props)
  return (
    <div>
      
      <main>{children}</main>
    </div>
  );
};
 
export default NormalLayout;
