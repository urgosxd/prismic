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

  & .Introduccion {
    margin-bottom: 20px;
    & h1 {
      font-family: Merriweather Sans;
      color: rgb(35, 48, 68);

      @media (min-width: ${props => props.theme.points.xs}) {
        font-size: 2.6rem;
      line-height: 3rem;

      }
      @media (min-width: ${props => props.theme.points.lg}) {
        font-size: 3.625rem;
      line-height: 3.48rem;
        
      }
      font-weight: 800;
      margin-top: 3vw;
      max-width: 31.9rem;
    }
    & p {
      font-family: EB Garamond;
      color: rgb(69, 73, 99);
      font-weight: 200;
@media (min-width: ${props => props.theme.points.xs}) {
        font-size:1.3rem;
        line-height:1.5rem;
      }
     @media (min-width: ${props => props.theme.points.lg}) {
      font-size: 2.25rem;
      line-height: 2.465rem;


      } 
      max-width: 37.7rem;
    }
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

  & .App {
    user-select: none;
  }

  & .frame {
    height: 600px;
    width: 300px;
    position: relative;
    overflow: hidden;
  }

  & .Pubg {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: row;
  }
  & .Pubg .derecha {
    top: 100px;
    right: -10px;
    position: fixed;
    z-index: 1000;
  }
  & .Pubg .negro {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
`
