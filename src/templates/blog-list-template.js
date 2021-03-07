import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "react-bootstrap"
import { graphql } from "gatsby"
import { postsFields } from "../fragments/postsFields"
import Layout from "../components/layout"
import Post from "../components/Post"
import Page from "../components/Header/Page"
import SEO from "../components/seo"
import Pagination from "../components/shared/Pagination"
import Sidebar from "../components/Sidebar"

const Blog = ({ pageContext: { currentPage, numPages }, data: { posts } }) => {
  return (
    <Layout>
      <SEO title="Blog" description="Blog posts" />
      <Page title="Blog" />
      <Container>
        <Row>
          <Col lg="8">
            {posts.edges.map(({ node }) => (
              <Post key={node.id} data={node} truncate={true} />
            ))}
            <Pagination currentPage={currentPage} numPages={numPages} slug="blog" />
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query getPosts($skip: Int!, $limit: Int!) {
    posts: allContentfulPost(skip: $skip, limit: $limit, sort: { fields: date, order: DESC }) {
      edges {
        node {
          ...postsFields
        }
      }
    }
  }
`

Blog.propTypes = {
  pageContext: PropTypes.shape({
    skip: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
  }),

  posts: PropTypes.objectOf({
    edges: PropTypes.arrayOf(
      PropTypes.objectOf({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
        category: PropTypes.string.isRequired,
        image: PropTypes.object.isRequired,
        content: PropTypes.object.isRequired,
      })
    ),
  }),
}

export default Blog
