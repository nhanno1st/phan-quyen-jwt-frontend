import { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../context/UserContext';

const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);
    if (user && user.isAuthenticated === true) {
      return (
        <>
          <Route path={props.path} component={props.component}></Route>
        </>
      );
    }else{
      return <Redirect to='/login'></Redirect>
    }
  
};
export default PrivateRoutes;
