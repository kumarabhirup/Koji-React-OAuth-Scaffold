import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Helmet } from 'react-helmet';
import Koji from 'koji-tools';

import LoginPage from './LoginPage'

class HomePage extends React.Component {
    loadFbSDK() {
        // Load the Facebook SDK script
        var script = document.createElement('script');
        script.text = `
            window.fbAsyncInit = function() {
              FB.init({
                appId      : '${Koji.config.strings.fbAppId}',
                cookie     : true,
                xfbml      : true,
                version    : '${Koji.config.strings.fbApiVersion}'
              });
              FB.AppEvents.logPageView();  
            };
            (function(d, s, id){
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {return;}
              js = d.createElement(s); js.id = id;
              js.src = "https://connect.facebook.net/en_US/sdk.js";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        `;
        document.head.appendChild(script);
    }

    loadStyles() {
        return (
            <Helmet>
                <title>Sign up now!</title>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
            </Helmet>
        )
    }

    componentDidMount() {
        this.loadFbSDK();

        // Force an update of the dom on prop changes
        // This is just for development situations so
        // that we can test prop changes in real-time.
        Koji.on('change', () => {
            this.forceUpdate();
        })
    }

    render() {
        return (
            <>
                { this.loadStyles() }
                <LoginPage />
            </>
        );
    }
}

export default HomePage;
