import React from "react"
import PropTypes from "prop-types"
import { Container } from "react-bootstrap"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { graphql, useStaticQuery, Link } from "gatsby"
import Top from "./Top"
import Image from "gatsby-image"
import { pageEffectRed } from "../../constants"
import style from "./Header.module.css"

const Header = ({ menuLinks, triggerSearch }) => {
  const { logo } = useStaticQuery(getImage)
  return (
    <>
      <Top triggerSearch={triggerSearch} />
      <header>
        <Container>
          <div className={`${style.contentHolder} clearfix`}>
            <div className={style.logo}>
              <Link to="/">
                <Image fixed={logo.childImageSharp.fixed} alt="Sotto" />
              </Link>
              <AniLink paintDrip duration={0.75} hex={pageEffectRed} to="/"></AniLink>
            </div>
            <div className="menu-wrapper">
              <nav className={`${style.megaMenuHolder} clearfix`}>
                <ul className="clearfix">
                  {menuLinks.map(props => (
                    <li key={props.name}>
                      <AniLink
                        paintDrip
                        duration={0.75}
                        hex={pageEffectRed}
                        to={props.link}
                        activeClassName={style.activeMenu}
                      >
                        {props.name}
                      </AniLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </Container>
      </header>
    </>
  )
}

const getImage = graphql`
  query {
    logo: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fixed(width: 167, height: 45) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

Header.propTypes = {
  menuLinks: PropTypes.arrayOf(PropTypes.shape({})),
  triggerSearch: PropTypes.func.isRequired,
}

export default Header
