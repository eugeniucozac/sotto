import { graphql } from "gatsby"

export const postsFields = graphql`
  fragment postsFields on ContentfulPost {
    id: contentful_id
    title
    slug
    content {
      json
    }
    category
    image {
      fluid {
        ...GatsbyContentfulFluid
      }
    }
    tags
    date(formatString: "DD MMMM, YYYY ")
  }
`
