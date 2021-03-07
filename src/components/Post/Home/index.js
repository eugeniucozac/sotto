import React from "react"
import PropTypes from "prop-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Truncate from "react-truncate"
import Image from "gatsby-image"
import { FaComment } from "react-icons/fa"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { pageEffectRed } from "../../../constants"
import style from "./Home.module.css"

const Home = ({ data: { image, title, date, slug, content, category } }) => {
  return (
    <section className={style.wrapper}>
      <div className={style.imageWrapper}>
        <div className={style.tag}>
          <a>{category}</a>
        </div>
        <Image fluid={image.fluid} className="img" alt={title} />
      </div>
      <div className={style.content}>
        <ul className={`${style.authorMeta} clearfix`}>
          <li>
            <a>{date}</a>
          </li>
        </ul>
        <h4>
          <AniLink paintDrip duration={0.75} hex={pageEffectRed} to={`/blog/${slug}#disqus_thread`}>
            {title}
          </AniLink>
        </h4>
        <ul className={`${style.shareMeta} clearfix`}>
          <li>
            <AniLink
              paintDrip
              duration={0.75}
              hex={pageEffectRed}
              to={`/blog/${slug}#disqus_thread`}
            >
              <FaComment />
              Comments (02)
            </AniLink>
          </li>
        </ul>
        <div className={style.excerpt}>
          <Truncate lines={1} width={1000}>
            {documentToReactComponents(content.json)}
          </Truncate>
        </div>
      </div>
    </section>
  )
}

Home.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
  }),
}

export default Home
