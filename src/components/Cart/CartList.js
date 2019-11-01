import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';

import CartListItem from './CartListItem';

const CartListRoot = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Headers = styled(`div`)`
  border-bottom: 1px solid ${themeGet('colors.brandBright')};
  display: flex;
  justify-content: space-between;

  span {
    color: ${themeGet('colors.textLight')};
    flex-basis: 60px;
    flex-grow: 0;
    font-size: 0.8rem;
    padding-bottom: 8px;
    text-align: center;

    &:first-of-type {
      flex-grow: 1;
      text-align: left;
    }
  }
`;

const CartList = ({
  items,
  handleRemove,
  updateQuantity,
  setCartLoading,
  isCartLoading
}) => (
  <>
    <Headers>
      <span>Product</span>
      <span>Qty.</span>
      <span>Remove</span>
    </Headers>
    <CartListRoot>
      {items.map(item => (
        <CartListItem
          key={item.id}
          item={item}
          handleRemove={handleRemove(item.id)}
          updateQuantity={updateQuantity(item.id)}
          setCartLoading={setCartLoading}
          isCartLoading={isCartLoading}
        />
      ))}
    </CartListRoot>
  </>
);

CartList.propTypes = {
  items: PropTypes.array.isRequired,
  handleRemove: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  setCartLoading: PropTypes.func.isRequired,
  isCartLoading: PropTypes.bool.isRequired
};

export default CartList;
