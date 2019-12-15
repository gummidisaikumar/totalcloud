import React from 'react';
import PropTypes from 'prop-types';

const RenderPage = props => (
  <div className={`${props.className} ${props.containerType}`} id={props.id}>
    {props.children}
  </div>
);

RenderPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  containerType: PropTypes.string,
};

RenderPage.defaultProps = {
  containerType: 'container',
  className: 'render-page',
};


export default RenderPage;