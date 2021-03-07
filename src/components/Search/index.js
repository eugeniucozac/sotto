import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { Container } from "react-bootstrap"
import { useForm } from "react-hook-form"
import style from "./Search.module.css"

const Search = ({ triggerSearch, isSearching }) => {
  const { handleSubmit, register, reset } = useForm()

  const onSubmit = values => {
    navigate("/search", { state: { name: values.keyword } })
    onClose()
  }

  const onClose = () => {
    triggerSearch()
    reset()
  }

  return (
    <section className={`${style.searchWrapper} ${isSearching ? "showBox" : ""}`}>
      <div className={style.closeButton} onClick={onClose}></div>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.greetingText}>
            <span>Good evening</span>
          </div>
          <div className={style.inputWrapper}>
            <input
              name="keyword"
              placeholder="type your keyword"
              autoFocus
              ref={register({
                validate: value => value.length > 1,
              })}
            />
          </div>
        </form>
      </Container>
    </section>
  )
}

Search.propTypes = {
  triggerSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
}

export default Search
