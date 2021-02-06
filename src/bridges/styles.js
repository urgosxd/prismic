import styled from "styled-components"

export const CustomHitsWrapper = styled.div`
  & .divCarousel {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 600px;
    & div:nth-child(2) {
      background-color: #4ecaee;
      margin-left: 14%;
      display: flex;
      font-family: EB Garamond;
      font-weight: 700px;
      color: rgb(69, 73, 99);
      font-size: 0.9rem;
      flex-direction: column;
      height: 200px;
      width: 375px;
      margin-top: -150px;
      padding: 20px 30px;
      box-shadow: 3px 3px 5px #ccc;
      text-align: center;
      justify-content: space-between;
      align-items: center;
      & .title {
        width: 60%;
        text-transform: uppercase;
      }
    }
  }

  width: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  & .negro {
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
