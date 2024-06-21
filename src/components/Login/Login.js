import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './Login.scss';
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';
const Login = (props) => {
  const { user, loginContext } = useContext(UserContext);
  let history = useHistory();

  const [valueLogin, setValueLogin] = useState('');
  const [password, setPassword] = useState('');
  const defaultObjValidInput = {
    isValidValueLogin: true,
    isValidPassword: true,
  };
  const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);
  const handleCreateNewAccount = () => {
    history.push('/register');
  };
  const handleLogin = async () => {
    setObjValidInput(defaultObjValidInput);
    if (!valueLogin) {
      setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });

      toast.error('please enter your email address or phone number');
      return;
    }
    if (!password) {
      setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
      toast.error('please enter your password');
      return;
    }
    let response = await loginUser(valueLogin, password);
    if (response && +response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;

      let data = {
        isAuthenticated: true,
        token,
        account: { groupWithRoles, email, username },
      };
      localStorage.setItem('jwt', token);
      loginContext(data);
      history.push('/users');
      // window.location.reload();
    }
    if (response && +response.EC !== 0) {
      //error
      toast.error(response.EM);
    }
    console.log('check response', response);
  };
  const handlePressEnter = (event) => {
    if (event.charCode === 13 && event.code === 'Enter') {
      handleLogin();
    }
  };
  useEffect(() => {
    if (user && user.isAuthenticated) {
      history.push('/');
    }
  }, []);
  return (
    <div className="login-container">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 col-sm-7 d-none d-sm-block">
            <div className="brand">n2 brand</div>
            <div className="detail">help me login react</div>
          </div>
          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">n2 brand</div>
            <input
              type="text"
              className={
                objValidInput.isValidValueLogin
                  ? 'form-control'
                  : 'form-control is-invalid'
              }
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(event) => {
                setValueLogin(event.target.value);
              }}
            />
            <input
              type="password"
              className={
                objValidInput.isValidPassword
                  ? 'form-control'
                  : 'form-control is-invalid'
              }
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              onKeyPress={(event) => handlePressEnter(event)}
            />
            <button className="btn btn-primary" onClick={() => handleLogin()}>
              Login
            </button>
            <span className="text-center">
              <a className="forgot-password" href="#">
                Forgot your password
              </a>
            </span>
            <hr />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handleCreateNewAccount()}
              >
                Create new account
              </button>
              <div className="mt-3 return">
                <Link to="/">
                  <i className="fa fa-arrow-circle-left"></i>
                  <span title="Return to HomePage"> Return to HomePage</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
