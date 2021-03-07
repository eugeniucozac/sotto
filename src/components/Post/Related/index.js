import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { Row, Col } from "react-bootstrap"
import Image from "gatsby-image"
import { postFields } from "../../../fragments/postFields"
import { pageEffectRed } from "../../../constants"
import style from "./Related.module.css"

const Related = () => {
  const { posts } = useStaticQuery(getPosts)

  return (
    <div className={style.wrapper}>
      <h3>Related Articles</h3>
      <Row>
        {posts.nodes.map(({ id, image, title, date, slug }) => (
          <Col lg="4" md="6" key={id}>
            <div className={style.item}>
              <div className={style.imageWrapper}>
                <Image fluid={image.fluid} className="img" alt={title} />
              </div>
              <div className={style.metaBox}>
                <ul>
                  <li>
                    <a>{date}</a>
                  </li>
                </ul>
                <h4 className="title">
                  <AniLink paintDrip duration={0.75} hex={pageEffectRed} to={`/blog/${slug}`}>
                    {title}
                  </AniLink>
                </h4>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

const getPosts = graphql`
  query {
    posts: allContentfulPost(limit: 3) {
      nodes {
        ...postFields
      }
    }
  }
`

Related.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
    })
  ),
}

export default Related
