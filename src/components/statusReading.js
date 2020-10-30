import React, { useRef, useState, useEffect } from "react"
import { useOnClickOutside } from "../js/hooks"
import { throttle } from "lodash"
import { Accordion } from "react-bootstrap"
import { TocDiv, TocLink, Toggle, TocLinkStatic, Contenedor } from "../styles"

export const ReadingProgress = ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0)
  const scrollListener = () => {
    if (!target.current) {
      return
    }
    const element = target.current
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    if (windowScrollTop === 0) {
      return setReadingProgress(0)
    }
    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100)
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100)
  }
  useEffect(() => {
    window.addEventListener("scroll", scrollListener)
    return () => window.removeEventListener("scroll", scrollListener)
  })

  return <div className="readingBar" style={{ width: `${readingProgress}%` }} />
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
    "section.contenido > h1,section.contenido > h2,section.contenido > h3,section.contenido > h4"

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(selector))
    console.log(nodes)
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
        offset => offset > window.scrollY + 0.8 * window.innerHeight
      )
      setActive(activeIndex === -1 ? titles.length - 1 : activeIndex - 1)
    }, throttleTime)
    window.addEventListener("scroll", scrollHandler)
    return () => window.removeEventListener("scroll", scrollHandler)
  }, [headings])
  return (
    <Contenedor>
      <Toggle onClick={() => setOpen(true)} size="1.6em" />
      <Toggle closer onClick={() => setOpen(false)} />
      <TocDiv ref={ref} open={open}>
        <div>
          {headings.titles.map(({ title, depth }, index) =>
            depth < 2 ? (
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
            ) : (
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
                  {title}
                </TocLink>
              </li>
            )
          )}
        </div>
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

  const selector =
    "section.contenido > h1,section.contenido > h2,section.contenido > h3,section.contenido > h4"
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(selector))
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
      {headings.titles.map(({ title, depth }, index) => (
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
      ))}
      <div></div>
    </ol>
  )
}
