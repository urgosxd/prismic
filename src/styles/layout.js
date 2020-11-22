import styled from "styled-components"

export const LayoutWrapper = styled.div`
  & .readingBar {
    width: 100%;
    transform: translateX(-100%);
    position: sticky;
    height: 10px;
    bottom: 0;
    background-color: #1d76d2;
  }

  ${props => props.theme.devices.phone} {
    & .readingBar {
      position: sticky;
      height: 5px;
      bottom: 0;
      background-color: blue;
    }
  }

  & section {
    width: 100%;
    padding-top: 3%;
  }

  // Seccion Introduccion
  & .introduction {
    background-position: center;
    background-repeat: no-repeat;
    padding: 50px;
  }

  & .introduction h1 {
    color: #fff;
    font-size: 72px;
    font-weight: 700;
    line-height: 93px;
  }
  & .introduction .description {
    color: #fff;
    font-size: 1.24rem;
    font-weight: 400;
    line-height: 32px;
  }

  & .introduction .paperIndice {
    background: white;
    box-shadow: 0 44px 92px rgba(0, 0, 0, 0.18);
    font-size: 1.24rem;
    line-height: 24px;
    font-weight: 400;
    padding: 40px;
    border-radius: 0.5rem;
  }
  & .introduction .paperIndice li {
    list-style: none;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 40px;
  }

  & .introduction .paperIndice li a {
    font-weight: 700;
    display: block;
    color: #2b86d6;
  }
  & .introduction .paperIndice li a p {
    color: black;
    font-weight: normal;
  }

  & .introduction .infoPremature {
    color: #fff;
    font-size: 1.5rem;
  }
  & .introduction .infoPremature span {
    margin-right: 20px;
    font-size: 1.25rem;
  }
  & .introduction .infoPremature .claps img {
    width: 30px;
    height: 30px;
    filter: invert(1);
    margin: 10px;
  }
  & .introduction .hashtags {
    display: flex;
    flex-direction: row;
  }
  & .introduction .hashtags li {
    list-style: none;
    color: #fff;
    margin-right: 20px;
  }
  & .introduction .avatar {
    color: #fff;
  }
  & .introduction .avatar span {
    margin: 0 12px;
    font-weight: 700;
    cursor: pointer;
  }

  & .introduction .toast {
    margin-top: 25vh;
    background-color: #fff;
    padding: 15px;
    border-radius: 20px;
    transition: 0.5s;
  }
  & .introduction .toast .toast-header button {
    display: none;
  }
  & .introduction .toast .toast-body {
    font-style: italic;
  }
  & .introduction .toast img {
    border-radius: 50%;
    height: 100px;
    margin-right: 20px;
  }

  & .paper .contenido {
    text-rendering: optimizeLegibility;
  }
  & .paper .ccc {
    padding: 0;
  }
  & .paper .contenido img {
    position: relative;
    max-height: 700px;
    max-width: 750px;
  }
  & .paper .contenido h1 {
    font-weight: 700;
    font-size: 72px;
    margin: 0.5em 0 0.4em;
    line-height: 1.25em;
  }
  & .paper .contenido h2,
  h3,
  h4 {
    font-size: 32px;
    margin: 0.5em 0 0.4em;
    line-height: 1.25em;
    font-weight: 600;
  }
  & .paper .claps span {
    font-weight: 700;
    font-size: 0.8rem;
  }
  & .paper .claps {
    margin-top: 20px;
  }
  & .paper .claps img {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin: 15px;
  }
  & .discutir {
    padding-top: 50px;
    width: 800px;
    margin: 0 auto;
  }
`
