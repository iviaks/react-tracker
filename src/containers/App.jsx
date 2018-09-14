import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from '../pages/Home';
import LoginPage from '../pages/Login';
import SectionPage from '../pages/Section';
import SectionsListPage from '../pages/Sections/List';
import SectionsDetailsPage from '../pages/Sections/Details';

import './style.css';

const SectionsRoute = () => (
  <React.Fragment>
    <Route path="/" exact component={SectionsDetailsPage} />
    <Route path="/:id" component={SectionPage} />
  </React.Fragment>
);

export default class extends React.Component {
  state = {
    loggedIn: window.sessionStorage.getItem('loggedIn'),
  };

  setSessionStorage = data => {
    window.sessionStorage.setItem('loggedIn', data);
    this.setState(prevState => ({ loggedIn: data }));
  };

  clearSessionStorage = () => {
    window.sessionStorage.clear();
    this.setState(prevState => ({ loggedIn: null }));
  };

  render() {
    const { loggedIn } = this.state;

    return (
      <div className="App-container">
        {loggedIn === null ? (
          <LoginPage setSessionStorage={this.setSessionStorage} />
        ) : (
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/list" component={SectionsListPage} />
              <Route
                path="/login"
                render={() => (
                  <LoginPage setSessionStorage={this.setSessionStorage} />
                )}
              />
              <Route path="/sections" component={SectionsRoute} />
            </Switch>
          </Router>
        )}
      </div>
    );
  }
}
