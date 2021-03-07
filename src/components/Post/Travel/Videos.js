import React from "react"
import PropTypes from "prop-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { pageEffectRed } from "../../../constants"
import style from "./Travel.module.css"

const Videos = ({ data: { title, slug, content, youtube, createdAt } }) => {
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <b>{text}</b>,
      [MARKS.CODE]: text => <i>{text}</i>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.DOCUMENT]: (node, children) => <div className={style.text}>{children}</div>,
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { description, file } = node.data.target.fields
        return <img alt={description ? description["en-US"] : null} src={file["en-US"].url} />
      },
    },
  }

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
      </div>
      <div className={style.content}>
        <ul className={`${style.authorMeta} clearfix`}>
          <li>
            <a>Video</a>
          </li>
          <li>
            <a>{createdAt}</a>
          </li>
        </ul>
        <h4>
          <AniLink paintDrip duration={0.75} hex={pageEffectRed} to={`/travel/${slug}`}>
            {title}
          </AniLink>
        </h4>
        {documentToReactComponents(content.json, options)}
      </div>
    </section>
  )
}

Videos.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    youtube: PropTypes.string.isRequired,
  }),
}

export default Videos
