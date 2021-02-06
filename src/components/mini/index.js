import React from "react"
import  IconButton  from "@material-ui/core/IconButton"
import { makeStyles } from "@material-ui/styles"
import ImageSearchIcon from "@material-ui/icons/ImageSearch"

const useStylesButtonToggle = makeStyles({
  root: {
    height: "max-content",
  },
})
export const ButtonToggle = ({ handleOnClick }) => {
  const classes = useStylesButtonToggle()
  return (
    <IconButton
      aria-label="delete"
      className={classes.root}
      onClick={() => handleOnClick(true)}
    >
      <ImageSearchIcon/>
    </IconButton>
  )
}
