import React, { useState, useEffect } from "react"
import { TabsSide } from "../components"
import { DivCarrousel_00, Button_00 } from "../components/carousel"
import { useSpring, animated } from "react-spring"
import { CustomHitsWrapper } from "./styles"
import { useSpringCarousel } from "react-spring-carousel-js"
import { connectHits } from "react-instantsearch-dom"
import { ButtonToggle } from "../components/mini/index"

const Hitss = ({ hits }) => {
  //const [valueTab,setValueTab] = useState(0)
  console.log(hits)
  const currentCarousel =
    hits.length !== 0 ?
    hits.map((ele, idx) => ({
      id: `${ele.titulo}${idx}`,
      renderItem: <DivCarrousel_00 ele={ele} />,
    })): null

  const { carouselFragment, slideToItem } = useSpringCarousel({
    draggingSlideTreshold: 350,
    items:
      hits.length !== 0
        ? currentCarousel
        : [
            { id: 0, renderItem: <div>nada</div> },
            { id: 1, renderItem: <div>nadaa</div> },
          ],
  })
  const [searchValue, setSearchValue] = useState(false)

  const { a, c } = useSpring({
    from: { a: 300, b: 100, c: 0 },
    a: searchValue ? 0 : 300,
    c: searchValue ? 1 : 0,
  })

  const html = document.querySelector("body")

  useEffect(() => {
    if (searchValue) {
      html.style.overflow = "hidden"

      html.style.paddingRight = "16px"
    } else {
      html.style.overflow = "visible"

      html.style.paddingRight = "0px"
    }
  }, [searchValue,hits])

  const handleTab = value => {
    slideToItem(value)
    setSearchValue(false)
  }
  return (
    <CustomHitsWrapper>
      {hits ? carouselFragment : <p>ahhh</p>}
      {searchValue && (
        <animated.div
          className="negro"
          style={{ opacity: c.interpolate(c => `${c}`) }}
        />
      )}
      <ButtonToggle handleOnClick={setSearchValue} />
      <TabsSide
        hits={hits}
        style={{ transform: a.interpolate(a => `translateX(${a}px)`) }}
        handleTab={handleTab}
      />
    </CustomHitsWrapper>
  )
}

export const CustomHits = connectHits(Hitss)
