import React, { useRef, useState, useEffect } from "react"
import { useOnClickOutside } from "../js/hooks"
import { isArray, throttle } from "lodash"
import {
  TocDiv,
  TocLink,
  Toggle,
  TocLinkStatic,
  Contenedor,
  TocDivLi,
} from "../styles"

export const ReadingProgress = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0)
  const scrollListener = () => {
    if (!target.current) {
      return
    }
    const { top, height } = target.current.getBoundingClientRect()
    // console.log(readingProgress)
    const progress =
      (top / (height - typeof window !== "undefined" && window.innerHeight)) *
      100
    const translateValue = progress < -100 ? 0 : -100 - progress
    // console.log(progress)
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
      totalOffset += el.offsetTop - el.scrollTop + el.clientTop
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

  // Small Devices
  const [open, setOpen] = useState(false)

  const [active, setActive] = useState()

  const ScrollList = () => {
    let nodes = []

    for (let index = 0; index < 6; index++) {
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
    console.log(tNodes)
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
    console.log(finalArray)
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
    console.log(tTitles)

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

    console.log(JSON.stringify(tTitles, null, 2))
    let minDepth = []

    for (let i = 0; i < titles.length; i++) {
      minDepth[i] = []
      for (let i1 = 0; i1 < titles[i].length; i1++) {
        minDepth[i][i1] = [titles[i][i1].depth]
      }
    }

    minDepth = Math.min(...minDepth.flat())

    setHeadings({ tTitles, tNodes, minDepth })
  }, [target])

  useEffect(() => {
    const scrollHandler = throttle(() => {
      const { tTitles, tNodes } = headings

      const offsets = tNodes.map(el => accumulateOffsetTop(el))

      const activeIndex = offsets.findIndex(
        offset => offset > window.scrollY + 0.6 * window.innerHeight
      )

      setActive(activeIndex === -1 ? tTitles.length - 1 : activeIndex - 1)
    }, throttleTime)
    typeof window !== "undefined" &&
      window.addEventListener("scroll", scrollHandler)
    console.log(headings)
    return () =>
      typeof window !== "undefined" &&
      window.removeEventListener("scroll", scrollHandler)
  }, [headings])
  return (
    <div>
      {headings.tTitles &&
        headings.tTitles.map(([[padre], hijos]) => (
          <>
            <div>{padre.title}</div>
            <div>
              {hijos.map(el => (
                <div>{el.title}</div>
              ))}
            </div>
          </>
        ))}
    </div>
  )
}

export const TOCstatic = ({ finalArray }) => {
  return (
    <ol>
      {finalArray[0].map((el, index) => (
        <li>
          <TocLinkStatic>
            Parte {index + 1}
            <p>{el.title}</p>
          </TocLinkStatic>
        </li>
      ))}
    </ol>
  )
}
