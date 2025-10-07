import type { ElementType } from '../types'

const ElementDisplay = ({ element }: { element: ElementType }) => (
  <img src={`images/element/${element}.png`} style={{ width: 40, height: 40 }} />
)

export default ElementDisplay
