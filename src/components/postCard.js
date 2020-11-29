import React from "react"
import { Highlight } from "react-instantsearch-dom"
import { Link } from "gatsby"

export const POSTCARD = ({ hit }) => {
  console.log(hit)
  const rat = hit.preview
  return (
    <div>
      <p>
        <Highlight hit={hit} attribute="preview.titulo" tagName="mark" />
      </p>
      <img src={hit.url} />
      <Link to={hit.content.content}>GO!</Link>
    </div>
  )
}
