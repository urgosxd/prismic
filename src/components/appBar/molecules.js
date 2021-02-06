import React from "react"
import { Link } from "gatsby"
import { useSpring, animated } from "react-spring"
export const Navs = () => {
  const [{ color }, set] = useSpring(() => ({
    color: "#454963",
  }))
  const nav = ["example1", "example2", "exaple3", "about"]
  return (
    <ul>
      {nav.map(ele => (
        <animated.li
          style={{ color }}
          onMouseEnter={() => set({ color: "#4ecaee" })}
          onMouseLeave={()=>set({color:"#454963"})}
        >
          <Link>{ele}</Link>
        </animated.li>
      ))}
    </ul>
  )
}
