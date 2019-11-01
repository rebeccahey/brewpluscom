import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';

import { MdClose } from 'react-icons/md';

import CartThumbnail from './CartThumbnail';
import { Input } from '../shared/FormElements';
import { Button } from '../shared/Buttons';

const CartListItemRoot = styled('li')`
  align-items: center;
  border-bottom: 1px solid ${themeGet('colors.brandLight')};
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
`;

const Thumbnail = styled(CartThumbnail)`
  flex-grow: 0;
  flex-shrink: 0;
  margin-left: 4px;
  margin-right: 12px;
`;

const Info = styled('div')`
  flex-grow: 1;
`;

const Name = styled('span')`
  display: block;
  font-size: 1rem;
  line-height: 1.2;
`;

const Meta = styled('span')`
  color: ${themeGet('colors.textLight')};
  display: block;
  font-size: 0.95rem;
  font-style: normal;
`;

const Quantity = styled(Input)`
  flex-grow: 0;
  height: 44px;
  margin-left: 8px;
  margin-right: 8px;
  padding: 0 8px 0;
  text-align: center;
  width: 50px;

  @media (min-width: ${themeGet('bpAliases.desktop')}) {
    width: 70px;
  }
`;

const Remove = styled(Button)`
  border: 1px dotted ${themeGet('colors.textLighter')};
  display: flex;
  flex-shrink: 0;
  height: 44px;
  justify-content: center;
  margin-right: 4px;
  padding: 0;
  width: 44px;

  svg {
    height: 24px;
    margin: 0;
    width: 24px;
  }
`;

const CartListItem = ({
  item,
  handleRemove,
  updateQuantity,
  setCartLoading,
  isCartLoading
}) => {
  const [quantity, setQuantity] = useState(1);

  if (item.quantity !== quantity && quantity !== '' && !isCartLoading) {
    setQuantity(item.quantity);
  }

  const handleInputChange = event => {
    if (isCartLoading) {
      return;
    }

    const {
      target: { value }
    } = event;

    // Make sure the quantity is always at least 1.
    const safeValue = Math.max(Number(value), 0);

    // No need to update if the value hasn’t updated.
    if (value === quantity) {
      return;
    }

    // If the field is empty, update the state but don’t do anything else.
    if (value === '') {
      setQuantity(value);
      return;
    }

    // Otherwise, trigger the loading state and set the quantity in state.
    setCartLoading(true);
    setQuantity(safeValue);

    // If the quantity is set to 0, remove the item.
    if (safeValue === 0) {
      handleRemove(event);
      return;
    }

    // If we get here, update the quantity.
    updateQuantity(safeValue);
  };

  const handleRemoveItem = event => {
    setCartLoading(true);
    handleRemove(event);
  };

  return (
    <CartListItemRoot>
      <Thumbnail
        id={item.variant.image.id}
        fallback={item.variant.image.src}
        alt={item.variant.image.altText}
      />
      <Info>
        <Name>{item.title}</Name>
        <Meta>
          {item.variant.title}, ${item.variant.price}
        </Meta>
      </Info>
      <Quantity
        aria-label="Quantity"
        id={`quantity_${item.id.substring(58, 64)}`}
        type="number"
        name="quantity"
        min="1"
        step="1"
        onChange={event => handleInputChange(event)}
        onBlur={() => setQuantity(item.quantity)}
        value={quantity}
      />
      <Remove onClick={handleRemoveItem}>
        <MdClose />
      </Remove>
    </CartListItemRoot>
  );
};

CartListItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  setCartLoading: PropTypes.func.isRequired,
  isCartLoading: PropTypes.bool.isRequired
};

export default CartListItem;
