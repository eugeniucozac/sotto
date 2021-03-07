import React from "react"
import PropTypes from "prop-types"
import Truncate from "react-truncate"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { FaComment, FaHeart } from "react-icons/fa"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { pageEffectRed } from "../../../constants"
import style from "./Travel.module.css"

const Travel = ({ data: { youtube, createdAt, slug, title, content }, data }) => {
  return (
    <section className={style.wrapper}>
      <div className={style.videoWrapper}>
        <div className={style.videoEmbed}>
          <div>
            <iframe
              src={`${youtube}?rel=0&amp;showinfo=0`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen=""
            ></iframe>
          </div>
        </div>
        <div className={style.tag}>
          <a>video</a>
        </div>
      </div>
      <div className={style.content}>
        <ul className={`${style.authorMeta} clearfix`}>
          <li>
            <a>{createdAt}</a>
          </li>
        </ul>
        <h4>
          <AniLink
            paintDrip
            duration={0.75}
            hex={pageEffectRed}
            to={`/travel/${slug}#disqus_thread`}
          >
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

Travel.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    youtube: PropTypes.string.isRequired,
  }),
}

export default Travel
