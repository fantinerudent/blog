import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

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
    <div className="bg-orange">
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.node.title || post.node.slug

            return (
              <li key={post.node.slug}>
                <article
                  className="border-2 m-3 p-3 text-center"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h1 className="text-3xl text-brown mb-1">
                      {" "}
                      {post.node.title}
                    </h1>
                    <h2>
                      <Link to={post.node.slug} itemProp="url">
                        <span className="text-yellow" itemProp="headline">
                          {post.node.subtitle}
                        </span>
                      </Link>
                    </h2>
                    <small>{post.node.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          post.node.description.childMarkdownRemark.html ||
                          post.excerpt,
                      }}
                      itemProp="description"
                    />
                    {/* <Img className="w-6/12" fluid={post.node.image.fluid} /> */}
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
      </Layout>
    </div>
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
          description {
            childMarkdownRemark {
              html
            }
          }
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
