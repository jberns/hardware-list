import React from 'react';
import PropTypes from 'prop-types';
import { Pane, Alert } from 'evergreen-ui';

const DisplayError = ({ error }) => {
  if (!error || !error.message) {
    return null;
  }
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <Pane key={i}>
        <Alert intent="danger" title="Shoot!  An error has occurred 😦">
          {error.message.replace('GraphQL error: ', '')}
        </Alert>
      </Pane>
    ));
  }
  return (
    <Pane marginBottom="1em" marginTop="1em">
      <Alert intent="danger" title="Shoot!  An error has occurred 😦">
        {error.message.replace('GraphQL error: ', '')}
      </Alert>
    </Pane>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
