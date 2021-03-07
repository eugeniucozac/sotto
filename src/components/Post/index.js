import React, { useEffect } from "react"
import PropTypes from "prop-types"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Truncate from "react-truncate"
import { FaComment } from "react-icons/fa"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Image from "gatsby-image"
import { pageEffectRed } from "../../constants"
import style from "./Post.module.css"

const Post = ({
  data: { image, title, category, date, slug, content, tags },
  truncate,
  single,
}) => {
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

  const loadComments = () => {
    window.disqus_config = function () {
      this.page.url = window.location.href
      this.page.identifier = title
    }

    const script = document.createElement("script")
    script.src = "https://http-sottoblog-com.disqus.com/embed.js"
    script.setAttribute("data-timestamp", Date.now().toString())

    document.body.appendChild(script)
  }

  useEffect(
    () => {
      loadComments()
    },
    [],
  );



  return (
    <section className={style.wrapper}>
      <div className={style.imageWrapper}>
        <Image fluid={image.fluid} className="img" alt={title} />
      </div>
      <div className={style.content}>
        <ul className={`${style.authorMeta} clearfix`}>
          <li>
            <a>{category}</a>
          </li>
          <li>
            <a>{date}</a>
          </li>
        </ul>
        <h4>
          <AniLink paintDrip duration={0.75} hex={pageEffectRed} to={`/blog/${slug}#disqus_thread`}>
            {title}
          </AniLink>
        </h4>
        {!single && (
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
        )}
        {truncate ? (
          <div className={style.excerpt}>
            <Truncate lines={1} width={2000}>
              {documentToReactComponents(content.json)}
            </Truncate>
          </div>
        ) : (
          documentToReactComponents(content.json, options)
        )}
        {single && (
          <div className={style.tags}>
            <ul>
              <li>tags:</li>
              {tags.split(",").map((tag, index) => (
                <li key={index}>
                  <a>{tag}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

Post.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired.apply,
    category: PropTypes.string.isRequired,
    image: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    tags: PropTypes.string.isRequired,
  }),
}

export default Post
