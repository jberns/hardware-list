import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';
import { Pane, Button, Heading, TextInputField } from 'evergreen-ui';

const FieldSet = styled.fieldset`
  border: none;
`;

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired,
  };
  state = {
    password: '',
    confirmPassword: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading, called }) => {
          return (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                await reset();
                this.setState({ password: '', confirmPassword: '' });
              }}
            >
              <Pane border="default">
                <FieldSet disabled={loading} aria-busy={loading}>
                  <Heading size={600} marginTop={10} marginBottom={10}>
                    Reset your password
                  </Heading>
                  <Error error={error} />
                  <TextInputField
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                  <TextInputField
                    label="Confirm your password"
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                  <Button appearance="primary" type="submit">
                    Reset your password
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

export default Reset;
