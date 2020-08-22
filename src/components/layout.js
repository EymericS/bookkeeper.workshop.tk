import React from "react"
import { css } from "@emotion/core"
import { Link, useStaticQuery, graphql } from "gatsby"

import { rhythm} from "../utils/typography"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `
  )

  return (
    <div
      css= {
        css`
          margin: 0 auto;
          max-width: 700px;
          padding: ${rhythm(2)}
          padding-top: ${rhythm(1.5)}
        `
      }
    >
      <Link to={'/'}>
        <h3
          css={
            css`
              margin-bottom: ${rhythm(2)};
              display: inline-block;
              font-style: normal;
            `
          }
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
      <ul style={{ listStyle: 'none', float: 'right' }}>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/about">About</ListLink>
        <ListLink to="/contact">Contact</ListLink>
        <ListLink to="/my-files">Files</ListLink>
      </ul>
      {children}
    </div>
  )
}