import React from "react"
import PropTypes from "prop-types"
import style from "./Widgets.module.css"

const Widgets = ({ title, children }) => (
  <section className={style.box}>
    <h6>{title}</h6>
    {children}
  </section>
)

Widgets.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
}

export default Widgets
