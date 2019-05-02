/**
 * common/App.js
 * 
 * What it Does:
 *   This is our root React Element. The rest of our app is initialized here.
 *   In this file we set up the react context and styled-components theme
 *   to use our koji customization properties. Now anywhere in our react
 *   or styled components we can use these customizations. This file also
 *   sets up wrapConsole.js, which allows us to see console.log()'s in the
 *   koji preview window. Lastly this file sets up an event listener on 
 *   postMessage to see if the editor has sent us any new customization
 *   updates.
 * 
 * Things to Change:
 *   Any element or library that should be globally available accross all
 *   pages should be put here. Also this is a great place to put a router
 *   if you want multiple pages in your application.
 */

import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Koji from 'koji-tools';

import Router from './Router';

const Container = styled.div`
    padding: 0;
    margin: 0;
`;

class App extends React.PureComponent {
  componentWillMount() {
    Koji.pageLoad();
  }

  render() {
    return (
      <Container>
        <Router />
      </Container>
    );
  }
}

export default App;
