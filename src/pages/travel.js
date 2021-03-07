import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "react-bootstrap"
import { travelFields } from "../fragments/travelFields"
import Layout from "../components/layout"
import Sidebar from "../components/Sidebar"
import Page from "../components/Header/Page"
import SEO from "../components/seo"
import Travel from "../components/Post/Travel"

const TravelPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Travel" description="Travel posts" />
      <Page title="Travel" />
      <Container>
        <Row>
          <Col lg="8">
            <Row>
              {data.travel.edges.map(({ node }) => (
                <Col md="6" key={node.id}>
                  <Travel data={node} />
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
    travel: allContentfulVideo {
      edges {
        node {
          ...travelFields
        }
      }
    }
  }
`

TravelPage.propTypes = {
  travel: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      youtube: PropTypes.string.isRequired,
      content: PropTypes.object.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    })
  ),
}

export default TravelPage
