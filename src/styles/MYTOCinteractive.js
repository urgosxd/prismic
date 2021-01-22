import styled, { css } from "styled-components"
import { Tab } from "@material-ui/core"
export const TocDiv = styled.ol`
  padding: 50px;
  position: sticky;
  top: 0;
  left: 0;
  margin: 0;
  height: max-content;
  font-size: 1.25rem;
  line-height: 150%;
  & li {
    list-style: none;
  }
  z-index: 3;
  line-height: 2.2em;

  ${props => props.theme.devices.phone} {
    bottom: 1em;
    left: 1em;
    opacity: ${props => (props.open ? 1 : 0)};
    transition: 0.3s;
  }
  border: 0.5px solid gray;
`

export const TocLink = styled.div`
  cursor: pointer;
  padding: 15px;
  border: 0.5px solid gray;
  color: ${props =>
    props.active
      ? `#194FAF!important`
      : props.lastActive
      ? "black!important"
      : "gray!important"};
  font-weight: ${props => props.active && `bold`};
  display: block;
  margin-top: 0;
  margin-bottom: 0;
  margin-left: ${props => props.depth + `em`};
  & .arrow {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
  }
`
export const MiniLink = styled(TocLink)`
  color: ${props =>
    props.active
      ? `#199797!important`
      : props.lastActive
      ? "black!important"
      : "gray!important"};
  border: 0.5px solid gray;
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
export const Especialcss = styled.div`
  display: none;
`
