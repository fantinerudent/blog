import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostContentfulTemplate = ({ data, location }) => {
  const post = data.contentfulArticle
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.title} description={post.subtitle || post.excerpt} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
       <Img className="w-6/12" fluid={post.image.fluid} />
          <p>{post.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html:  post.content.childMarkdownRemark.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostContentfulTemplate

export const pageQuery = graphql`
  query ContentfulArticleBySlug($slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulArticle(slug: { eq: $slug }) {
      title
      subtitle
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      author
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
