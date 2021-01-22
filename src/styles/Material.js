import React from "react"
import { Button, Box, Container, ListItemText } from "@material-ui/core"
import { styled } from "@material-ui/styles"

export const ItemCarrousel = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "max-content",
  "& img": {
    height: 500,
    width: "98%",
    margin: 10,
    boxShadow: "3px 3px 5px 6px #ccc",
  },
  "& div": {
    backgroundColor: "#4ECAEE ",
    marginLeft: "7%",
    display: "flex",
    fontFamily: "EB Garamond",
    fontWeight: 700,
    color: "rgb(69, 73, 99)",
    fontSize: ".9rem",
    flexDirection: "column",
    height: 150,
    width: 375,
    marginTop: -150,
    padding: "20px 30px",
    boxShadow: "3px 3px 5px  #ccc",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    "& span:nth-child(1)": {
      width: "60%",
      textTransform: "uppercase",
    },
  },
})

export const Introduccion = styled(Box)({
  "& > *": { marginBottom: 20 },
  "& h1": {
    fontFamily: "Merriweather Sans",
    color: "rgb(35, 48, 68)",
    fontWeight: "800",
    fontSize: "3.625rem",
    lineHeight: "3.48rem",
    marginTop: "3vw",
    maxWidth: "31.9rem",
  },
  "& p": {
    fontFamily: "EB Garamond",
    color: "rgb(69, 73, 99)",
    fontWeight: 200,
    fontSize: "1.885rem",
    lineHeight: "2.465rem",
    maxWidth: "37.7rem",
  },
})

export const Skills = styled(Box)({
  "& div span": {
    fontFamily: "EB Garamond",
    color: "rgb(119, 124, 155)",
  },
})

export const Retrato = styled(Box)({
  "& img": {
    height: 500,
    width: 400,
    boxShadow: "3px 3px 5px 6px #ccc",
    marginLeft: 25,
  },
})

export const Buscador = styled(Box)({})

export const MyContainer = styled(Container)({
  padding: "0 50px",
})

// POST

export const MyContainer2 = styled(Container)({
  padding: "0 0px",
})

export const Frontmatter = styled("div")({
  display: "flex",
  flexDirection: "column",
  "& h1": {
    fontFamily: "Merriweather Sans",
    color: "rgb(35, 48, 68)",
    fontWeight: 500,
    fontSize: "3rem",
    lineHeight: "4rem",
    marginTop: "3vw",
    marginBottom: "3vw",
  },
  "& div": {
    marginTop: "3vw",
    marginBottom: "3vw",
    display: "flex",
    flexWrap: "wrap",
    "& span": {
      border: "1px solid #E0E9F1",
      padding: "0.4rem 0.8rem",
      color: "#777C9B ",
    },
    "& hr": {
      alignSelf: "center",
      border: "none",
      margin: 0,
      backgroundColor: "#E0E9F1",
      height: 1,
      width: "276px",
    },
  },
})

export const Contenido = styled("div")({
  color: "#334259 ",
  fontFamily: "EB Garamond",
  fontWeight: 300,
  lineHeight: "1.8rem",
  fontSize: "1.015rem",
  padding: "0 25px 0 70px",
  "& :nth-child(1):first-letter": {
    textTransform: "capitalize",
    margin: "0.1em 0.1em 0.2em 0",
    fontWeight: "bold",
    float: "left",
    fontSize: "4rem",
    lineHeight: 0.65,
  },

  "& h2": {
    fontWeight: "500",
  },
  "& h3": {
    fontWeight: "300",
  },
  "& img": {
    maxHeight: "350px",
    padding: "10% 0",
    paddingLeft: "18%",
  },
})

export const MyitemListToc = styled(({ active, lastActive, ...other }) => (
  <ListItemText {...other} />
))({
  color: props =>
    props.active === true ? `#199797` : props.lastActive ? "black" : "gray",
})

export const MyButton = styled(({ color, ...other }) => <Button {...other} />)({
  background: props =>
    props.color === "red"
      ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
      : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: props =>
    props.color === "red"
      ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
      : "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  margin: 8,
})
