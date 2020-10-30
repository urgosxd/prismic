import styled from "styled-components"

export const LayoutWrapper = styled.div`
  & .readingBar {
    position: sticky;
    height: 5px;
    bottom: 0;
    background-color: #ff0000;
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
  & .introduction .infoPremature .claps img {
    width: 30px;
    height: 30px;
    filter: invert(1);
    margin: 10px;
  }
`
