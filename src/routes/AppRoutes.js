import { Switch, Route } from 'react-router-dom';
import Login from '../components/Login/Login';
import Users from '../components/ManageUsers/Users';
import Register from '../components/register/Registe';
import PrivateRoutes from './PrivateRoutes';
import Role from '../components/Role/Role';
import GroupRole from '../components/GroupRole/GroupRole';
import Home from '../components/Home/Home';
import About from '../components/About/About';


const AppRoutes = () => {
    const Project = () =>{
        return(
          <div className='container mt-3'>
            <h4>Todo...</h4>
          </div>
        )
    }
    return(
        <>
        <Switch>
          <PrivateRoutes path="/users" component={Users}/>
          <PrivateRoutes path="/projects" component={Project}/>
          <PrivateRoutes path="/roles" component={Role}/>
          <PrivateRoutes path="/group-role" component={GroupRole}/>



          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            home
          </Route>
          <Route path="*">404 not found</Route>
        </Switch>
        </>
    )
}
export default AppRoutes;