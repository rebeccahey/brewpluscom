import { css } from '@emotion/core';
import theme from '../tokens/theme';

export const media = Object.keys(theme.bpAliases).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${theme.bpAliases[label]}) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const em = targetPx => `
    ${targetPx / theme.fontBase}em
  `;
