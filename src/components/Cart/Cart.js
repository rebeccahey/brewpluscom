import React, { useContext, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';

import {
  MdClose,
  MdShoppingCart,
  MdArrowBack,
  MdArrowForward
} from 'react-icons/md';

import StoreContext from '../../context/StoreContext';
import { Button, PrimaryButton } from '../shared/Buttons';
import { Flex, Box, Text } from '../shared/Elements';
import CartList from './CartList';

const CartRoot = styled(`div`)`
  background: ${themeGet('colors.lightest')};
  bottom: 0;
  position: fixed;
  right: 0;
  top: -1px;
  transform: translateX(100%);
  transition: transform 0.5s;
  width: 100%;
  will-change: transform;
  z-index: 1000;

  &.open {
    transform: translateX(0%);
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.15);
  }

  &.closed {
    transform: translateX(100%);
  }

  ::after {
    background-color: ${themeGet('colors.lightest')};
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: all 250ms;
  }

  &.loading {
    ::after {
      opacity: 0.9;
      pointer-events: all;
    }
  }

  @media (min-width: ${themeGet('bpAliases.desktop')}) {
    width: 400px;

    &.covered {
      display: none;
    }
  }
`;

const ItemsNumber = styled(`span`)`
  align-items: center;
  background: ${themeGet('colors.lemon')};
  border-radius: 50%;
  color: ${themeGet('colors.brandDark')};
  display: flex;
  font-size: 1.3rem;
  font-weight: bold;
  height: 36px;
  justify-content: center;
  width: 36px;
`;

const ItemsInCart = styled(`div`)`
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  line-height: 1.2;
  text-align: right;

  ${ItemsNumber} {
    margin-left: ${themeGet('space.3')};
    margin-right: ${themeGet('space.4')};
  }
`;

const CartToggle = styled(Button)`
  background: ${themeGet('colors.lightest')};
  border: none;
  border-radius: 0;
  display: flex;
  height: 60px;
  justify-content: center;
  left: 0;
  padding: 0;
  position: relative;
  top: 0;
  transform: translateX(-100%);
  transition: all 0.5s ease;
  width: 60px;

  :focus {
    box-shadow: 0 0 0 1px ${themeGet('colors.accent')} inset;
  }

  .open & {
    background: ${themeGet('colors.lilac')};
    color: ${themeGet('colors.lightest')};
    transform: translateX(0);
  }

  @media (min-width: ${themeGet('bpAliases.desktop')}) {
    .open & {
      transform: translateX(-100%);
    }
  }

  svg {
    height: 28px;
    margin: 0;
    width: 28px;
  }

  ${ItemsNumber} {
    position: absolute;
    right: 2px;
    top: 2px;
    transform: scale(0.6);
  }
`;

const CheckOut = styled(PrimaryButton)`
  font-size: 1.25rem;
  margin: ${props => themeGet('space.5')(props)} 0
    ${props => themeGet('space.4')(props)};
  width: 100%;
`;

const BackLink = styled(Button)`
  font-size: 1.25rem;
  margin-bottom: ${props => themeGet('space.3')(props)};
  width: 100%;
`;

const Cost = styled(Flex)`
  padding: 0 8px 4px;
  :last-child {
    padding-bottom: 0;
  }

  span {
    color: ${themeGet('colors.textMild')};
    flex-basis: 60%;
    font-size: 0.9rem;
    text-align: right;
  }

  strong {
    color: ${themeGet('colors.lilac')};
    flex-basis: 40%;
    text-align: right;
  }
`;

const Total = styled(Cost)`
  border-top: 1px solid ${themeGet('colors.brandBright')};
  color: ${themeGet('colors.brandDark')};
  margin-top: 8px;
  padding-top: 12px;

  span {
    font-weight: bold;
    text-transform: uppercase;
  }

  strong,
  span {
    color: inherit;
  }
`;

const Cart = ({ status, toggle }) => {
  const { client, checkout, removeLineItem, updateLineItem } = useContext(
    StoreContext
  );

  const [isLoading, setIsLoading] = useState(false);
  const [className, setClassName] = useState('closed');
  useEffect(() => {
    setClassName(status);
  }, [status]);

  const handleRemove = itemID => async event => {
    event.preventDefault();
    await removeLineItem(client, checkout.id, itemID);
    setIsLoading(false);
  };

  const handleQuantityChange = lineItemID => async quantity => {
    if (!quantity) {
      return;
    }
    await updateLineItem(client, checkout.id, lineItemID, quantity);
    setIsLoading(false);
  };

  const itemsInCart = checkout.lineItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCheckout = () => {
    window.open(checkout.webUrl);
  };

  return (
    <CartRoot className={`${className} ${isLoading ? 'loading' : ''}`}>
      <Flex as="header" height={60} alignItems="center">
        <CartToggle
          aria-label={`Shopping cart with ${itemsInCart} items`}
          onClick={toggle}
        >
          {status === 'open' ? (
            <MdClose />
          ) : (
            <>
              <MdShoppingCart />
              {itemsInCart > 0 && <ItemsNumber>{itemsInCart}</ItemsNumber>}
            </>
          )}
        </CartToggle>
        <Box flex={1} ml={4}>
          <Text as="h2" my={0} fontSize={3}>
            Your Cart
          </Text>
        </Box>
        <ItemsInCart>
          items
          <br />
          in cart<ItemsNumber>{itemsInCart}</ItemsNumber>
        </ItemsInCart>
      </Flex>
      <Box p={6}>
        <CartList
          items={checkout.lineItems}
          handleRemove={handleRemove}
          updateQuantity={handleQuantityChange}
          setCartLoading={setIsLoading}
          isCartLoading={isLoading}
        />
        <Box mt={3}>
          <Cost>
            <span>Subtotal:</span>{' '}
            <strong>
              {checkout.currencyCode} {checkout.subtotalPrice}
            </strong>
          </Cost>
          <Cost>
            <span>Taxes:</span> <strong>{checkout.totalTax}</strong>
          </Cost>
          <Cost>
            <span>Shipping (worldwide):</span> <strong>FREE</strong>
          </Cost>
          <Total>
            <span>Total Price:</span>
            <strong>
              {checkout.currencyCode} {checkout.totalPrice}
            </strong>
          </Total>
        </Box>
        <CheckOut onClick={handleCheckout}>
          Check out <MdArrowForward />
        </CheckOut>
        <BackLink onClick={toggle}>
          <MdArrowBack />
          Back to shopping
        </BackLink>
      </Box>
    </CartRoot>
  );
};

export default Cart;
