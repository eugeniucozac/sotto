import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { pageEffectRed } from "../../../constants"
import style from "./Widgets.module.css"

const LatestPosts = () => {
  const {
    posts: { edges: posts },
  } = useStaticQuery(getLatestPosts)

  return posts.map(({ node: { title, slug, image, category, date } }, index) => {
    return (
      <section key={index} className={`${style.latestPost} clearfix`}>
        <Image fixed={image.fixed} alt={title} />
        <div className={`${style.postContent} clearfix`}>
          <h5>
            <AniLink paintDrip duration={0.75} hex={pageEffectRed} to={`/blog/${slug}`}>
              {title.length > 30 ? `${title.slice(0, 40)}...` : title}
            </AniLink>
          </h5>
          <ul>
            <li>{category}</li>
            <li>{date}</li>
          </ul>
        </div>
      </section>
    )
  })
}

const getLatestPosts = graphql`
  query LatestPostsQuery {
    posts: allContentfulPost(sort: { fields: [date], order: DESC }, limit: 4) {
      edges {
        node {
          title
          slug
          date(formatString: "DD MMMM")
          category
          image {
            fixed(height: 65, width: 80) {
              ...GatsbyContentfulFixed
            }
          }
        }
      }
    }
  }
`

LatestPosts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
    })
  ),
}

export default LatestPosts
