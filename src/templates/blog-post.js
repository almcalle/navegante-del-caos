import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import { Disqus, CommentCount } from "gatsby-plugin-disqus";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  featuredimage,
  helmet,
  pageContext
}) => {
  console.log(pageContext);
  const { slug, nextTitle, nextSlug, prevTitle, prevSlug } = pageContext;

  const PostContent = contentComponent || Content;

  let disqusConfig = {
    url: "https://navegantedelcaos.netlify.com/blog/" + title,
    identifier: title,
    title: title
  };
  return (
    <div>
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            {featuredimage ? (
              <div
                className="full-width-image-container margin-top-0"
                style={{
                  backgroundImage: `url(${
                    !!featuredimage.childImageSharp
                      ? featuredimage.childImageSharp.fluid.src
                      : featuredimage
                  })`
                }}
              >
                <h2
                  className="has-text-weight-bold is-size-1"
                  style={{
                    boxShadow: "0.5rem 0 0 #2a4382, -0.5rem 0 0 #2a4382",
                    backgroundColor: "#2a4382",
                    color: "white",
                    padding: "1rem"
                  }}
                >
                  {title}
                </h2>
              </div>
            ) : (
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
            )}
            <section className="section">
              <p>{description}</p>
              <PostContent content={content} />
              <div style={{ marginTop: `4rem` }}>
                {prevSlug.includes("/blog/") && (
                  <a class="button" href={prevSlug}>
                    ← {prevTitle}
                  </a>
                )}
                <a class="button" href={nextSlug}>
                  {nextTitle} →
                </a>
              </div>
              {tags && tags.length ? (
                <div style={{ marginTop: `4rem` }}>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map(tag => (
                      <li key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {
                // <CommentCount
                //   config={disqusConfig}
                //   placeholder={"Número de comentarios"}
                // />
              }
              <Disqus config={disqusConfig} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = ({ data, pageContext }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        pageContext={pageContext}
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        featuredimage={post.frontmatter.featuredimage}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD/MM/YYYY")
        title
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
