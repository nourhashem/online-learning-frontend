import React from 'react';
import Linkify from 'react-linkify';

const LinkifyNewTab = (props) => {
  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
  return (
    <Linkify componentDecorator={componentDecorator} {...props}>
      {props.children}
    </Linkify>
  );
};

export default LinkifyNewTab;
