import React from 'react';
import PropTypes from 'prop-types';

const Strip = props => (
  <div className={`${props.className} ${props.containerType}`} id={props.id}>
    {props.children}
  </div>
);

Strip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  containerType: PropTypes.string,
};

Strip.defaultProps = {
  containerType: 'container-fluid',
  className: 'strip',
  id: '',
};

export default Strip;