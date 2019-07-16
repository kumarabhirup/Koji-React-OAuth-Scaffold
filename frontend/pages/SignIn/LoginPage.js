import React, { Component } from 'react';
import FacebookAuth from 'react-facebook-auth';
import GoogleLogin from 'react-google-login';

import './main.css';
import './utils.css';

const FacebookButton = (loading, { onClick }) => (
  <a href="#" className="btn-face m-b-20" onClick={onClick}>
    <i className="fa fa-facebook-official"></i>
    {loading ? 'Signing in...' : 'Facebook'}
  </a>
)

class LoginPage extends Component {

  state = {}

  authenticateFacebook = async response => {

    // console.log(response)

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
    })

    const signIn = await mutation()

    const me = await getMe(client)

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

    window.location.replace(Router.query.intent || '/') // Router does not work the expected way, so... this!

  }

  authenticationFailed = async response => {
    return null
  }

  authenticateGoogle = async response => {

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

    const signIn = await mutation()

    const me = await getMe(client)

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

    window.location.replace(Router.query.intent || '/')

  }

  redirectTo = () => {
    this.props.router.replace(this.props.router.query.intent || '/')
  }

  render() {
    return (
                  <div className="limiter">
                    {/* <div className="container-login100" style={{backgroundImage: "url('/static/auth/images/bg-01.jpg')"}}> */}
                    <div className="container-login100" style={{ backgroundImage: "url('https://i.ibb.co/1bxgbyB/home-banner.jpg')" }}>
                      <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                        <form className="login100-form validate-form flex-sb flex-w">
                        // { loading && (
                        //   <span className="login100-form-title p-b-53">
                        //     Loading...
                        //   </span>
                        // ) }
                        // { me ? (
                        //   <span className="login100-form-title p-b-53">
                        //     <h2>You are { me.name }.</h2>
                        //     <hr />
                        //     <p>You are already signed in. <span onClick={() => this.props.router.back()} style={{color: '#0047ab', fontWeight: 'bolder', cursor: 'pointer'}}>Click here to go back... 🙂</span></p>
                        //   </span>
                        // ) : !loading ? (
                          // <>
                          <span className="login100-form-title p-b-53">
                            Signin to continue 👇
                            <hr />
                            <p>{meta.name} welcomes you!</p>
                          </span>

                          // <Mutation refetchQueries={[{ query: CURRENT_USER_QUERY }]} mutation={SIGNIN_MUTATION} variables={{
                          //   signUpMethod: this.state.signUpMethod,
                          //   profilePicture: this.state.profilePicture,
                          //   socialId: this.state.socialId,
                          //   fname: this.state.fname,
                          //   lname: this.state.lname,
                          //   name: this.state.name,
                          //   email: this.state.email,
                          //   accessToken: this.state.accessToken
                          // }}>
                          //   {(signIn, { error, loading, called }) => (
                              <GoogleLogin
                                clientId={process.env.GOOGLE_LOGIN_APP_ID}
                                render={renderProps => (
                                  <a href="#" className="btn-google m-b-20" onClick={renderProps.onClick} style={{width: '100%'}}>
                                    <img src="/static/auth/images/icons/icon-google.png" alt="GOOGLE" />
                                    {loading ? 'Signing in...' : 'Continue with Google'}
                                  </a>
                                )}
                                disabled={loading}
                                scope={"profile email openid"}
                                isSignedIn={false}
                                fetchBasicProfile={false}
                                onSuccess={response => this.authenticateGoogle(response, signIn, client)}
                                onFailure={this.authenticationFailed}
                              />
                            // )}
                        //   </Mutation>
                        //   </>
                        // ) : null }
                        </form>
                      </div>
                    </div>
                  </div>
      //           )
      //         }
      //       </ApolloConsumer>
      //     )
      //   }}
      // </User>
    )
  }

}

export default LoginPage