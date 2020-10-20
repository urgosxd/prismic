const path = require(`path`)
const Markdowns = require(`markdown-it`)
const { paginate } = require(`gatsby-awesome-pagination`)

const parser = new Markdowns({
  html: false, // desactivamos el uso de HTML dentro del markdown
  breaks: true, // transforma los saltos de línea a un <br />
  linkify: true, // detecta enlaces y los vuelve enlaces
  xhtmlOut: true, // devuelve XHTML válido (por ejemplo <br /> en vez de <br>)
  typographer: true, // reemplaza ciertas palabras para mejorar el texto
  langPrefix: "language-", // agrega una clase `language-[lang]` a los bloques de código
})

parser.use(require("markdown-it-attrs"))

const toSlug = str => {
  str = str.replace(/^\s+|\s+$/g, "") // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
  var to = "aaaaeeeeiiiioooouuuunc------"
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes

  return str
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allStrapiPosts(sort: { order: ASC, fields: updatedAt }) {
        edges {
          node {
            id
            titulo
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw new Error(result.errors)
  }

  //Extract Querys
  const posts = result.data.allStrapiPosts.edges

  //Load Templates
  const indexTemplate = path.resolve("./src/templates/index.js")
  const postTemplate = path.resolve("./src/templates/post.js")

  posts.forEach(({ node }) => {
    node.url = toSlug(node.titulo)
    node.url = `/${node.url}/`
    createPage({
      path: node.url,
      component: postTemplate,
      context: {
        slug: toSlug(node.titulo),
      },
    })
  })

  paginate({
    createPage,
    items: posts,
    itemsPerPage: 5,
    component: indexTemplate,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return `/`
      } else {
        return `/page`
      }
    },
  })
}

module.exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type === "StrapiPosts") {
    const newNode = {
      id: createNodeId(`StrapiPostsContent-${node.id}`),
      parent: node.id,
      internal: {
        content: parser.render(node.content) || " ",
        type: "StrapiPostsContent",
        mediaType: "text/markdown",
        contentDigest: createContentDigest({
          content: JSON.stringify(node.content),
        }),
      },
    }
    actions.createNode(newNode)
    actions.createParentChildLink({
      parent: node,
      child: newNode,
    })
    if (node.internal.type === "StrapiPosts") {
      const newNode = {
        id: createNodeId(`StrapiPostsSlug-${node.id}`),
        parent: node.id,
        internal: {
          content: toSlug(node.titulo) || " ",
          type: "Slug",
          mediaType: "text/markdown",
          contentDigest: createContentDigest({
            content: JSON.stringify(node.titulo),
          }),
        },
      }
      actions.createNode(newNode)
      actions.createParentChildLink({
        parent: node,
        child: newNode,
      })
    }
  }
}
