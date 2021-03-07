import { graphql } from "gatsby"

export const postFields = graphql`
  fragment postFields on ContentfulPost {
    id: contentful_id
    title
    slug
    image {
      fluid {
        ...GatsbyContentfulFluid
      }
    }
    date(formatString: "DD MMMM, YYYY ")
  }
`
