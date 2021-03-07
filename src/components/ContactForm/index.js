import React from "react"
import { useForm } from "react-hook-form"
import { useForm as useFormspree } from "@formspree/react"
import Button from "../shared/Button"
import style from "./ContactForm.module.css"

const ContactForm = () => {
  const { handleSubmit, register, errors } = useForm()
  const [serverState, sendToFormspree] = useFormspree(process.env.FORMSPREE)

  if (serverState.succeeded) {
    return <p className={style.message}>Your message was sent successfully</p>
  }

  return (
    <>
      <form onSubmit={handleSubmit(sendToFormspree)}>
        <label>Full Name</label>
        <input
          name="fullName"
          placeholder="John Doe"
          ref={register({
            validate: value => value.length > 4,
          })}
          className={errors.fullName ? style.error : ""}
        />
        <label>Email address</label>
        <input
          name="email"
          placeholder="ex@example.com"
          ref={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            },
          })}
          className={errors.email ? style.error : ""}
        />
        <label>Your message</label>
        <textarea
          placeholder="Message"
          name="message"
          ref={register({
            validate: value => value.length > 4,
          })}
          className={errors.message ? style.error : ""}
        ></textarea>
        <Button name="Submit" />
      </form>
    </>
  )
}

export default ContactForm
