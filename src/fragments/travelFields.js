import { graphql } from "gatsby"

export const travelFields = graphql`
  fragment travelFields on ContentfulVideo {
    id: contentful_id
    title
    slug
    youtube
    content {
      json
    }
    createdAt(formatString: "DD MMMM, YYYY ")
  }
`
