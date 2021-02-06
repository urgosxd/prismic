import React from "react"
import { Tab, AppBar, InputBase } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import SearchIcon from "@material-ui/icons/Search"
const useStyles_Tab_00 = makeStyles({
  root: {
    fontFamily: "Roboto",
    fontSize: ".9rem",
    textTransform: "lowercase",
    textTransform: "capitalize",
    maxWidth: "10rem",
  },
 
})

const lucesita = index => {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}
export const Tab_00 = ({ element, index, handle }) => {
  return (
    <Tab
      label={element.titulo}
      {...lucesita(index)}
      onClick={() => handle(`${element.titulo}${index}`)}
    />
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
export const SearchBox = ({ currentRefinement, refine }) => {
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
