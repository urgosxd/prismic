import React from "react"
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import {Link} from "gatsby"
const useStyles_Button_00 = makeStyles({
  root: {
    backgroundColor: "#ffff",
    width:170
  },
})
export const Button_00 = ({ to }) => {
  const classes = useStyles_Button_00()
  return (
    <Button component={Link} to={to} variant="contained" className={classes.root}>
      Leer
    </Button>
  )
}

const useStyles_ItemCarrousel_00 = makeStyles({
  root: {
    backgroundImage: props => (props.url ? `url(${props.url})` : "green"),
    backgroundRepeat: "no-repeat",
    height: 600,
    width: "100%",
    cursor: "grab",
    backgroundSize: "100% auto",
    backgroundPosition: "center top",
    userSelect: "none",
    touchAction: "none",
  },
})
export const ItemCarrousel_00 = props => {
  const { color, ...other } = props
  const classes = useStyles_ItemCarrousel_00(props)
  return <div className={classes.root} {...other} />
}
