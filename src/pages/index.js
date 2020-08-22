import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

import Layout from "../components/layout"

export default function Home({ data }) {
  console.log("---> Test dunction")
  console.log(data.bookkeeperapi.feed.links)
  return (
    <Layout>
      <p>What a world.</p>
      <h2>Hi! I'm building a fake Gatsby site as part of a tutorial!</h2>
      <p>
        What do I like to do? Lots of course but definitely enjoy building
        websites.
      </p>
      <h5>Amazing Pandas Eating Things</h5>
      <div>
        <img
          src="https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
          alt="Group of pandas eating bamboo"
        />
      </div>

      <div>
        <h1 css={
          css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map( ({node}) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
                color: inherit;
              `}
            >
              <h3 css={
                css`
                  margin-bottom: ${rhythm(1/4)};
                `}
              >
                {node.frontmatter.title}{" "}
                <span css={
                  css`
                    color: #bbb;
                  `}
                >
                  - {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <table>
          <tr>
            <td>url</td>
            <td>description</td>
          </tr>
          {data.bookkeeperapi.feed.links.map( (link) => (
            <tr>
              <td>{link.url}</td>
              <td>{link.description}</td>
            </tr>
          ))}
        </table>
      </div>
    </Layout>
  )
}

export const query = graphql`
    query {
        allMarkdownRemark {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                    }
                    fields {
                        slug
                    }
                    excerpt
                }
            }
        }
        bookkeeperapi {
            feed {
                links {
                    description
                    url
                }
            }
        }
    }
`