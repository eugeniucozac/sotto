import { graphql } from "gatsby"

export const pageFields = graphql`
  fragment pageFields on ContentfulPage {
    title
    description {
      json
    }
  }
`
