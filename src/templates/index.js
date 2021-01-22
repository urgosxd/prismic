import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import { useUsuario } from "../js/store"
import {
  LAYOUT,
  POSTCARD,
  CustomHits,
  CustomHitsTabs,
  CustomSearch,
} from "../components"
import { MyButton, Introduccion, Skills, Retrato, MyContainer } from "../styles"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox } from "react-instantsearch-dom"
import "instantsearch.css/themes/reset.css"
import { Grid, Typography, Container, Paper } from "@material-ui/core"
import clamp from "lodash-es/clamp"
import { useSpring, animated } from "react-spring"
import { useSpringCarousel } from 'react-spring-carousel-js'
const Index = ({ data }) => {
  console.log(data)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_ADMIN_KEY
  )

  const [valueHits, setValuesHits] = useState(0)

  const handleChange = (event, newValue) => {
    setValuesHits(newValue)
  }

  // const handleDerecha = (number, numberTwo) => {
  //   console.log(number)
  //   console.log(numberTwo)
  //   if (numberTwo > number) {
  //     setValuesHits(valueHits - 1)
  //   } else {
  //     if (numberTwo == number) {
  //       setValuesHits(valueHits)
  //     } else {
  //       setValuesHits(valueHits + 1)
  //     }
  //   }
  // }
  // const handleIzquierda = (number, numberTwo) => {
  //   console.log(number)
  //   console.log(numberTwo)
  //   if (numberTwo < number) {
  //     setValuesHits(valueHits + 1)
  //   } else {
  //     if (numberTwo == number) {
  //       setValuesHits(valueHits)
  //     } else {
  //       setValuesHits(valueHits - 1)
  //     }
  //   }
  // }
  const skills = Object.values(data.prismicHome.data.skills[0])
  const pages = [
    "https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  ]
    
   const newPages = pages.map((el,idx)=>({id:`Caorusel${idx}`,
        renderItem: <div style={{backgroundImage:`url(${el})`,height:"500px",width:"800px",cursor:"grab",userSelect:"none",touchAction:"none"}}></div>
        }))
    const {carouselFragment} = useSpringCarousel({
        items:newPages
    })
//    const tree = 15
//    const [{x},set] = useSpring(()=>({x:[0,0]}))
//
//    const bind = useDrag(({movement:[mx]})=>{
//        let moveX = (mx/ window.innerHeight)*100
//        if(moveX < -tree){
//          moveX= -100  
//        }else if(moveX > tree){
//        moveX=100
//        }
//        set(
//            {
//                x:[moveX,0]
//            }
//        )
//    })
//  const index = useRef(0)
//  const [props, set] = useSprings(pages.length, i => ({
//    x: i * window.innerWidth,
//    sc: 1,
//    display: "block",
//  }))
//  const bind = useGesture(
//    ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
//      if (down && distance > window.innerWidth / 2)
//        cancel(
//          (index.current = clamp(
//            index.current + (xDir > 0 ? -1 : 1),
//            0,
//            pages.length - 1
//          ))
//        )
//      set(i => {
//        if (i < index.current - 1 || i > index.current + 1)
//          return { display: "none" }
//        const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0)
//        const sc = down ? 1 - distance / window.innerWidth / 2 : 1
//        return { x, sc, display: "block" }
//      })
//    }
//  )

  return (
    <LAYOUT>
      <MyContainer fixed={false} maxWidth="lg">
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Introduccion>
              <Typography component="h1">
                {data.prismicHome.data.nameowner.text}
              </Typography>
              <Typography component="p">
                {data.prismicHome.data.description}
              </Typography>
            </Introduccion>
            <Skills>
              <div>
                {skills.map((el, i) => {
                  el =
                    skills.length - 1 === i ? `\xa0 y ${el}` : "\xa0" + `${el},`
                  return <Typography component="span">{el}</Typography>
                })}
              </div>
            </Skills>
          </Grid>
          <Grid item xs={4}>
            <Retrato>
              <img src={data.prismicHome.data.avatar.fluid.src} />
            </Retrato>
          </Grid>
        </Grid>
        <h2 className="publicaciones">Publicaciones</h2>
        {/* <div className="caca">
          <InstantSearch searchClient={searchClient} indexName="blog">
            <Grid container spacing={0}>
              <Grid item xs={9}></Grid>
              <Grid item xs={3}>
                <CustomSearch />
                <CustomHitsTabs idx={valueHits} handle={handleChange} />
              </Grid>
            </Grid>
          </InstantSearch>
        </div> */}
        <Grid container spacing={1}>
          <Grid item xs={8}>
      <div style={{
          padding:"1.6rem",
          borderRadius:"8px"
      }}>
            {carouselFragment}
      </div>
          </Grid>
        </Grid>
      </MyContainer>
    </LAYOUT>
  )
}

export default Index

export const postQuery = graphql`
  query {
    prismicHome(prismicId: { eq: "X_jvGRAAACIAAazg" }) {
      data {
        description
        nameowner {
          text
        }
        skills {
          skill0
          skill1
          skill2
          skill3
        }
        avatar {
          fluid {
            src
          }
        }
      }
    }
  }
`
