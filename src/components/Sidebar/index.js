import React from "react"
import { Col } from "react-bootstrap"
import Widgets from "./Widgets"
import Categories from "./Widgets/Categories"
import Archives from "./Widgets/Archives"
import About from "./Widgets/About"
import LatestPosts from "./Widgets/LatestPosts"
import LatestTravel from "./Widgets/LatestTravel"

const Sidebar = () => {
  return (
    <Col lg="4" md="7" sm="12">
      <Widgets title="About Me">
        <About />
      </Widgets>
      <Widgets title="Categories">
        <Categories />
      </Widgets>
      <Widgets title="Latest Posts">
        <LatestPosts />
      </Widgets>
      <Widgets title="Archives">
        <Archives />
      </Widgets>
      <Widgets title="Latest Travel">
        <LatestTravel />
      </Widgets>
    </Col>
  )
}

export default Sidebar
