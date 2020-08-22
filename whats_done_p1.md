# What I've done ( Part 1 : Have I understand ?)

I start by following gastby [tutorial](https://www.gatsbyjs.com/tutorial/) to have a nice and well `running` project.

## Project initialization
Thanks to gatsby-cli :
````shell
gatsby new [SITE_DIRECTORY_NAME] [URL_OF_STARTER_GITHUB_REPO]
cd [SITE_DIRECTORY_NAME]
npm install
npm install gatsby
````

## Using page components

Any React component defined in src/pages/*.js will automatically become a page.

First lines in `/src/pages/index.js`
```jsx
import React from "react"

export default function Home() {
  return (
    <div style={{ color: `purple`, fontSize: '72px' }}>
      <h1>Hello Gatsby!</h1>
      <p>What a world.</p>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
    </div>
  )
}
```

## Using sub-components

Sub-components break the UI into reusable pieces.
They take place in `src/components/`

## Styling

### Standard CSS

- write some css code in `/src/styles/global.css` for exemple.
- create if not exist `gatsby-browser.js`
```jsx
import "/src/styles/global.css"
```

### Styling a page

- css container `/src/components/container.js`
```jsx
import React from "react"
import containerStyles from "./container.module.css"
export default function Container({ children }) {
  return <div className={containerStyles.container}>{children}</div>
}
```

- css style `/src/components/container.module.css`
```css
container {
  margin: 3rem auto;
  max-width: 600px;
}
```

- target page `src/pages/about-css-modules.js`
```jsx
import React from "react"
import Container from "../components/container"
export default function About() {
  return (
    <Container>
      <h1>About CSS Modules</h1>
      <p>CSS Modules are cool</p>
    </Container>
  )
}
```

#### CSS modules

- module css `/src/pages/about-css-modules.module.css`
```css
.user {
  display: flex;
  align-items: center;
  margin: 0 auto 12px auto;
}
.user:last-child {
  margin-bottom: 0;
}
.avatar {
  flex: 0 0 96px;
  width: 96px;
  height: 96px;
  margin: 0;
}
.description {
  flex: 1;
  margin-left: 18px;
  padding: 12px;
}
.username {
  margin: 0 0 12px 0;
  padding: 0;
}
.excerpt {
  margin: 0;
}
```
- module js `/src/pages/about-css-modules.js`
```jsx
import React from "react"
import styles from "./about-css-modules.module.css"
import Container from "../components/container"

console.log(styles)

const User = props => (
  <div className={styles.user}>
    <img src={props.avatar} className={styles.avatar} alt="" />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.username}</h2>
      <p className={styles.excerpt}>{props.excerpt}</p>
    </div>
  </div>
)
export default function About() {
  return (
    <Container>
      <h1>About CSS Modules</h1>
      <p>CSS Modules are cool</p>
      <User
        username="Jane Doe"
        avatar="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
        excerpt="I'm Jane Doe. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      />
      <User
        username="Bob Smith"
        avatar="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
        excerpt="I'm Bob Smith, a vertically aligned type of guy. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      />
    </Container>
  )
}
```
#### Typography

Typography.js [test](https://kyleamathews.github.io/typography.js/)
```shell
npm install --save gatsby-plugin-typography react-typography typography typography-theme-fairy-gates
```
Put some config in `/gatsby-config.js`
Typography need a configuration file : `/src/utils/typography.js`


#### Other possibilities

- Emotion
- Styled Components
- CSS-in-JS

### Nesting Layout Components

Juste nest some component with a certain style, like a nav component in a header componente.

## Data layer in Gatsby

It's powered by GraphQL. In Gatsby : *everything that lives outside a React component are data*

Adding Emotion plugin for **CSS-in-JS** :
```shell script
 npm install --save gatsby-plugin-emotion @emotion/core
```
Share some data over page :
```jsx
siteMetadata: {
  title: `Title from siteMetadata`,
}
```
Get data shared on page :
- put GraphQL query at the bottom of the page 
```jsx
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```
- give query data to page and use it
```jsx
export default function Home({ data }) {
  return (
    ...
      <h1>{data.site.siteMetadata.title}</h1>
    ...
  )
}
```

Get data shared on components :
```jsx
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
    ...
      {data.site.siteMetadata.title}
    ...
  )
}
```

### Files

- source plugin to know about disk files
```shell script
npm install --save gatsby-source-filesystem
```
```jsx
export const query = graphql`
    query {
        allFile {
            ...
        }
    }
`
```

- transformer plugin to transform row content from source plugin (for markdown):
```shell script
npm install --save gatsby-transformer-remark
```
```jsx
export const query = graphql`
    query {
        allMarkdownRemark {
          ...
        }
    }
`
```

## Programmatically create pages from data

### Creat `slug`
- *onCreateNode*
  - create `gatsby-node.js` : 
  ```jsx
  const { createFilePath } = require('gatsby-source-filesystem')
  const path = require('path')
  
  exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if( node.internal.type === 'MarkdownRemark' ) {
      const slug = createFilePath({ node, getNode, basePath: 'pages' })
      createNodeField({
        node,
        name: 'slug',
        value: slug
      })
    }
  }
  ```
- *createPages*
  - Steps to :
    - create temmplate for render
    - Query data with GraphQL
    - Map the query results to pages
  - add to `gatsby-node.js` : 
  ```jsx  
  exports.createPages = async({ graphql, actions }) => {
    const { createPage } = actions
    const result = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
  
    result.data.allMarkdownRemark.edges.forEach( ({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/blog-post.js'),
        context: {
          slug: node.fields.slug,
        },
      })
    })
  }
  ```
  
## Adding GraphQL Api
  
- add needed plugin *source-graphql* :
```shell script
npm install --save gatsby-source-graphql
```
- add congig for to `gatsby-config.js` for each API :
```shell script
module.exports = {
  ...
  plugins: [
    ...
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "BOOKKEEPERAPI",
        fieldName: "bookkeeperapi",
        url: "http://my.api.com",
      },
    },
    ...
    ],
  ...
}
```
- comsume API :
```jsx
export const query = graphql`
    query {
        ...
        bookkeeperapi {
            ...
        }
    }
`
```