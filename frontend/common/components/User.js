/** 
 * common/components/User.js
 * 
 * What it Does:
 *   Exports the User component that supplies data related to the user signed in
 *   With the help of render props method in React.
 * 
 * Things to Change:
 *   Not much to change here, unless you add a new feature to the app.
 */

import 'babel-polyfill';
import React, { Component } from 'react';

import backendApi from '../utils/data';
import cookies from '../utils/cookies';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null};
  }

  async componentDidMount() {
    await this.setState({ loading: true });
    const token = cookies.get('token');
    if (token) {
      const user = await backendApi.post('/users/getUser', { token }).then(res => res.data && res.data.data && res.data.data.user).catch(err => this.setState({ loading: false }));
      await this.setState({ user, loading: false });
    } else {
      await this.setState({ loading: false });
    }
  }

  render() {
    return this.props.children({user: this.state.user, loading: this.state.loading});
  }
}
