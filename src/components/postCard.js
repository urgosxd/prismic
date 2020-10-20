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
      <img src={rat.featuredImage.formats.small.url} />
      <Link to={hit.childSlug.internal.content}>GO!</Link>
    </div>
  )
}
