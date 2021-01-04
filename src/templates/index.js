import React from "react"
import { graphql } from "gatsby"
import { useUsuario } from "../js/store"
import { LAYOUT, POSTCARD } from "../components"

import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom"

const Index = () => {
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_ADMIN_KEY
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
