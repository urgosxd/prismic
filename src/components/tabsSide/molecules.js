import React from "react"
import { Tabs } from "@material-ui/core"
import { animated } from "react-spring"
import { makeStyles } from "@material-ui/styles"
import { Tab_00 } from "./atoms"
const useStyles_Tabs_00 = makeStyles({
  root: {
    borderBottomLeftRadius: 15,
    height: 500,
    backgroundColor: "#ffff",
    boxShadow: "0 8px 6px -6px black",
  },
  vertical: {
    "& span:nth-child(2)": { right: "auto", backgroundColor: "#4ECAEE" },
  },
  indicator: {
    width: 5,
  },
})
export const Tabs_00 = ({ hits, contentRef, bind, y, handleTab }) => {
  const TabsAnimated = animated(Tabs)
  const classes = useStyles_Tabs_00()
  const [valueTab, setValue] = React.useState(0)

  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <TabsAnimated
      orientation="vertical"
      variant="scrollable"
      value={valueTab}
      onChange={handleChangeTab}
      className={classes.root}
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
          <Tab_00 element={ele} index={idx} handle={handleTab} />
        ))}
    </TabsAnimated>
  )
}
