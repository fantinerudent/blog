import React from "react"
import { Link, graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulArticle.edges

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
    <div className="bg-indigo-50  bg-opacity-50 h-screen">
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <button> toto </button>
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.node.title || post.node.slug

            return (
              <li key={post.node.slug} className='grid grid-flow-col grid-cols-2 auto-rows-auto gap-2'>
                <article
                  className="bg-indigo-300 bg-opacity-40 border-2 m-3 p-3 text-center md:container md:mx-auto"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h1 className="md:text-2xl text-indigo-500 mb-1">
                      {title}
                    </h1>
                    <h2>
                      <Link to={post.node.slug} itemProp="url">
                        <span class="text-cerise-500" itemProp="headline">
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
