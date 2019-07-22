import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { Button } from 'evergreen-ui';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(signout, { data, error, loading }) => {
      return (
        <Button onClick={signout} appearance="minimal">
          <a>Sign Out</a>
        </Button>
      );
    }}
  </Mutation>
);

export default Signout;
