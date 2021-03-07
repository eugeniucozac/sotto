import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { Container } from "react-bootstrap"
import style from "./Page.module.css"

const PageHeader = ({ title }) => (
  <header className={style.header}>
    <Container>
      <h2>{title}</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {title && (
          <>
            <li>/</li>
            <li>{title}</li>
          </>
        )}
      </ul>
    </Container>
  </header>
)

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PageHeader
