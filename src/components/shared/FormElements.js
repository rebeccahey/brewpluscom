import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';
import { PrimaryButton } from './Buttons';

export const Input = styled(`input`)`
  background-color: ${props => themeGet('colors.lightest')};
  border: 1px solid ${props => themeGet('colors.brandBright')};
  border-radius: ${props => themeGet('radii.1')}px;
  color: ${props => themeGet('colors.text')};
  display: block;
  font-size: 1.1rem;
  padding: ${props => themeGet('space.4')} ${props => themeGet('space.5')};
  width: 100%;

  :focus {
    box-shadow: 0 0 0 3px ${props => themeGet('colors.accent')};
    outline: 0;
    transition: box-shadow 0.15s ease-in-out;
  }
`;

export const Select = styled(Input.withComponent('select'))`
  appearance: none;
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 8px 10px;
  padding-right: ${props => themeGet('space.8')(props)} !important;
`;

export const Fieldset = styled(`fieldset`)`
  border: none;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0;
  padding: 0;
`;

export const Label = styled(`label`)`
  color: ${props => themeGet('colors.textLight')};
  display: flex;
  font-size: 1rem;
  padding: ${props => themeGet('space.3')};
`;

export const Submit = styled(PrimaryButton)`
  font-size: 1.25rem;
  margin-top: ${props => themeGet('space.5')};
  width: 100%;
`;
