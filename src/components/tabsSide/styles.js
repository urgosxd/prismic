import styled from "styled-components"

export const TabsSideWrapper = styled.div`
    right:-15px;
    top: 14%;    
    position: fixed;
    z-index: 1000;
   
  & .App {
    user-select: none;
  }
  & .frame {
    height: 600px;
    width: 300px;
    position: relative;
    overflow: hidden;
  }
`
