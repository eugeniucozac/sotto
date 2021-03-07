import React from "react"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaHubspot } from "react-icons/fa"

const SocialIcons = () => (
  <>
    <li className="icon">
      <a href="https://www.facebook.com/innout/" target="_blank" rel="noopener noreferrer">
        <FaFacebookF />
      </a>
    </li>
    <li className="icon">
      <a href="https://twitter.com/innoutburger" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
    </li>
    <li className="icon">
      <a href="https://www.hubspot.com/startups" target="_blank" rel="noopener noreferrer">
        <FaHubspot />
      </a>
    </li>
    <li className="icon">
      <a
        href="https://www.linkedin.com/company/in-n-out-burger/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedinIn />
      </a>
    </li>
  </>
)

export default SocialIcons
