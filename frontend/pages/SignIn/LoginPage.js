import React, { Component } from 'react';
import FacebookAuth from 'react-facebook-auth';
import GoogleLogin from 'react-google-login';
import Koji from 'koji-tools';

import User from '../../common/components/User'
import backendApi from '../../common/utils/data';
import cookies from '../../common/utils/cookies'

import 'babel-polyfill'; // To make async/await work

import './main.css';
import './utils.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.authenticateFacebook = this.authenticateFacebook.bind(this);
    this.authenticateGoogle = this.authenticateGoogle.bind(this);
    this.authenticationFailed = this.authenticationFailed.bind(this);
    this.redirectTo = this.redirectToHome.bind(this);
  }

  async fetchAndSet(info) {
    const token = await backendApi.post('/users/signIn', info).then((res) => res.data && res.data.data && res.data.data.token).catch(err => { throw new Error(err) });
    cookies.set('token', token, { path: '/', expires: new Date(Date.now() + 2592000) }); // 2592000 -> 30 days
  }

  async authenticateFacebook(response) {
    const info = {
      signUpMethod: "facebook",
      profilePicture: response.picture.data.url,
      socialId: response.userID,
      fname: response.first_name,
      lname: response.last_name,
      name: response.name,
      email: response.email,
      accessToken: response.accessToken
    }

    await this.setState(info);

    await this.setState({ loading: true });
    await this.fetchAndSet(info);
    await this.setState({ loading: false });

    // Empty state
    await this.setState({
      signUpMethod: null,
      profilePicture: null,
      socialId: null,
      fname: null,
      lname: null,
      name: null,
      email: null,
      accessToken: null
    });

    window.location.replace('/');
  }

  async authenticateGoogle(response) {
    const info = {
      signUpMethod: "google",
      profilePicture: response.profileObj.imageUrl,
      socialId: response.profileObj.googleId,
      fname: response.profileObj.givenName,
      lname: response.profileObj.givenName,
      name: response.profileObj.name,
      email: response.profileObj.email,
      accessToken: response.accessToken
    }

    await this.setState({ loading: true });
    await this.fetchAndSet(info);
    await this.setState({ loading: false });

    // Empty state
    await this.setState({
      signUpMethod: null,
      profilePicture: null,
      socialId: null,
      fname: null,
      lname: null,
      name: null,
      email: null,
      accessToken: null
    })

    window.location.replace('/')
  }

  authenticationFailed(response) {
    return null
  }

  redirectToHome() {
    window.location.replace('/')
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100" style={{ backgroundImage: `url('${Koji.config.images.signInPageBackground}')` }}>
          <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
            <form className="login100-form validate-form flex-sb flex-w">
              <User>
                {({ user, loading }) => {
                  if (!loading) {
                    if (!user)
                      return (
                        <>
                        <span className="login100-form-title p-b-53">
                          {this.state.loading ? <>Signing you in 🙌</> : <>Sign in to continue 👇</>}
                          <hr />
                          <p>{Koji.config.strings.projectName} welcomes you!</p>
                          { this.state.loading && (
                            <>
                            <br />
                            <img width="70px" src={Koji.config.images.signInLoading} alt="loading" />
                            </>
                          ) }
                        </span>
                        
                        { !this.state.loading && (
                          <>
                          <GoogleLogin
                            clientId={Koji.config.strings.googleClientId}
                            render={({onClick}) => (
                              <a href="#" className="btn-google m-b-20" onClick={onClick}>
                                <img src={Koji.config.images.googleIcon} alt="Google Icon" />
                                Google
                              </a>
                            )}
                            scope={"profile email openid"}
                            isSignedIn={false}
                            fetchBasicProfile={false}
                            onSuccess={response => this.authenticateGoogle(response)}
                            onFailure={this.authenticationFailed}
                          />

                          <FacebookAuth
                            appId={Koji.config.strings.fbAppId}
                            autoLoad
                            fields={"name,first_name,middle_name,last_name,short_name,picture,email,birthday,location,gender,link"}
                            callback={response => this.authenticateFacebook(response)}
                            onFailure={this.authenticationFailed}
                            component={({onClick}) => (
                              <a href="#" className="btn-face m-b-20" onClick={onClick}>
                                <i className="fa fa-facebook-official"></i>
                                Facebook
                              </a>
                            )}
                          />
                          </>
                        ) }
                        </>
                      )
                    else
                      return (
                        <span className="login100-form-title p-b-53">
                          👋 Hey, {user.name}
                          <hr />
                          <span style={{fontSize: '18px'}}>You need to be at homepage 😅</span>
                        </span>
                      )
                  } else {
                    return (
                      <span className="login100-form-title p-b-53">
                        Loading...
                      </span>
                    )
                  }
                }}
              </User>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage