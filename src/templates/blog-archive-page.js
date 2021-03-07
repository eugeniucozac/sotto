import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Post from "../components/Post"
import Page from "../components/Header/Page"
import SEO from "../components/seo"
import { Container, Row, Col } from "react-bootstrap"
import { postsFields } from "../fragments/postsFields"
import Sidebar from "../components/Sidebar"

const BlogArchive = ({ data: { posts } }) => {
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
  query getPostsByDate {
    posts: allContentfulPost(
      filter: { date: { gte: "2020-09-01T00:00+00:00", lte: "2020-09-30T00:00+00:00" } }
    ) {
      edges {
        node {
          ...postsFields
        }
      }
    }
  }
`

BlogArchive.propTypes = {
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

export default BlogArchive
