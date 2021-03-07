import React from "react"
import PropTypes from "prop-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi"
import { pageEffectRed } from "../../../constants"
import style from "./Pagination.module.css"

const Pagination = ({ currentPage, numPages, slug }) => {
  const prevPage = currentPage - 1 === 1 ? `/${slug}/` : `/${slug}/${currentPage - 1}`
  const nextPage = `/${slug}/${currentPage + 1}`
  const pages = [...Array(numPages).keys()]

  return (
    <section className={style.pagination}>
      <ul>
        {currentPage !== 1 && (
          <li>
            <AniLink paintDrip duration={0.75} hex={pageEffectRed} to={prevPage}>
              <HiArrowNarrowLeft />
            </AniLink>
          </li>
        )}
        {pages.map((page, index) => {
          return (
            <li key={index}>
              <AniLink
                paintDrip
                duration={0.75}
                hex={pageEffectRed}
                to={`/${slug}/${index === 0 ? "" : index + 1}`}
                className={index + 1 === currentPage ? `${style.active}` : ""}
              >
                {index + 1}
              </AniLink>
            </li>
          )
        })}
        {currentPage !== numPages && (
          <li>
            <AniLink paintDrip duration={0.75} hex={pageEffectRed} to={nextPage}>
              <HiArrowNarrowRight />
            </AniLink>
          </li>
        )}
      </ul>
    </section>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  numPages: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
}

export default Pagination
