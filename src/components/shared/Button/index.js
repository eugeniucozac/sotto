import React from "react"
import PropTypes from "prop-types"
import style from "./Button.module.css"

const Button = ({ name }) => {
  return <button className={style.themeButton} type="submit">{name}</button>
}

Button.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Button
