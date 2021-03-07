import React from "react"
import PropTypes from "prop-types"
import Truncate from "react-truncate"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { useStaticQuery, graphql } from "gatsby"
import { pageFields } from "../../../fragments/pageFields"
import style from "./Widgets.module.css"

const About = () => {
  const { page } = useStaticQuery(getAboutPage)

  return (
    <section className={style.about}>
      <Truncate lines={1} width={2000}>
        {documentToReactComponents(page.description.json)}
      </Truncate>
      <div className="clearfix"></div>
    </section>
  )
}

const getAboutPage = graphql`
  query {
    page: contentfulPage(title: { eq: "About" }) {
      ...pageFields
    }
  }
`

About.propTypes = {
  page: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.object.isRequired,
    })
  ),
}

export default About
