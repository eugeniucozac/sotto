import React from "react"
import { Container } from "react-bootstrap"
import Image from "gatsby-image"
import { graphql, useStaticQuery, Link } from "gatsby"
import SocialIcons from "../shared/SocialIcons"
import style from "./Footer.module.css"

const Footer = () => {
  const { logo } = useStaticQuery(getImage)
  return (
    <footer className={style.themeFooter}>
      <Container>
        <div className={style.logo}>
          <Link to="/">
            <Image fixed={logo.childImageSharp.fixed} alt="Sotto" />
          </Link>
        </div>
        <p className={style.text}>Blog and Portfolio Theme</p>
        <ul className="social-icon">
          <SocialIcons />
        </ul>
        <p className={style.copyright}>© Copyright SOTTO - Powered by Eugene Cozac.</p>
      </Container>
    </footer>
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

export default Footer
