import React from 'react';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';

import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';

import { Flex, Box } from '../shared/Elements';
import Logo from './Logo';
import colors from '../../tokens/colors';

const FooterRoot = styled(Flex)`
  background-color: ${themeGet('colors.lightest')};
`;

const Social = styled(Box)`
  color: ${themeGet('colors.light')};

  a {
    font-size: 24px;
  }

  svg {
    margin-right: 16px;
  }
`;

const Copyright = styled(Box)`
  font-size: 12px;
  color: ${themeGet('colors.brand')};
`;

const Title = styled(`h2`)`
  color: ${themeGet('colors.brand')};
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Section = styled(Box)`
  a {
    color: ${themeGet('colors.brand')};
    text-decoration: none;
    font-size: ${themeGet('fontSizes.0')};
  }

  a:hover {
    color: ${themeGet('colors.accent')};
  }

  & > ${Box} {
    margin-bottom: 8px;
  }
`;

const Footer = () => (
  <FooterRoot
    as="footer"
    flexDirection={['column-reverse', 'column-reverse', 'row']}
    p={5}
  >
    <Section mt={[5, 5, 0]}>
      <Logo color={colors.brand} />
      <p>Made by brewers for brewers.</p>
      <Copyright mt={3}>
        © {new Date().getFullYear()}, BrewPlus, All Rights Reserved
      </Copyright>
    </Section>
    <Flex
      flexDirection={['column', 'column', 'row']}
      justifyContent="space-between"
      flex={1}
      ml={[0, 0, 5]}
    >
      <Section>
        <Title>CONTACT US</Title>
        <Box>
          <a href="mailto:hello@brewplus.com">hello@brewplus.com</a>
        </Box>
        <Box>07882 090 659</Box>
        <Box>Monday to Friday</Box>
        <Box>9:30 to 21:30</Box>
      </Section>

      <Section>
        <Title>Customer care</Title>
        <Box>
          <a href="/">Contact support</a>
        </Box>
      </Section>

      <Section>
        <Title>About</Title>
        <Box>
          <a href="/">About Us</a>
        </Box>
        <Box>
          <a href="/">FAQ</a>
        </Box>
      </Section>

      <Section>
        <Title>Legal</Title>
        <Box>
          <a href="/privacy-policy">Privacy Policy</a>
        </Box>
        <Box>
          <a href="/terms-and-conditions">Terms & Conditions</a>
        </Box>
        <Box>
          <a href="/return-policy">Return Policy</a>
        </Box>
      </Section>
    </Flex>
  </FooterRoot>
);

export default Footer;
