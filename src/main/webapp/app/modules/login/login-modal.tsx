import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col, label } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="../../index2.html"><b>StarFire</b>Web</a>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>

              <AvForm onSubmit={this.handleSubmit}>
                {loginError ? (
                  <div className="mb-3">
                    <Alert color="danger">
                      <Translate contentKey="login.messages.error.authentication">
                        <strong>Failed to sign in!</strong> Please check your credentials and try again.
                    </Translate>
                    </Alert>
                  </div>
                ) : null}
                <div className="input-group mb-3">
                  {/* <input type="username" className="form-control" placeholder="Email" /> */}
                  <AvInput
                    name="username"
                    className="form-control"
                    label={translate('global.form.username.label')}
                    placeholder={translate('global.form.username.placeholder')}
                    required
                    errorMessage="Username cannot be empty!"
                    autoFocus
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <AvInput
                    name="password"
                    type="password"
                    className="form-control"
                    label={translate('login.form.password')}
                    placeholder={translate('login.form.password.placeholder')}
                    required
                    errorMessage="Password cannot be empty!"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <AvInput type="checkbox" name="rememberMe" id="remember" />
                        <Label for="remember">
                          Remember Me
                        </Label>
                    </div>
                    </div>
                    <div className="col-4">
                      <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                    </div>
                  </div>
              </AvForm>

                <div className="social-auth-links text-center mb-3">
                  <p>- OR -</p>
                  <a href="#" className="btn btn-block btn-primary">
                    <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                    </a>
                  <a href="#" className="btn btn-block btn-danger">
                    <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
                    </a>
                </div>

                <p className="mb-1">
                  <a href="forgot-password.html">I forgot my password</a>
                </p>
                <p className="mb-0">
                  <a href="register.html" className="text-center">Register a new membership</a>
                </p>
            </div>
            </div>
          </div>
        </div>
        );
      }
    }
    
    export default LoginModal;
