import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "react-bootstrap"
import { postsFields } from "../fragments/postsFields"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"
import Post from "../components/Post"
import Slider from "../components/Slider"

const SearchPage = ({ data, location }) => {
  const filteredPosts = data.posts.edges.filter(item =>
    item.node.title.toLowerCase().includes(location?.state?.name.toLowerCase())
  )

  return (
    <Layout>
      <SEO title="Search" description="Search results" />
      <Slider />
      <Container>
        <Row>
          <Col lg="8">
            {filteredPosts.length ? (
              filteredPosts.map(({ node }) => <Post key={node.id} data={node} truncate={true} />)
            ) : (
              <div className="page">
                <h4>No results</h4>
              </div>
            )}
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    posts: allContentfulPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          ...postsFields
        }
      }
    }
  }
`

SearchPage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      content: PropTypes.object.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
    })
  ),
}

export default SearchPage
