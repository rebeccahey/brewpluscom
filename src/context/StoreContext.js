import React from 'react';
import Client from 'shopify-buy';

const client = Client.buildClient({
  domain: `${process.env.SHOPIFY_STORE_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

export const defaultStoreContext = {
  client,
  isCartOpen: false,
  adding: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {}
};

const StoreContext = React.createContext(defaultStoreContext);

export default StoreContext;
