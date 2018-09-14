import React from 'react';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const LOGIN_MUTATION = gql`
  mutation login($login: String!, $password: String!, $type: String!) {
    login(login: $login, password: $password, path: $type) {
      ok
    }
  }
`;

export default ({ setSessionStorage }) => (
  <Mutation mutation={LOGIN_MUTATION}>
    {(login, { data }) => (
      <form
        onSubmit={e => {
          e.preventDefault();
          let form = e.target;

          let formData = {
            login: e.target.elements['username'].value,
            password: e.target.elements['password'].value,
            type: e.target.elements['path'].value,
          };

          login({ variables: formData })
            .then(({ data }) => {
              if (data.login) {
                setSessionStorage(JSON.stringify(formData));
              }
            })
            .catch(({ message }) => {
              alert(message);
              form.reset();
            });
        }}
      >
        <div className="form-group">
          <label htmlFor="path">Path</label>
          <input
            type="text"
            className="form-control"
            id="path"
            placeholder="Enter path"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    )}
  </Mutation>
);
