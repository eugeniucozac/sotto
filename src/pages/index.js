import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "react-bootstrap"
import { postsFields } from "../fragments/postsFields"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"
import Home from "../components/Post/Home"
import Slider from "../components/Slider"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" description="Home page with blog posts" />
      <Slider />
      <Container>
        <Row>
          <Col lg="8">
            <Row>
              {data.posts.edges.map(({ node }) => (
                <Col md="6" key={node.id}>
                  <Home data={node} />
                </Col>
              ))}
            </Row>
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    posts: allContentfulPost(limit: 10, sort: { fields: date, order: DESC }) {
      edges {
        node {
          ...postsFields
        }
      }
    }
  }
`

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      content: PropTypes.object.isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
    })
  ),
}

export default IndexPage
