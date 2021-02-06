import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import { useUsuario } from "../js/store"
import { LAYOUT, POSTCARD } from "../components"
import {NavBar} from "../components/appBar"
import { CustomHits } from "../bridges"
import { MyButton, Introduccion, Skills, Retrato, MyContainer } from "../styles"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, SearchBox } from "react-instantsearch-dom"
import "instantsearch.css/themes/reset.css"
import { Grid, Typography, Container, Paper } from "@material-ui/core"
import { useSpring, animated } from "react-spring"
const Index = ({ data }) => {
  console.log(data)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_ADMIN_KEY
  )
  console.log(searchClient)
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

  return (
    <LAYOUT>
      <NavBar/>
      <MyContainer fixed={false} maxWidth="lg">

        <Grid container spacing={1}>
          <Grid item xs={12} lg={8}>
            <div className="Introduccion">
              <h1>{data.prismicHome.data.nameowner.text}</h1>
              <p>{data.prismicHome.data.description}</p>
            </div>
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
          <Grid item xs={0} lg={4}></Grid>
        </Grid>
        <h2 className="publicaciones">Publicaciones</h2>
        <InstantSearch searchClient={searchClient} indexName="blog">
          <CustomHits />
        </InstantSearch>
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
