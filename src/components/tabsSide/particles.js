import React from "react"
import { Tabs_00 } from "./molecules"
import { connectSearchBox } from "react-instantsearch-dom"
import { useGesture } from "react-use-gesture"
import useMeasure from "react-use-measure"
import { useSpring } from "react-spring"


export const GestureTabs_00 = ({ handleTab, hits }) => {
  const [outerRef, bounds] = useMeasure()
  const [contentRef, contentBounds] = useMeasure()
  const [{ y }, set] = useSpring(() => ({ y: 0 }))
  const scrollLimit = Math.max(0, contentBounds.height - bounds.height)
  const hasDragged = React.useRef(false)
  const bind = useGesture(
    {
      onDrag: ({ first, last, movement: [, y] }) => {
        if (first) hasDragged.current = true
        if (last) setTimeout(() => (hasDragged.current = false), 0)
        set({ y })
      },
      onClickCapture: event => {
        if (hasDragged.current) {
          event.stopPropagation()
        }
      },
    },
    {
      drag: {
        bounds: { top: -scrollLimit, bottom: 0 },
        axis: "y",
        rubberband: true,
        initial: () => [0, y.get()],
        filterTaps: true, // <-- this is important as useDrag won't fire for simple clicks
      },
    }
  )

  return (
    <React.Fragment>
      <div className="App">
        <div className="frame" ref={outerRef}>
          <Tabs_00
            bind={bind}
            y={y}
            contentRef={contentRef}
            handleTab={handleTab}
            hits={hits}
          />
        </div>
      </div>
    </React.Fragment>
  )
}
