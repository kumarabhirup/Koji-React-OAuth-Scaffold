import React, { Component } from 'react';
import FacebookAuth from 'react-facebook-auth';
import GoogleLogin from 'react-google-login';
import Koji from 'koji-tools';

import 'babel-polyfill'; // To make async/await work

import './main.css';
import './utils.css';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.authenticateFacebook = this.authenticateFacebook.bind(this);
    this.authenticateGoogle = this.authenticateGoogle.bind(this);
    this.authenticationFailed = this.authenticationFailed.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
  }

  async authenticateFacebook(response) {
    await this.setState({
      signUpMethod: "facebook",
      profilePicture: response.picture.data.url,
      socialId: response.userID,
      fname: response.first_name,
      lname: response.last_name,
      name: response.name,
      gender: response.gender,
      birthday: response.birthday,
      email: response.email,
      accessToken: response.accessToken
    });

    // const signIn = await mutation();

    // const me = await getMe(client);

    // Empty state
    await this.setState({
      signUpMethod: null,
      profilePicture: null,
      socialId: null,
      fname: null,
      lname: null,
      name: null,
      phone: null,
      email: null,
      gender: null,
      birthday: null,
      bio: null,
      accessToken: null
    });

    window.location.replace('/');

  }

  async authenticateGoogle(response) {

    // console.log(response)

    await this.setState({
      signUpMethod: "google",
      profilePicture: response.profileObj.imageUrl,
      socialId: response.profileObj.googleId,
      fname: response.profileObj.givenName,
      lname: response.profileObj.givenName,
      name: response.profileObj.name,
      email: response.profileObj.email,
      accessToken: response.accessToken
    })

    // const signIn = await mutation()

    // const me = await getMe(client)

    // Empty state
    await this.setState({
      signUpMethod: null,
      profilePicture: null,
      socialId: null,
      fname: null,
      lname: null,
      name: null,
      phone: null,
      email: null,
      gender: null,
      birthday: null,
      bio: null,
      accessToken: null
    })

    window.location.replace('/')

  }

  authenticationFailed(response) {
    return null
  }

  redirectTo() {
    this.props.router.replace('/')
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100" style={{ backgroundImage: `url('${Koji.config.images.signInPageBackground}')` }}>
          <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
            <form className="login100-form validate-form flex-sb flex-w">
              <span className="login100-form-title p-b-53">
                Signin to continue 👇
                <hr />
                <p>{Koji.config.strings.projectName} welcomes you!</p>
              </span>
              
              <GoogleLogin
                clientId={Koji.config.strings.googleClientId}
                render={({onClick}) => (
                  <a href="#" className="btn-google m-b-20" onClick={onClick}>
                    <img src={Koji.config.images.googleIcon} alt="Google Icon" />
                    Google
                  </a>
                )}
                // disabled={loading}
                scope={"profile email openid"}
                isSignedIn={false}
                fetchBasicProfile={false}
                onSuccess={response => this.authenticateGoogle(response)}
                onFailure={this.authenticationFailed}
              />

               <FacebookAuth
                appId={Koji.config.strings.fbAppId}
                autoLoad
                // disabled={loading}
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
            </form>
          </div>
        </div>
      </div>
    )
  }

}

export default LoginPage