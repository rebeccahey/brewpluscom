import React from 'react';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';

import { Flex, Box, Text } from './shared/Elements';
import { PrimaryButton } from './shared/Buttons';
import { Input } from './shared/FormElements';

const EmailInput = styled(Input)`
  width: 300px;
`;

const SignUpButton = styled(PrimaryButton)`
  margin-top: 16px;
  height: 55px;

  @media (min-width: ${themeGet('bpAliases.desktop')}) {
    margin-left: 16px;
    margin-top: 0;
  }
`;

const Newsletter = () => (
  <Flex
    flexDirection={['column', 'column', 'row']}
    alignItems="center"
    justifyContent="center"
    py={10}
    bg="lemon"
  >
    <Box pr={[0, 0, 12]} mb={[5, 5, 0]}>
      <Text fontSize={[1, 1, 2]} textAlign="center">
      JOIN OUR NEWSLETTER
      </Text>
      <Text textAlign="center">Get the latest brewing information direct to your inbox.</Text>
    </Box>
    <Flex flexDirection={['column', 'column', 'row']}>
      <EmailInput name="email" placeholder="Email address" />
      <SignUpButton>Sign Up</SignUpButton>
    </Flex>
  </Flex>
);

export default Newsletter;
