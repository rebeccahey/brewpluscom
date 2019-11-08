/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';

import StoreContext, { defaultStoreContext } from '../../context/StoreContext';
import InterfaceContext, {
  defaultInterfaceContext
} from '../../context/InterfaceContext';
import Header from './Header';
import Footer from './Footer';
import Newsletter from '../Newsletter';
import Instagram from '../Instagram';
import Cart from '../Cart';
import colors from '../../tokens/colors';
import SEO from '../shared/SEO';
import { Flex, Box, Text } from '../shared/Elements';
import SideBar from './SideBar';
import { media } from '../../utils/media';
import theme from '../../tokens/theme';

const globalStyles = css`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
    color: ${colors.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.375;
    margin: 0 auto;
  }
`;

const Viewport = styled(`div`)`
  ${media.desktop`
    margin-left: ${theme.dimensions.sideBarWidth};
  `}
`;

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interface: {
        ...defaultInterfaceContext,
        toggleCart: () => {
          this.setState(state => ({
            interface: {
              ...state.interface,
              cartStatus:
                this.state.interface.cartStatus === 'open' ? 'closed' : 'open',
              menuStatus: 'closed'
            }
          }));
        },
        toggleMenu: () => {
          this.setState(state => ({
            interface: {
              ...state.interface,
              menuStatus:
                this.state.interface.menuStatus === 'open' ? 'closed' : 'open'
            }
          }));
        }
      },
      store: {
        ...defaultStoreContext,
        addVariantToCart: (variantId, quantity) => {
          if (variantId === '' || !quantity) {
            console.error('Both a size and quantity are required.');
            return;
          }

          this.setState(state => ({
            store: {
              ...state.store,
              adding: true
            }
          }));

          const { checkout, client } = this.state.store;
          const checkoutId = checkout.id;
          const lineItemsToUpdate = [
            { variantId, quantity: parseInt(quantity, 10) }
          ];

          return client.checkout
            .addLineItems(checkoutId, lineItemsToUpdate)
            .then(checkout => {
              this.setState(state => ({
                store: {
                  ...state.store,
                  checkout,
                  adding: false
                }
              }));
            });
        },
        removeLineItem: (client, checkoutID, lineItemID) => {
          return client.checkout
            .removeLineItems(checkoutID, [lineItemID])
            .then(res => {
              this.setState(state => ({
                store: {
                  ...state.store,
                  checkout: res
                }
              }));
            });
        },
        updateLineItem: (client, checkoutID, lineItemID, quantity) => {
          const lineItemsToUpdate = [
            { id: lineItemID, quantity: parseInt(quantity, 10) }
          ];

          return client.checkout
            .updateLineItems(checkoutID, lineItemsToUpdate)
            .then(res => {
              this.setState(state => ({
                store: {
                  ...state.store,
                  checkout: res
                }
              }));
            });
        }
      }
    };
  }

  componentDidMount() {
    this.initializeCheckout();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      if (this.state.interface.menuStatus === 'open') {
        this.state.interface.toggleMenu();
      }
    }
  }

  async initializeCheckout() {
    // Check for an existing cart.
    const isBrowser = typeof window !== 'undefined';
    const existingCheckoutID = isBrowser
      ? localStorage.getItem('shopify_checkout_id')
      : null;

    const setCheckoutInState = checkout => {
      if (isBrowser) {
        localStorage.setItem('shopify_checkout_id', checkout.id);
      }

      this.setState(state => ({
        store: {
          ...state.store,
          checkout
        }
      }));
    };

    const createNewCheckout = () => this.state.store.client.checkout.create();
    const fetchCheckout = id => this.state.store.client.checkout.fetch(id);

    if (existingCheckoutID) {
      try {
        const checkout = await fetchCheckout(existingCheckoutID);

        // Make sure this cart hasn’t already been purchased.
        if (!checkout.completedAt) {
          setCheckoutInState(checkout);
          return;
        }
      } catch (e) {
        localStorage.setItem('shopify_checkout_id', null);
      }
    }

    const newCheckout = await createNewCheckout();
    setCheckoutInState(newCheckout);
  }

  render() {
    const { children } = this.props;
    const { store } = this.state;

    return (
      <>
        <Global styles={globalStyles} />
        <SEO title="Home" />
        <StoreContext.Provider value={store}>
          <InterfaceContext.Provider value={this.state.interface}>
            <InterfaceContext.Consumer>
              {({ cartStatus, toggleCart, menuStatus, toggleMenu }) => (
                <>
                  <Header menuStatus={menuStatus} toggleMenu={toggleMenu} />
                  <SideBar status={menuStatus} />
                  <Viewport>
                    <Cart status={cartStatus} toggle={toggleCart} />
                    <Text
                      bg="#F2F2F2"
                      py={3}
                      textAlign="center"
                      fontSize={12}
                      color="#000"
                      fontWeight="bold"
                    >
                      FREE SHIPPING & FREE RETURNS
                    </Text>
                    <Flex alignItems="flex-start">
                      <Box as="main" width={1}>
                        {children}
                      </Box>
                    </Flex>
                  
                    <Newsletter />
                    <Footer />
                  </Viewport>
                </>
              )}
            </InterfaceContext.Consumer>
          </InterfaceContext.Provider>
        </StoreContext.Provider>
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
