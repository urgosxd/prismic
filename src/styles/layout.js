import styled from "styled-components"
import Box from "@material-ui/core/Box"

export const LayoutWrapper = styled.div`
  & .readingBar {
    width: 100%;
    transform: translateX(-100%);
    position: sticky;
    height: 10px;
    top: 0;
    background-color: red;
  }

  & .publicaciones {
    font-family: "Merriweather Sans";
    color: rgb(69, 73, 99);
    font-weight: 200;
    font-size: 1.885rem;
    line-height: 2.465rem;
    margin-top: 75px;
    margin-bottom: 50px;
  }

  & .stick {
    position: sticky;
    top: 25px;
    left: 0;
  }
  
  & .slider {
    width:100%;
    display:flex;
    height:100vh;
    overflow:hidden;
  }

  & .slider .slider-item {
  flex-shrink:0;
  width:100%;
  padding:50px;
  display:flex;
  justify-content:center;
  }

  & .slider .slider-item img{
  width:50%;
  object-fit:cover;
  }
`

