import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { themeGet } from '@styled-system/theme-get';
import {
  MdInfoOutline,
  MdErrorOutline,
  MdShoppingCart,
  MdSentimentDissatisfied
} from 'react-icons/md';

import StoreContext from '../context/StoreContext';
import { Fieldset, Input, Label, Select, Submit } from './shared/FormElements';

const Errors = styled(`div`)`
  display: ${props => (props.show ? 'flex' : 'none')};
  flex-direction: row;
  margin-bottom: ${props => themeGet('space.4')}px;
  width: 100%;
`;

const ErrorSign = styled(`div`)`
  align-items: center;
  background: ${props => themeGet('colors.error')};
  border-radius: 2px 0 0 2px;
  color: ${props => themeGet('colors.lightest')};
  display: flex;
  flex-basis: 40px;
  justify-content: center;

  svg {
    height: 20px;
    width: 20px;
  }
`;

const ErrorMsgs = styled(`ul`)`
  border: 1px dashed ${props => themeGet('colors.error')};
  border-left: none;
  border-radius: 0 2px 2px 0;
  color: ${props => themeGet('colors.error')};
  flex-grow: 1;
  margin: 0;
  padding: ${props => themeGet('space.4')}px;
  padding-left: ${props => themeGet('space.8')}px;
`;

const Price = styled(`div`)`
  color: ${props => themeGet('colors.brand')};
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: -0.02em;

  span {
    color: ${props => themeGet('colors.textLight')};
  }
`;

class ProductForm extends Component {
  constructor(props) {
    super(props);

    const { variants } = this.props;
    this.state = {
      variant: variants.length === 1 ? variants[0].shopifyId : '',
      quantity: 1,
      errors: []
    };
  }

  handleChange = event => {
    event.preventDefault();

    if (event.target.value) {
      const { errors } = this.state;

      const errorIdx = errors.findIndex(
        error => error.field === event.target.name
      );

      errors.splice(errorIdx, 1);

      if (~errorIdx) {
        this.setState({ errors });
      }
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = callback => event => {
    event.preventDefault();

    const errors = [];
    const { quantity, variant } = this.state;

    if (quantity < 1) {
      errors.push({
        field: 'quantity',
        msg: 'Choose a <b>quantity</b> of 1 or more.'
      });
    }

    if (variant === '' || variant === '.') {
      errors.push({
        field: 'variant',
        msg: 'Please select a <b>size</b>.'
      });
    }

    if (errors.length) {
      this.setState({ errors });
      return;
    }

    callback(variant, quantity);
  };

  priceForVariantId = variantId => {
    const unknownPrice = '0.00';

    if (variantId === '') return unknownPrice;

    const { variants } = this.props;
    const result = variants.find(variant => variant.shopifyId === variantId);

    return result ? result.price : unknownPrice;
  };

  // checkAvailability = ({ productId }) => {
  //   this.context.client.product.fetch(productId).then(product => {
  //     // this checks the currently selected variant for availability
  //     const result = product.variants.filter(
  //       variant => variant.id === productVariant.shopifyId
  //     );
  //     setAvailable(result[0].available);
  //   });
  // };

  render() {
    const { variants } = this.props;
    const { errors, variant, quantity } = this.state;

    const hasVariants = variants.length > 1;

    const isOutOfStock = !hasVariants && !variants[0].availableForSale;

    return (
      <StoreContext.Consumer>
        {({ addVariantToCart }) => (
          <form onSubmit={this.handleSubmit(addVariantToCart)} noValidate>
            <Price>{this.priceForVariantId(variant)}</Price>
            <Errors show={errors.length}>
              <ErrorSign>
                <MdErrorOutline />
              </ErrorSign>
              <ErrorMsgs>
                {errors.map(error => (
                  <li
                    key={error.field}
                    dangerouslySetInnerHTML={{ __html: error.msg }}
                  />
                ))}
              </ErrorMsgs>
            </Errors>
            <Fieldset>
              <Label htmlFor="quantity">Qty.</Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                step="1"
                onChange={this.handleChange}
                value={quantity}
              />
            </Fieldset>
            {hasVariants && (
              <Fieldset>
                <Select
                  id="variant"
                  value={variant}
                  name="variant"
                  onChange={this.handleChange}
                >
                  <option disabled value="">
                    Choose Size
                  </option>
                  {variants.map(productVariant => (
                    <option
                      disabled={!productVariant.availableForSale}
                      value={productVariant.shopifyId}
                      key={productVariant.shopifyId}
                    >
                      {productVariant.title}
                    </option>
                  ))}
                </Select>
              </Fieldset>
            )}
            <Submit disabled={isOutOfStock}>
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              {isOutOfStock ? <MdSentimentDissatisfied /> : <MdShoppingCart />}
            </Submit>
          </form>
        )}
      </StoreContext.Consumer>
    );
  }
}

ProductForm.propTypes = {
  id: PropTypes.string.isRequired,
  variants: PropTypes.array.isRequired
};

export default ProductForm;
