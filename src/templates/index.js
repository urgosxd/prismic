import React from "react"
import { graphql } from "gatsby"
import { useUsuario } from "../js/store"
import { LAYOUT, POSTCARD } from "../components"

import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom"

const Index = ({ data, location, pageContext }) => {
  const posts = data.allStrapiPosts.edges
  console.log(posts)
  const searchClient = algoliasearch(
    "896EKI828Y",
    "df28a548bfac4d7443e486003da378ca"
  )

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="blog">
        <SearchBox />
        <Hits hitComponent={POSTCARD} />
      </InstantSearch>
      <LAYOUT></LAYOUT>
    </>
  )
}

export default Index

export const pageQuery = graphql`
  query POSTQUERY($limit: Int!, $skip: Int!) {
    allStrapiPosts(
      sort: { order: DESC, fields: updatedAt }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          strapiId
          content
          slug
          preview {
            titulo
            description
          }
        }
      }
    }
  }
`
