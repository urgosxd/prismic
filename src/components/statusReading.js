import React, { useRef, useState, useEffect } from "react"
import { useOnClickOutside } from "../js/hooks"
import { throttle } from "lodash"
import { animated } from "react-spring"
import { TocLinkStatic, MyitemListToc } from "../styles"
import { makeStyles } from "@material-ui/styles"
import { TocminiLink, Especial } from "../components"
import {
  Button,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  Collapse,
} from "@material-ui/core"

import { ExpandLess, ExpandMore } from "@material-ui/icons"

export const ReadingProgress = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0)

  const scrollListener = () => {
    if (!target.current) {
      return
    }
    const { top, height } = target.current.getBoundingClientRect()
    // console.log(readingProgress)

    const progress = (top / (height - 700)) * 100
    const translateValue = progress < -100 ? 0 : -100 - progress
    console.log(progress)
    setReadingProgress(
      translateValue < -100 ? -100 : top > 0 ? 0 : translateValue
    )
  }
  useEffect(() => {
    typeof window !== "undefined" &&
      window.addEventListener("scroll", scrollListener)
    return () =>
      typeof window !== "undefined" &&
      window.removeEventListener("scroll", scrollListener)
  })

  return (
    <div
      className="readingBar"
      style={{ transform: `translateX(${readingProgress}%)` }}
    />
  )
}

export const TOCinteractive = ({ finalArray, target }) => {
  const matching = (arr1, arr2) => {
    for (let i in arr1[0]) {
      for (let i1 in arr2[0]) {
        if (arr1[0][i].title === arr2[0][i1].title && i === i1) {
          arr2[0][i].index = arr1[0][i1].index
        }
      }
    }

    for (let i in arr1[1]) {
      for (let i1 in arr2[1]) {
        if (arr1[1][i].title === arr2[1][i1].title && i === i1) {
          arr2[1][i].index = arr1[1][i1].index
        }
      }
    }
  }

  const accumulateOffsetTop = (el, totalOffset = 0) => {
    while (el) {
      totalOffset += el.offsetTop + 400
      el = el.offsetParent
    }
    return totalOffset
  }

  const throttleTime = 200

  const [headings, setHeadings] = useState({
    tTitles: [],
    tNodes: [],
    minDepth: 0,
  })

  const [pos, setPos] = useState(0)
  // Small Devices
  const [open, setOpen] = useState(true)

  const [active, setActive] = useState(0)

  let sw = {}

  for (let i in finalArray[0]) {
    sw[finalArray[0][i].title] = false
  }

  const [activeEsp, setActiveEsp] = useState(sw)

  const ref = useRef()

  useOnClickOutside(ref, () => setOpen(false))

  const ScrollList = () => {
    let nodes = []

    for (let index = 0; index < finalArray.flat().length; index++) {
      const ArrayCollect = [...target.current.children]

      nodes.push(
        ArrayCollect.filter(
          el => el.nodeName.substring(0, 2) === `H${index + 2}`
        )
      )
    }
    return nodes
  }

  useEffect(() => {
    // title: node.innerText,
    //       depth: Number(node.nodeName[1]),
    const nodes = ScrollList()

    let tNodes = nodes.flat()
    let titles = []

    for (let i = 0; i < nodes.length - 1; i++) {
      titles[i] = []
      for (let i1 = 0; i1 < nodes[i].length; i1++) {
        titles[i][i1] = {}
        titles[i][i1].title = nodes[i][i1].innerText
        titles[i][i1].depth = Number(nodes[i][i1].nodeName[1])
      }
    }

    matching(finalArray, titles)
    let tTitles = titles.flat()
    tTitles = tTitles.sort((ele0, ele1) => {
      if (ele0.index > ele1.index) {
        return 1
      }
      if (ele0.index < ele1.index) {
        return -1
      }
      return 0
    })

    let caca = []

    let sum = -1
    for (let i in tTitles) {
      if (tTitles[i].depth === 2) {
        caca.push([[tTitles[i]], []])
        sum = sum + 1
      } else {
        caca[sum][1].push(tTitles[i])
      }
    }
    tTitles = caca

    // console.log(JSON.stringify(tTitles, null, 2))
    let minDepth = []

    for (let i = 0; i < titles.length; i++) {
      minDepth[i] = []
      for (let i1 = 0; i1 < titles[i].length; i1++) {
        minDepth[i][i1] = [titles[i][i1].depth]
      }
    }

    const Listener = () => {
      if (!target.current) {
        return
      }
      const { top, height } = target.current.getBoundingClientRect()

      setPos(Math.trunc(top))
    }

    typeof window !== "undefined" && window.addEventListener("scroll", Listener)
    minDepth = Math.min(...minDepth.flat())

    setHeadings({ tTitles, tNodes, minDepth })
  }, [target])

  useEffect(() => {
    const scrollHandler = throttle(() => {
      const { tTitles, tNodes } = headings
      let offsets = tNodes.map(el => accumulateOffsetTop(el))
      offsets = offsets.sort()

      const activeIndex = offsets.findIndex(offset => offset > pos * -1 * 2.5)

      setActive(activeIndex === -1 ? offsets.length : activeIndex)
    }, throttleTime)
    typeof window !== "undefined" &&
      window.addEventListener("scroll", scrollHandler)

    return () =>
      typeof window !== "undefined" &&
      window.removeEventListener("scroll", scrollHandler)
  }, [headings, pos])

  const classes = useStyles()
  return (
    <List
      ref={ref}
      className={classes.root}
      subheader={
        <ListSubheader className={classes.toc}>
          Tabla de Contenidos
        </ListSubheader>
      }
    >
      {headings.tTitles &&
        headings.tTitles.map(([[padre], hijos], index) =>
          hijos ? (
            <React.Fragment>
              <ListItem
                button
                key={padre.title}
                onClick={event => {
                  event.preventDefault()
                  setActiveEsp(prevState => ({
                    ...prevState,
                    [padre.title]: !activeEsp[padre.title],
                  }))
                }}
              >
                <MyitemListToc
                  primary={padre.title}
                  key={padre.title}
                  lastActive={padre.index < active}
                  active={
                    active === padre.index ||
                    (active === padre.index + 1 &&
                      active === headings.tNodes.length)
                  }
                />
                {activeEsp[padre.title] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse
                in={activeEsp[padre.title] === false ? false : true}
                timeout="auto"
              >
                <List component="div" disablePadding>
                  {hijos.map(el => (
                    <ListItem
                      key={el.title + String(el.index)}
                      className={classes.nested}
                    >
                      <TocminiLink
                        key={el.title + String(el.index)}
                        palabras={el.title}
                        lastActive={el.index < active}
                        active={active === el.index ? true : false}
                        bridgeHook={setActiveEsp}
                        parent={padre}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItem>
              <ListItemText primary={padre.title} />
            </ListItem>
          )
        )}
    </List>
  )
}

export const TOCstatic = ({ finalArray }) => {
  return (
    <ol>
      {finalArray[0].map((el, index) => (
        <li key={index}>
          <TocLinkStatic>
            Parte {index + 1}
            <p>{el.title}</p>
          </TocLinkStatic>
        </li>
      ))}
    </ol>
  )
}

const useStyles = makeStyles(theme => ({
  root: {},
  nested: {
    paddingLeft: 27,
  },
  toc: {
    paddingLeft: 5,
    paddingTop: 10,
  },
}))
// {headings.tTitles &&
//   headings.tTitles.map(([[padre], hijos], index) => (
//     <ListItem button></ListItem> key={index}>
//       <TocLink
//         key={padre.title}
//         lastActive={padre.index < active}
//         active={
//           active === padre.index ||
//           (active === padre.index + 1 &&
//             active === headings.tNodes.length)
//         }
//       >
//         <div>
//           <span
//             onClick={event => {
//               event.preventDefault()
//               headings.tNodes[padre.index].scrollIntoView({
//                 behavior: `smooth`,
//                 block: `center`,
//               })
//             }}
//           >
//             {padre.title}
//           </span>

//           <i
//             onClick={event => {
//               event.preventDefault()
//               setActiveEsp(prevState => ({
//                 ...prevState,
//                 [padre.title]: !activeEsp[padre.title],
//               }))
//             }}
//             className="arrow"
//           ></i>
//         </div>

//         <Especial
//           switcher={activeEsp[padre.title] === false ? false : true}
//         >
//           {hijos.map(el => {
//             return (
//               <TocminiLink
//                 key={el.title + String(el.index)}
//                 lastActive={el.index < active}
//                 active={active === el.index ? true : false}
//                 bridgeHook={setActiveEsp}
//                 parent={padre}
//               >
//                 {el.title}
//               </TocminiLink>
//             )
//           })}
//         </Especial>
//       </TocLink>
//     </li>
//   ))}
