import React from "react"
import { Link, graphql } from "gatsby"
import Img from 'gatsby-image';

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulArticle.edges
  console.log("posts", posts)

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.node.title || post.node.slug

          return (
            <li key={post.node.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h1> {post.node.title}</h1>
                  <h2>
                    <Link to={post.node.slug} itemProp="url">
                      <span itemProp="headline">{post.node.subtitle}</span>
                    </Link>
                  </h2>
                  <small>{post.node.date}</small>
                </header>
                <section>
                {/* <Img fluid={post.node.image.fluid} /> */}
                  {/* <p
                    dangerouslySetInnerHTML={{
                      __html: post.node.content.childMarkdownRemark.html || post.excerpt,
                    }}
                    itemProp="description"
                  /> */}
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulArticle {
      edges {
        node {
          title
          subtitle
          author
          slug
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
          content {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
