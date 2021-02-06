import React from "react"
import { InputBase_00 } from "./atoms"
import { GestureTabs_00 } from "./particles"
import { TabsSideWrapper } from "./styles"
import {animated} from "react-spring"
import {
  connectSearchBox
} from "react-instantsearch-dom"
import {makeStyles} from "@material-ui/styles" 
import SearchIcon from "@material-ui/icons/Search"
import {AppBar,InputBase} from "@material-ui/core"


// # Proposito
// Componente slide que sirve como search menu
// # Requiere Material UI - react-spring - react-gesture
const TabsSideAnimated = animated(TabsSideWrapper)
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
 const CustomSearch = connectSearchBox(SearchBox)


export const TabsSide = ({hits,handleTab,style}) => {
    return <TabsSideAnimated style={style}>
        <CustomSearch/>
        <GestureTabs_00 hits={hits} handleTab={handleTab}/>
        </TabsSideAnimated>
}
