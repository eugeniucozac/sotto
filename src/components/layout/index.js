import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "../Header"
import Footer from "../Footer"
import Search from "../Search"
import { menuLinks } from "../../constants"
import "./Layout.module.css"

const Layout = ({ children }) => {
  const {
    site: {
      siteMetadata: { logo },
    },
  } = useStaticQuery(getSite)
  const [isSearching, setSearching] = useState(false)
  const triggerSearch = () => setSearching(!isSearching)

  return (
    <>
      <Search triggerSearch={triggerSearch} isSearching={isSearching} />
      <div className="main-page-wrapper">
        <Header menuLinks={menuLinks} logo={logo} triggerSearch={triggerSearch} />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

const getSite = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        logo
        description
      }
    }
  }
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
