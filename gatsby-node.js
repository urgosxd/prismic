const path = require("path")
const { paginate } = require(`gatsby-awesome-pagination`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allPrismicPost {
        edges {
          node {
            uid
          }
        }
      }
    }
  `)
  if (result.errors) {
    throw new Error(result.errors)
  }

  //Extract Querys

  const posts = result.data.allPrismicPost.edges

  //Load Templates
  const indexTemplate = path.resolve("./src/templates/index.js")
  const postTemplate = path.resolve("./src/templates/post.js")
  posts.forEach(({ node }) => {
    node.url = `/${node.uid}/`
    createPage({
      path: node.url,
      component: postTemplate,
      context: {
        slug: node.uid,
      },
    })
  })

  createPage({
    path: "/",
    component: indexTemplate,
  })
}
