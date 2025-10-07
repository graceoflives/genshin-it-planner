import type { ElementType } from '../types'

const ElementDisplay = ({ element }: { element: ElementType }) => (
  <img src={`src/assets/images/element/${element}.png`} style={{ width: 40, height: 40 }} />
)

export default ElementDisplay
