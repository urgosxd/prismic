import React from "react"
import { ButtonBanner } from "../styles"
import { Link } from "gatsby"
import { styled, makeStyles } from "@material-ui/styles"
import { Button, Fab } from "@material-ui/core"
import { useSpring, animated, interpolate } from "react-spring"
import { useGesture } from "react-use-gesture"
import NavigationIcon from "@material-ui/icons/Navigation"
import PropTypes from "prop-types"

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    width: 200,
    "&:hover": {
      transition: ".7s",
      backgroundColor: "white",
      filter: "invert(1)",
    },
    "& a": {
      textDecoration: "none",
      color: "rgba(51,51,51)",
    },
  },
}))

export const Go = ({ to, children, ...rest }) => {
  const classes = useStyles()

  return (
    <Button className={classes.root} component={Link} to={to}>
      {children}
    </Button>
  )
}

export const Slider = ({ children }) => {
  return <div></div>
}

const useStylesFab = makeStyles({
  fab: {
    fontSize: ".7rem",
    background: "#EEEEEE",
    color: "white",
    boxShadow: "none",
  },
  icon: {
    transform: props =>
      props.estado === true ? "rotate(90deg)" : "rotate(270deg)",
    transition: "0.5s",
    marginRight: 5,
    color: "white",
  },
})
export const MyFabToggle = props => {
  const { estado, ...other } = props
  const classes = useStylesFab(props)
  return (
    <Fab variant="extended" className={classes.fab} {...other}>
      <NavigationIcon className={classes.icon} />
      Show
    </Fab>
  )
}
