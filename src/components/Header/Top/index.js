import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Col, Container, Row } from "react-bootstrap"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { FaSearch } from "react-icons/fa"
import SocialIcons from "../../shared/SocialIcons"
import useSlide from "../../hooks/useSlide"
import { pageEffectRed } from "../../../constants"
import style from "./Top.module.css"

const Top = ({ triggerSearch }) => {
  const {
    posts: { edges: posts },
  } = useStaticQuery(getPosts)

  const [currentSlide] = useSlide(posts)

  return (
    <section className={style.topHeader}>
      <Container>
        <Row>
          <Col lg="8" sm="12">
            <div className={style.newsBell}>Recent Post :</div>
            <div className={style.breakingNews}>
              {posts.map(({ node: { title, slug } }, index) => {
                return (
                  <article key={index} className={index === currentSlide ? `${style.active}` : ""}>
                    <AniLink paintDrip duration={0.75} hex={pageEffectRed} to={`/blog/${slug}`}>
                      {title}
                    </AniLink>
                  </article>
                )
              })}
            </div>
          </Col>
          <Col lg="4" md="12">
            <ul className={`${style.socialIcon} text-right`}>
              <SocialIcons />
              <li>
                <button onClick={triggerSearch} className={style.search} id="search-button">
                  <FaSearch />
                </button>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

const getPosts = graphql`
  query TopPostsQuery {
    posts: allContentfulPost(sort: { fields: [date], order: DESC }, limit: 3) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`

Top.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
    })
  ),
  triggerSearch: PropTypes.func.isRequired,
}

export default Top
