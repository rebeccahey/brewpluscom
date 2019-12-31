import React from 'react';

import SEO from '../components/shared/SEO';

const ContactUs = () => (
  <>
    <SEO title="Contact Us" />
    <h1 css={{'@media (min-width: 100px)': {paddingLeft: "70px",
                paddingRight: "70px"}}}>Contact Us</h1>
    <p css={{'@media (min-width: 100px)': {paddingLeft: "70px",
                paddingRight: "70px"}}}>If you'd like to get a quote or have a question please send us an email or give us a call. <br /><br />
                  Email: <a href="mailto:hello@brewplus.com">hello@brewplus.com</a><br /> <br />
                  Phone:  07882 090 659<br /> <br />
                  Address: 454 Long Lane, London, N2 8JL, UK <br /> <br />
                  Have a question? We'd love to hear from you!<br /><br /> </p>
  </>
);

export default ContactUs;
