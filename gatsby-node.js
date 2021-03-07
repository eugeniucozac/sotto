const path = require("path")
const addMonths = require("date-fns/addMonths")

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith("develop")) {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "react-dom": "@hot-loader/react-dom",
        },
      },
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      posts: allContentfulPost {
        edges {
          node {
            slug
            category
            date(formatString: "YYYY-MM")
          }
        }
      }
      travel: allContentfulVideo {
        edges {
          node {
            slug
          }
        }
      }
      categories: allContentfulTaxonomy {
        nodes {
          name
          slug
        }
      }
    }
  `)

  data.posts.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.slug}`,
      component: path.resolve("./src/templates/blog-template.js"),
      context: {
        slug: node.slug,
      },
    })
  })

  data.travel.edges.forEach(({ node }) => {
    createPage({
      path: `travel/${node.slug}`,
      component: path.resolve("./src/templates/travel-template.js"),
      context: {
        slug: node.slug,
      },
    })
  })

  const posts = data.posts.edges
  const postsPerPage = 4
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  const archivesFound = [...new Set(data.posts.edges.map(post => post.node.date))].sort()

  data.categories.nodes.forEach(category => {
    createPage({
      path: `category/${category.slug}`,
      component: path.resolve(`./src/templates/blog-category-page.js`),
      context: {
        category: category.slug,
      },
    })
  })

  archivesFound.forEach(archive => {
    const fromJenea = new Date(archive)
    const toJenea = addMonths(new Date(archive), 1)
    /*
    console.log("gte", new Date(archive))
    console.log("lt", addMonths(new Date(archive), 1))
    console.log("------------------------")
    */
    createPage({
      path: `archive/${archive}`,
      component: path.resolve(`./src/templates/blog-archive-page.js`),
      context: {
        from: fromJenea,
        to: toJenea,
      },
    })
  })
}
