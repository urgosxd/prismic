import styled, { css } from "styled-components"

export const TocDiv = styled.ol`
  padding: calc(5vh + 20px) 2vw 5vh;
  position: sticky;
  top: 0;
  left: 0;
  margin: 0;
  height: max-content;
  font-size: 1.25rem;
  line-height: 150%;

  z-index: 3;
  line-height: 2.2em;
  & li {
    list-style: none;
    margin-bottom: 1rem;
  }
  ${props => props.theme.devices.phone} {
    bottom: 1em;
    left: 1em;
    opacity: ${props => (props.open ? 1 : 0)};
    transition: 0.3s;
  }
`

export const TocLink = styled.a`
  cursor: pointer;
  color: ${props => (props.active ? `#194FAF!important` : `gray!important`)};
  font-weight: ${props => props.active && `bold`};
  display: block;
  margin-left: ${props => props.depth + `em`};
`

export const Toggle = styled.button.attrs(props => ({
  size: props.size || `1.6em`,
}))`
  ${props => props.theme.devices.desktop} {
    display: none;
  }
  ${props => props.theme.devices.phone} {
    display: block;
  }
`

export const Contenedor = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
`
