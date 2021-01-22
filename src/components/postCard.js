import React, { useRef } from "react"
import {
  Highlight,
  connectHits,
  connectSearchBox,
} from "react-instantsearch-dom"

import { Link } from "gatsby"
import Carousel from "react-material-ui-carousel"
import {
  Paper,
  Slide,
  Tabs,
  Tab,
  Button,
  AppBar,
  Toolbar,
  InputBase,
} from "@material-ui/core"
import { Go } from "../components"
import { ItemCarrousel, Buscador, ButtonBanner } from "../styles"
import { styled, makeStyles } from "@material-ui/styles"
import SearchIcon from "@material-ui/icons/Search"

export const POSTCARD = ({ hit }) => {
  console.log(hit)
  return (
    <div>
      <img src={hit.image} />
      <div className="sobre">
        <Highlight hit={hit} attribute="titulo" tagName="mark" />

        <Link to={hit.slug}>GO!</Link>
      </div>
    </div>
  )
}

// export const CustomHits = connectHits(Hits)

const lucesita = index => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}

const useStyles = makeStyles({
  tabs: {
    border: `2px solid #F5F5F5`,
    height: 500,
  },
  tab: {
    fontFamily: "Roboto",
    fontSize: ".9rem",
    textTransform: "lowercase",
    textTransform: "capitalize",
    maxWidth: "10rem",
  },
  vertical: {
    "& span:nth-child(2)": { right: "auto", backgroundColor: "#4ECAEE" },
  },
  indicator: {
    width: 5,
  },
})

const HitsTabs = ({ hits, idx, handle }) => {
  const classes = useStyles()

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={idx}
      onChange={handle}
      className={classes.tabs}
      classes={{ scroller: classes.vertical, indicator: classes.indicator }}
    >
      {hits.map((hit, index) => (
        <Tab label={hit.titulo} {...lucesita(index)} className={classes.tab} />
      ))}
    </Tabs>
  )
}

export const CustomHitsTabs = connectHits(HitsTabs)

const useStylesSearch = makeStyles({
  search: {
    position: "relative",
    borderRadius: "1%",
    backgroundColor: "#4ECAEE",
    marginRight: "5%",
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    padding: "1px 10px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputinput: {
    color: "#ffff",
    padding: 5,
    // vertical padding + font size from searchIcon
    paddingLeft: 50,
    transition: ".7s",
    width: "100%",
  },
})

const SearchBox = ({ currentRefinement, refine }) => {
  const classes = useStylesSearch()
  return (
    <AppBar position="relative">
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>

        <InputBase
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
          value={currentRefinement}
          className={classes.inputinput}
          onChange={event => refine(event.currentTarget.value)}
        />
      </div>
    </AppBar>
  )
}

export const CustomSearch = connectSearchBox(SearchBox)
