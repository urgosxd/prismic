import React from "react"
import { AppBar, Toolbar, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import MenuIcon from "@material-ui/icons/Menu"
import { Navs } from "./molecules"
import WorkIcon from "@material-ui/icons/Work"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
      paddingTop:15,
    "& ul": {
      [theme.breakpoints.up("xs")]: {
        display: "none",
      },
      [theme.breakpoints.up("lg")]: {
        display: "flex",
        flexDirection: "row",
      },
      "& li": {
        fontFamily: "EB Garamond",
        listStyle: "none",
        marginLeft: 20,
        fontWeight: "500",
        cursor: "pointer",
      },
    },
  },
  tool: {
    backgroundColor: "#ffff",
    color: "black",
    display: "flex",
    justifyContent: "center",
  },
  divTool: {
    display: "flex",
    justifyContent: "space-between",
    width: "92%",
  },
  burger: {
    [theme.breakpoints.up("xs")]: {
      display: "block",
    },
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}))

export const NavBar = ({}) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar elevation={0} position="static" color="transparent">
        <Toolbar className={classes.tool}>
          <div className={classes.divTool}>
            <IconButton disableRipple edge="start" color="inherit">
              <WorkIcon />
            </IconButton>
            <Navs />
            <IconButton
              className={classes.burger}
              disableRipple
              edge="start"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
