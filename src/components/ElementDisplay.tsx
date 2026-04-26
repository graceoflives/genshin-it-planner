import type { ElementType } from '../types'

const ElementDisplay = ({
  element,
  width = 40,
  height = 40
}: {
  element: ElementType
  width?: number
  height?: number
}) => <img src={`images/element/${element}.png`} style={{ width, height }} />

export default ElementDisplay
