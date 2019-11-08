import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';

import { Link } from 'gatsby';

export const ButtonBase = styled(`button`)`
  align-items: center;
  background: ${props =>
    props.inverse ? themeGet('colors.brand') : themeGet('colors.lightest')};
  border: 0px solid
    ${props =>
      props.inverse ? themeGet('colors.brandLight') : themeGet('colors.brand')};
  border-radius: ${themeGet('radii.2')}px;
  color: ${props =>
    props.inverse ? themeGet('colors.brandLight') : themeGet('colors.brand')};
  cursor: pointer;
  display: inline-flex;
  font-size: 1.1rem;
  justify-content: center;
  padding: 0.75em 0.75rem;
  transition: 0.5s;

  :focus {
    box-shadow: 0 0 0 0px ${themeGet('colors.grey')};
    outline: 0;
    transition: box-shadow 0.15s ease-in-out;
  }

  svg {
    height: 1.1em;
    margin-left: ${props => (props.iconOnLeft ? 0 : '0.5em')};
    margin-right: ${props => (props.iconOnLeft ? '0.5em' : 0)};
    width: 1.1em;
  }
    }
  }
`;

const ButtonAsExternalLink = styled(ButtonBase.withComponent(`a`))`
  display: inline-flex;
  text-decoration: none;
`;

const ButtonAsInternalLink = ButtonAsExternalLink.withComponent(
  ({ iconOnLeft, inverse, ...rest }) => <Link {...rest} />
);

export const Button = ({
  children,
  to,
  href,
  ref,
  inverse = false,
  ...rest
}) => {
  // automtic recognition of icon placement, works properly only for [text + <Icon>] childrens
  const iconOnLeft = typeof children[0] !== 'string';

  if (to) {
    return (
      <ButtonAsInternalLink
        to={to}
        iconOnLeft={iconOnLeft}
        inverse={inverse}
        {...rest}
      >
        {children}
      </ButtonAsInternalLink>
    );
  }
  if (href) {
    return (
      <ButtonAsExternalLink
        href={href}
        inverse={inverse}
        iconOnLeft={iconOnLeft}
        {...rest}
      >
        {children}
      </ButtonAsExternalLink>
    );
  }
  return (
    <ButtonBase inverse={inverse} iconOnLeft={iconOnLeft} {...rest}>
      {children}
    </ButtonBase>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  inverse: PropTypes.bool,
  to: PropTypes.string,
  href: PropTypes.string
};

export const PrimaryButton = styled(Button)`
  background: ${themeGet('colors.brand')};
  color: ${themeGet('colors.lightest')};
  display: flex;
  font-size: 1.25rem;
  justify-content: center;

  @media (hover: hover) {
    &:hover {
      background: ${themeGet('colors.buttongrey')};
      color: ${themeGet('colors.lightest')};
    }
  }
`;
