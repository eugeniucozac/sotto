import React from "react"
import PropTypes from "prop-types"
import { Container } from "react-bootstrap"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { FaArrowLeft } from "react-icons/fa"
import SEO from "../components/seo"
import { pageEffectRed } from "../constants"
import ContactForm from "../components/ContactForm"
import styles from "../styles/contact.module.css"

const ContactPage = () => (
  <>
    <SEO title="Contact" description="Contact form" />
    <div className={styles.mainPageWrapper}>
      <div className={styles.contactUs}>
        <div className={styles.backToHome}>
          <AniLink paintDrip duration={0.75} hex={pageEffectRed} to="/">
            <FaArrowLeft /> Back to home
          </AniLink>
        </div>
        <div className={styles.mainTextWrapper}>
          <Container>
            <div className={styles.contactForm}>
              <h2>Contact</h2>
              <p>You can contact me almost about anything</p>
              <ContactForm />
            </div>
          </Container>
        </div>
      </div>
    </div>
  </>
)

export default ContactPage
