import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import styled from 'styled-components';

import { Alert, Pane, Button, Heading, TextInputField } from 'evergreen-ui';

const FieldSet = styled.fieldset`
  border: none;
`;

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class Signin extends Component {
  state = {
    email: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => {
          return (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await reset();
                this.setState({ email: '' });
              }}
            >
              <Pane border="default">
                <FieldSet disabled={loading} aria-busy={loading}>
                  <Heading size={600} marginTop={10} marginBottom={10}>
                    Request a password reset
                  </Heading>
                  <Error error={error} />
                  {!error && !loading && called && (
                    <Alert
                      intent="success"
                      title="Success! Check your email for a reset link!"
                      marginBottom={10}
                    />
                  )}
                  <TextInputField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                  <Button appearance="primary" type="submit">
                    Request Reset
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
