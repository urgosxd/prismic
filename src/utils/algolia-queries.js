const blogQuery = `{
  allPrismicPost {
    edges {
      node {
        uid
        id
        data {
          preview {
            date
            title1 {
              text
            }
            description
            image {
              fluid {
                src
              }
            }
          }
        }
      }
    }
  }
}
`

function pageToAlgoliaRecord({ node }) {
  const id = node.id
  const description = node.data.preview[0].description
  const text = node.data.preview[0].title1.text
  const date = node.data.preview[0].date
  const slug = node.uid
  const image = node.data.preview[0].image.fluid.src
  return {
    objectID: id,
    description,
    titulo: text,
    date,
    slug,
    image,
  }
}

const indexName = "blog"

const queries = [
  {
    query: blogQuery,
    transformer: ({ data }) =>
      data.allPrismicPost.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries
