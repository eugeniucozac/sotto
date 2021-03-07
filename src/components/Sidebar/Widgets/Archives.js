import React from "react"
import PropTypes from "prop-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { useStaticQuery, graphql } from "gatsby"
import { format } from "date-fns"
import { pageEffectRed } from "../../../constants"
import style from "./Widgets.module.css"

const Archives = () => {
  const {
    posts: { edges: posts },
  } = useStaticQuery(getArchives)
  const archives = [...new Set(posts.map(post => post.node.date))].sort()

  return (
    <ul className={style.archives}>
      {archives.map((item, index) => (
        <li key={index}>
          <AniLink
            paintDrip
            duration={0.75}
            hex={pageEffectRed}
            to={`/archive/${item.split(" ").join("-").toLowerCase()}`}
          >
            {format(new Date(item), "MMMM yyyy")}
          </AniLink>
        </li>
      ))}
    </ul>
  )
}

const getArchives = graphql`
  query ArchivesQuery {
    posts: allContentfulPost {
      edges {
        node {
          date(formatString: "YYYY-MM")
        }
      }
    }
  }
`

Archives.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
    })
  ),
}

export default Archives
