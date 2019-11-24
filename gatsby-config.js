require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
siteMetadata: {
siteUrl: `https://www.brewplus.com`,
},
plugins: [`gatsby-plugin-sitemap`],
},
module.exports = {
  siteMetadata: {
    title: `Tanks, hygienic fittings and brewing equipment`,
    description: `High quality tanks, hygienic fittings and brewing equipment sourced by brewers for brewers.`,
    author: `@gatsbyjs`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout`)
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: process.env.SHOPIFY_STORE_NAME,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN
      }
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.PRISMIC_REPO_NAME
      }
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `brewpluscom`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    }

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
};
