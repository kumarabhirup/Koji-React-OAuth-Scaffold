/** 
 * pages/HomePage/index.js
 * 
 * What it Does:
 *   Serves on `/` route.
 * 
 * Things to Change:
 *   If you are creating an app with OAuth using this Koji Scaffold,
 *   you might want to change everything here because this page is just to show whether the User signed in or not.
 */

import 'babel-polyfill';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from 'koji-tools';

import User from '../../common/components/User';
import cookies from '../../common/utils/cookies'

const Container = styled.div`
    background-color: ${() => Koji.config.colors.backgroundColor};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: ${() => Koji.config.colors.textColor};
    text-align: center;
`;

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Content = styled.div`
  padding-bottom: 8px;
`;

const Link = styled.a`
  color: ${() => Koji.config.colors.linkColor};
`;

const Icon = styled.div`
    animation: ${AppLogoSpin} infinite 20s linear;
    height: 20vmin;
    width: 20vmin;
    pointer-events: none;
    background-image: url(${() => Koji.config.images.icon});
    background-size: contain;
    background-repeat: no-repeat;
    margin-bottom: 16px;
`;

class HomePage extends React.Component {
    componentDidMount() {
        // Force an update of the dom on prop changes
        // This is just for development situations so
        // that we can test prop changes in real-time.
        Koji.on('change', () => {
            this.forceUpdate();
        })
    }

    signOut() {
      cookies.remove('token')
      window.location.reload()
    }

    render() {
        return (
            <Container>
                <Icon />
                <Content>{Koji.config.strings.content}</Content>
                <br />
                <User>
                  {({user, loading}) => {
                    // Render if the User information is loaded
                    if (!loading)
                      return (
                        <>
                        {
                          user
                          ? (
                            // Show 👇 if user is Signed In
                            <>
                              <img src={user.profilePicture} alt={`${user.name}'s profile picture`} />
                              Welcome, { user.name }!
                              <br />
                              Email: { user.email }
                              <Link
                                onClick={this.signOut}
                                style={{cursor: 'pointer'}}
                                rel="noopener noreferrer"
                              >
                                Sign Out
                              </Link>
                            </>
                          )
                          : (
                            // Show 👇 if user is NOT signed in.
                            <>
                            <Link
                              href="/signin"
                              rel="noopener noreferrer"
                            >
                              {Koji.config.strings.linkText}
                            </Link>
                            </>
                          )
                        }
                        </>
                      )
                    // Show Loading Screen if the User information is not loaded
                    else
                      return <>Loading...</>
                  }}
                </User>
            </Container>
        );
    }
}

export default HomePage;
