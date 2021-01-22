import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { LayoutWrapper, NavWrapper } from "../styles"

export const LAYOUT = ({ children, isHome }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>
}
