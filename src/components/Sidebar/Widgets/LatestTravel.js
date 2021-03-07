import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { pageEffectRed } from "../../../constants"
import style from "./Widgets.module.css"

const LatestTravel = () => {
  const {
    travel: { edges: travel },
  } = useStaticQuery(getTravel)

  return travel.map(({ node: { title, slug, createdAt } }, index) => {
    return (
      <section key={index} className={`${style.latestPost} clearfix`}>
        <div className={`${style.videoContent} clearfix`}>
          <h5>
            <AniLink paintDrip duration={0.75} hex={pageEffectRed} to={`/travel/${slug}`}>
              {title}
            </AniLink>
          </h5>
          <ul>
            <li>Videos</li>
            <li>{createdAt}</li>
          </ul>
        </div>
      </section>
    )
  })
}

const getTravel = graphql`
  query LatestTravelQuery {
    travel: allContentfulVideo(sort: { fields: [date], order: DESC }, limit: 4) {
      edges {
        node {
          title
          slug
          createdAt(formatString: "DD MMMM")
        }
      }
    }
  }
`
LatestTravel.propTypes = {
  travel: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
    })
  ),
}

export default LatestTravel
