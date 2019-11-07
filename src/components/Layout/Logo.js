import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

const svg = css`
  display: inline-block;
  height: 32px;
  width: auto;
`;

const Logo = ({ color }) => (
  <svg width="147px" height="24px" viewBox="0 0 147 24" css={svg}>
  <defs>
<style type="text/css">@import url('https://fonts.googleapis.com/css?family=Lexend+Exa&display=swap');</style>
</defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Group-3" transform="translate(-80.000000, -29.000000)">
              <rect id="Rectangle" x="0" y="0" width="305" height="79"></rect>
              <g id="Group" transform="translate(76.000000, 20.000000)" fill="#000000" font-family="LexendExa-Regular, Lexend Exa" font-size="31.7030917" font-weight="normal" letter-spacing="2.63928223">
                  <g id="Group-2">
                      <text id="BREWPLUS">
                          <tspan x="0" y="32">BREW</tspan>
                          <tspan x="115.99367" y="32" font-size="9.7030915" letter-spacing="0.107782498">PLUS</tspan>
                      </text>
                  </g>
              </g>
          </g>
      </g>
  </svg>
);

Logo.propTypes = {
  color: PropTypes.string
};

Logo.defaultProps = {
  color: '#5F0082'
};

export default Logo;
