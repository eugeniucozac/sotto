import React from "react"
import PropTypes from "prop-types"
import { Container } from "react-bootstrap"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import useSlide from "../hooks/useSlide"
import style from "./Slider.module.css"

const Slider = () => {
  const {
    sliders: { edges: sliders },
  } = useStaticQuery(getSliders)

  const [currentSlide] = useSlide(sliders)
  return (
    <>
      <section className={style.slider}>
        <ul className={style.outer}>
          {sliders.map(({ node: { image, title, content, link } }, index) => (
            <li key={index} className={index === currentSlide ? `${style.active}` : ""}>
              <Image fluid={image.fluid} alt={title} />
              <div className={style.overlay}>
                <div className={style.wrapper}>
                  <Container>
                    <h1>{title}</h1>
                    {content && documentToReactComponents(content.json)}
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      Continue Reading
                    </a>
                  </Container>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

const getSliders = graphql`
  query SlidersQuery {
    sliders: allContentfulSlider {
      edges {
        node {
          link
          title
          image {
            fluid(maxHeight: 700) {
              ...GatsbyContentfulFluid
            }
          }
          content {
            json
          }
        }
      }
    }
  }
`

Slider.propTypes = {
  sliders: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.object.isRequired,
      image: PropTypes.object.isRequired,
    })
  ),
}

export default Slider
