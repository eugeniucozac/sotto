import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import Page from "../components/Header/Page"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404" />
    <Page title="404" />
    <Container>
      <Row>
        <Col>
          <div className="page text-center">
            <h2>404</h2>
            <p>Page not found</p>
          </div>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default NotFoundPage
