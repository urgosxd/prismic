import React, { useEffect, useRef, useState } from "react"
import { MiniLink, Especialcss, MyitemListToc } from "../styles"

export const TocminiLink = ({
  palabras,
  active,
  lastActive,
  parent,
  bridgeHook,
}) => {
  console.log(active)
  useEffect(() => {
    if (active) {
      bridgeHook(prevState => ({
        ...prevState,
        [parent.title]: true,
      }))
    }
    return () =>
      bridgeHook(prevState => ({
        ...prevState,
        [parent.title]: false,
      }))
  }, [active])

  return (
    <MyitemListToc primary={palabras} active={active} lastActive={lastActive} />
  )
}

// export const Especial = ({ switcher, children }) => {
//   let dom = useRef(null)

//   const abrir = () => {
//     TweenMax.to(dom, 1.2, {
//       display: "inline",
//       visibility: "visible",
//       ease: Power3.easeOut,
//     })
//   }

//   const cerrar = () => {
//     TweenMax.to(dom, 1.2, { display: "none", ease: Power3.easeOut })
//   }

//   useEffect(() => {
//     if (switcher) {
//       abrir()
//     } else {
//       cerrar()
//     }
//   }, [switcher])

//   return <Especialcss ref={el => (dom = el)}>{children}</Especialcss>
// }
