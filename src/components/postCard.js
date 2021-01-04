import React from "react"
import { Highlight } from "react-instantsearch-dom"
import { Link } from "gatsby"

export const POSTCARD = ({ hit }) => {
  console.log(hit)
  return (
    <div>
      <p>
        <Highlight hit={hit} attribute="preview.titulo" tagName="mark" />
      </p>
      <img src={hit.image} />

      <Link to={hit.slug}>GO!</Link>
    </div>
  )
}
