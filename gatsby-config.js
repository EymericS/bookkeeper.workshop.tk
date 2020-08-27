/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
	/* Reusable data for the site */
	siteMetadata: {
		title: `Shift Manager`,
		author: 'Eymeric SERTGOZ'
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
