import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';

import { Pane, Button, Heading, TextInputField } from 'evergreen-ui';

const FieldSet = styled.fieldset`
  border: none;
`;

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

class Signin extends Component {
  state = {
    password: '',
    email: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => {
          return (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                const res = await signin();
                this.setState({ password: '', email: '' });
              }}
            >
              <Pane border="default">
                <FieldSet disabled={loading} aria-busy={loading}>
                  <Heading size={600} marginTop={10} marginBottom={10}>
                    Sign into your account
                  </Heading>
                  <Error error={error} />
                  <TextInputField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                  <TextInputField
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />

                  <Button appearance="primary" type="submit">
                    Sign In!
                  </Button>
                </FieldSet>
              </Pane>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
