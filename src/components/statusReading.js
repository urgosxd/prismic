import React, { useRef, useState, useEffect } from "react"
import { useOnClickOutside } from "../js/hooks"
import { throttle } from "lodash"
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
    console.log(readingProgress)
    const progress =
      (top / (height - typeof window !== "undefined" && window.innerHeight)) *
      100
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

export const TOCinteractive = ({}) => {
  const accumulateOffsetTop = (el, totalOffset = 0) => {
    while (el) {
      totalOffset += el.offsetTop - el.scrollTop + el.clientTop
      el = el.offsetParent
    }
    return totalOffset
  }

  const throttleTime = 200

  const [headings, setHeadings] = useState({
    titles: [],
    nodes: [],
    minDepth: 0,
  })
  // Small Devices
  const [open, setOpen] = useState(false)

  const [active, setActive] = useState()

  const ref = useRef()

  useOnClickOutside(ref, () => setOpen(false))

  const selector =
    "section.contenido > h1,section.contenido > h2,section.contenido > h3,section.contenido > h4,section.contenido > h5"

  useEffect(() => {
    const nodes = Array.from(
      typeof document !== "undefined" && document.querySelectorAll(selector)
    )

    console.log(nodes[1].tagName)
    const titles = nodes.map(node => ({
      title: node.innerText,
      depth: Number(node.nodeName[1]),
    }))
    console.log(titles)
    const minDepth = Math.min(...titles.map(h => h.depth))
    setHeadings({ titles, nodes, minDepth })
  }, [selector])

  useEffect(() => {
    const scrollHandler = throttle(() => {
      const { titles, nodes } = headings

      const offsets = nodes.map(el => accumulateOffsetTop(el))
      const activeIndex = offsets.findIndex(
        //window ojo
        offset =>
          offset > typeof window !== "undefined" &&
          typeof window !== "undefined" &&
          window.scrollY + 0.6 * typeof window !== "undefined" &&
          window.innerHeight
      )
      setActive(activeIndex === -1 ? titles.length - 1 : activeIndex - 1)
    }, throttleTime)
    typeof window !== "undefined" &&
      window.addEventListener("scroll", scrollHandler)
    return () =>
      typeof window !== "undefined" &&
      window.removeEventListener("scroll", scrollHandler)
  }, [headings])
  return (
    <Contenedor>
      <Toggle onClick={() => setOpen(true)} size="1.6em" />
      <Toggle closer onClick={() => setOpen(false)} />
      <TocDiv ref={ref} open={open}>
        {headings.titles.map(({ title, depth }, index) => (
          <li>
            <TocLink
              key={title}
              active={active === index}
              depth={depth - headings.minDepth}
              onClick={event => {
                event.preventDefault()
                setOpen(false)
                headings.nodes[index].scrollIntoView({
                  behavior: `smooth`,
                  block: `center`,
                })
              }}
            >
              {index + 1}.{title}
            </TocLink>
          </li>
        ))}
      </TocDiv>
    </Contenedor>
  )
}

export const TOCstatic = ({}) => {
  const [headings, setHeadings] = useState({
    titles: [],
    nodes: [],
    minDepth: 0,
  })

  const selector = "section.contenido > h1,section.contenido > h2"
  useEffect(() => {
    const nodes = Array.from(
      typeof document !== "undefined" && document.querySelectorAll(selector)
    )
    console.log(nodes)
    const titles = nodes.map(node => ({
      title: node.innerText,
      depth: Number(node.nodeName[1]),
    }))
    console.log(titles)
    const minDepth = Math.min(...titles.map(h => h.depth))
    setHeadings({ titles, nodes, minDepth })
  }, [selector])

  return (
    <ol className="paperIndice">
      {headings.minDepth === 1
        ? headings.titles.map(
            ({ title, depth }, index) =>
              depth === 1 && (
                <li>
                  <TocLinkStatic
                    key={title}
                    depth={depth - headings.minDepth}
                    onClick={event => {
                      event.preventDefault()
                      headings.nodes[index].scrollIntoView({
                        behavior: `smooth`,
                        block: `center`,
                      })
                    }}
                  >
                    Parte {index + 1}
                    <p>{title}</p>
                  </TocLinkStatic>
                </li>
              )
          )
        : headings.titles.map(
            ({ title, depth }, index) =>
              depth === 2 && (
                <li>
                  <TocLinkStatic
                    key={title}
                    depth={depth - headings.minDepth}
                    onClick={event => {
                      event.preventDefault()
                      headings.nodes[index].scrollIntoView({
                        behavior: `smooth`,
                        block: `center`,
                      })
                    }}
                  >
                    Parte {index + 1}
                    <p>{title}</p>
                  </TocLinkStatic>
                </li>
              )
          )}
      <div></div>
    </ol>
  )
}
