import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "react-bootstrap"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Post from "../components/Post"
import Page from "../components/Header/Page"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"

const BlogCategory = ({ data: { posts }, data }) => {
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
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query getPostsByCategory($category: String!) {
    posts: allContentfulPost(
      filter: { taxonomy: { slug: { eq: $category } } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          ...postsFields
        }
      }
    }
  }
`

BlogCategory.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
      content: PropTypes.object.isRequired,
    })
  ),
}

export default BlogCategory
