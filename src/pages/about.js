import React from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "react-bootstrap"
import { graphql } from "gatsby"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Layout from "../components/layout"
import Sidebar from "../components/Sidebar"
import Page from "../components/Header/Page"
import SEO from "../components/seo"

const AboutPage = ({
  data: {
    page: { title, description },
  },
}) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <b>{text}</b>,
      [MARKS.CODE]: text => <i>{text}</i>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.DOCUMENT]: (node, children) => <div>{children}</div>,
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { description, file } = node.data.target.fields
        return <img alt={description ? description["en-US"] : null} src={file["en-US"].url} />
      },
    },
  }

  return (
    <Layout>
      <SEO title={title} description="About page" />
      <Page title={title} />
      <Container>
        <Row>
          <Col lg="8">
            <div className="page">
              <h4>About Me</h4>
              {documentToReactComponents(description.json, options)}
            </div>
          </Col>
          <Sidebar />
        </Row>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "about" }) {
      title
      description {
        json
      }
    }
  }
`
AboutPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.object.isRequired,
    }),
  }),
}

export default AboutPage
