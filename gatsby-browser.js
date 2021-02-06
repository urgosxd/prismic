import React from "react"
import { createGlobalStyle,ThemeProvider as ThemeStyled } from "styled-components"
import { theme } from "./src/js/theme"
import { UsuarioProvider } from "./src/js/store"
import { ThemeProvider } from "@material-ui/core"

const Globalstyle = createGlobalStyle`
  html{
    box-sizing: border;
    margin:0;
    padding: 0;
    text-rendering: optimizeLegibility;
    font-family: EB Garamond, sans-serif;
    padding: 0px;
    margin: 0px;
    font: 137.5%/1.45 EB Garamond;
    body{
      font-feature-settings: "kern", "liga", "clig", "calt";
      margin:0px;
    }

  }
  *,
  *::before,
  *::after{
  box-sizing: border-box;
  }
 
`

export const wrapRootElement = ({ element }) => (
    <ThemeStyled theme={theme}>
  <ThemeProvider theme={theme}>
    <Globalstyle />
    <UsuarioProvider>{element}</UsuarioProvider>
  </ThemeProvider>
    </ThemeStyled>
)
