import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "react-bootstrap"
import { Disqus } from "gatsby-plugin-disqus"
import { travelFields } from "../fragments/travelFields"
import Layout from "../components/layout"
import Videos from "../components/Post/Travel/Videos"
import SEO from "../components/seo"
import Page from "../components/Header/Page"
import Sidebar from "../components/Sidebar"

const Travel = ({
  data: {
    travel: { id, title, slug },
  },
  data,
}) => {
  return (
    <Layout>
      <SEO title="Travel" description="Travel posts" />
      <Page title="Travel" />
      <Container>
        <Row>
          <Col lg="8">
            <Videos data={data.travel} />
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
  query getTravel($slug: String!) {
    travel: contentfulVideo(slug: { eq: $slug }) {
      ...travelFields
    }
  }
`

Travel.propTypes = {
  data: PropTypes.shape({
    travel: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    }),
  }),
}

export default Travel
