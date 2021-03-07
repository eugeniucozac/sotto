import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "react-bootstrap"
import { Disqus } from "gatsby-plugin-disqus"
import { graphql } from "gatsby"
import { postsFields } from "../fragments/postsFields"
import Layout from "../components/layout"
import Post from "../components/Post"
import SEO from "../components/seo"
import Page from "../components/Header/Page"
import Sidebar from "../components/Sidebar"
import Related from "../components/Post/Related"

const Blog = ({
  data: {
    post: { id, category, title, slug },
  },
  data,
}) => {
  return (
    <Layout>
      <SEO title="Blog" description="Blog posts" />
      <Page title="Blog" />
      <Container>
        <Row>
          <Col lg="8">
            <Post data={data.post} single={true} />
            <Related category={category} />
            <Disqus
              config={{
                url: `http://sottoblog.com/blog/${slug}`,
                identifier: id,
                title,
              }}
            />
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query getPost($slug: String!) {
    post: contentfulPost(slug: { eq: $slug }) {
      ...postsFields
    }
  }
`

Blog.propTypes = {
  data: PropTypes.shape({
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  }),
}

export default Blog
