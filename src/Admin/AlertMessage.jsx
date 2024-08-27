import React from 'react';
import PropTypes from 'prop-types';

const AlertMessage = ({ message }) => {
  if (!message) return null; // No message to display

  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      <div>
        {message.split('\n').map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.string,
};

export default AlertMessage;
