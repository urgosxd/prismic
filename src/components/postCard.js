import React, { useEffect, useRef } from "react"
import {
  Highlight,
  connectHits,
  connectSearchBox,
} from "react-instantsearch-dom"
import Helmet from "react-helmet"
import { useSpring, animated } from "react-spring"
import { useGesture } from "react-use-gesture"
import useMeasure from "react-use-measure"
import { Link } from "gatsby"
import {
  Paper,
  Slide,
  Tabs,
  Tab,
  Button,
  AppBar,
  Toolbar,
  InputBase,
  Grid,
} from "@material-ui/core"
import { ItemCarrousel, DivCarrousel } from "../styles"
import { styled, makeStyles } from "@material-ui/styles"
import SearchIcon from "@material-ui/icons/Search"
import ImageSearchIcon from "@material-ui/icons/ImageSearch"
import { useSpringCarousel } from "react-spring-carousel-js"

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
const useStylesSearch = makeStyles({
  search: {
    position: "relative",
    borderTopLeftRadius: 15,
    backgroundColor: "#4ECAEE",
    marginRight: "5%",
    marginLeft: 0,
    width: "100%",
    padding: "10px 0",
  },
  searchIcon: {
    padding: "10px 15px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
  },
  inputinput: {
    color: "#ffff",
    padding: 5,
    // vertical padding + font size from searchIcon

    paddingLeft: 50,
    width: "100%",
  },
  appbar: {
    borderTopLeftRadius: 15,
  },
})
const SearchBox = ({ currentRefinement, refine }) => {
  const classes = useStylesSearch()
  return (
    <AppBar className={classes.appbar} position="relative">
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

const lucesita = index => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}

const useStyles = makeStyles({
  tabs: {
    borderBottomLeftRadius: 15,
    height: 500,
    backgroundColor: "#ffff",
    boxShadow: "0 8px 6px -6px black",
  },
  myButton: {
    height: "max-content",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& svg": {
      transition: ".8s",
    },
    "&:hover svg ": {
      transform: "scale(1.2)",
      transition: ".8s",
    },
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
  buttonItem: {
    background: "#ffff",
    textAlign: "center",
    width: 150,
    height: 50,
    letterSpacing: 2,
    lineHeight: 1,
    fontFamily: "Merriweather Sans",
    fontSize: "0.5rem",
  },
  buttonItemHover: {
    backgroundColor: "green",
  },
})
const TabsAnimado = animated(Tabs)
const CustomSearch = connectSearchBox(SearchBox)
const Hates = ({ hits }) => {
  const [valueTab, setValue] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }
  const classes = useStyles()
  const nuevo = hits.map((ele, idx) => ({
    id: `${ele.titulo}${idx}`,
    renderItem: (
      <DivCarrousel>
        <ItemCarrousel url={ele.image} />
        <div>
          <span className="buttonTitulo">{ele.titulo}</span>
          <Button
            hover
            classes={{ root: classes.buttonItemHover }}
            onClick={() => alert("asdas")}
          >
            READ MORE
          </Button>
        </div>
      </DivCarrousel>
    ),
  }))
  const { carouselFragment, slideToItem } = useSpringCarousel({
    draggingSlideTreshold: 350,
    items:
      hits.length !== 0
        ? nuevo
        : [
            {
              id: 0,
              renderItem: <div>nada</div>,
            },
            {
              id: 1,
              renderItem: <div>nadaaa</div>,
            },
          ],
  })
  const [outerRef, bounds] = useMeasure()
  const [contentRef, contentBounds] = useMeasure()
  const [{ y }, set] = useSpring(() => ({ y: 0 }))
  const scrollLimit = Math.max(0, contentBounds.height - bounds.height)
  const hasDragged = React.useRef(false)
  const bind = useGesture(
    {
      onDrag: ({ first, last, movement: [, y] }) => {
        if (first) hasDragged.current = true
        if (last) setTimeout(() => (hasDragged.current = false), 0)
        set({ y })
      },
      onClickCapture: event => {
        if (hasDragged.current) {
          event.stopPropagation()
        }
      },
    },
    {
      drag: {
        bounds: { top: -scrollLimit, bottom: 0 },
        axis: "y",
        rubberband: true,
        initial: () => [0, y.get()],
        filterTaps: true, // <-- this is important as useDrag won't fire for simple clicks
      },
    }
  )

  const [searchValue, setSearchValue] = React.useState(false)

  const { a, c } = useSpring({
    from: { a: 300, b: 100, c: 0 },
    a: searchValue ? 0 : 300,
    c: searchValue ? 1 : 0,
  })
  const html = document.querySelector("body")

  const handleTab = value => {
    slideToItem(value)
    setSearchValue(false)
  }
  useEffect(() => {
    if (searchValue) {
      html.style.overflow = "hidden"

      html.style.paddingRight = "16px"
    } else {
      html.style.overflow = "visible"

      html.style.paddingRight = "0px"
    }
  }, [searchValue])
  return (
    <div className="Pubg">
      {hits && carouselFragment}

      <Button
        className={classes.myButton}
        onClick={() => setSearchValue(true)}
      >
        <ImageSearchIcon fontSize="large" />
      </Button>
      {searchValue && (
        <animated.div
          style={{ opacity: c.interpolate(c => `${c}`) }}
          className="negro"
        />
      )}

      <animated.div
        className="derecha"
        style={{ transform: a.interpolate(a => `translateX(${a}px)`) }}
      >
        <CustomSearch />
        <div className="App">
          <div className="frame" ref={outerRef}>
            <TabsAnimado
              orientation="vertical"
              variant="scrollable"
              value={valueTab}
              onChange={handleChangeTab}
              className={classes.tabs}
              classes={{
                scroller: classes.vertical,
                indicator: classes.indicator,
              }}
              ref={contentRef}
              {...bind()}
              style={{ y }}
            >
              {hits &&
                hits.map((ele, idx) => (
                  <Tab
                    label={ele.titulo}
                    {...lucesita(idx)}
                    onClick={() => handleTab(`${ele.titulo}${idx}`)}
                    className={classes.tab}
                  />
                ))}
            </TabsAnimado>
          </div>
        </div>
      </animated.div>
    </div>
  )
}

export const CustomHits = connectHits(Hates)

const HitsTabs = ({ hits, idx, handle }) => {
  console.log(hits)
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value}
      onChange={handleChange}
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
