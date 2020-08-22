/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Reusable data for the site */
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-transformer-remark',
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "BOOKKEEPERAPI",
        fieldName: "bookkeeperapi",
        url: "http://localhost:4000",
      },
    },
  ],
}
