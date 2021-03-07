import React from "react"
import PropTypes from "prop-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { useStaticQuery, graphql } from "gatsby"
import { pageEffectRed } from "../../../constants"
import style from "./Widgets.module.css"

const Categories = () => {
  const { categories } = useStaticQuery(getCategories)
  return (
    <ul className={style.archives}>
      {categories.nodes.map(({ name, slug }, index) => (
        <li key={index}>
          <AniLink paintDrip duration={0.75} hex={pageEffectRed} to={`/category/${slug}`}>
            {name}
          </AniLink>
        </li>
      ))}
    </ul>
  )
}

const getCategories = graphql`
  query CategoriesQuery {
    categories: allContentfulTaxonomy {
      nodes {
        name
        slug
      }
    }
  }
`

Categories.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
    })
  ),
}

export default Categories
