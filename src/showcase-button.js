import React from 'react';
import propTypes from 'prop-types';

class ShowcaseButton extends React.Component {
  render() {
    const { buttonContent, onClick } = this.props;
    return (
      <button className="showcase-button" onClick={onClick}>
        {buttonContent}
      </button>
    );
  }
}

ShowcaseButton.propTypes = {
  buttonContent: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired
};

export default ShowcaseButton;
