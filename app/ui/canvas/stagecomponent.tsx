import { FC } from 'react'
import { Stage, Layer, Circle } from 'react-konva'

const StageComponent: FC = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Circle x={100} y={100} radius={50} fill="green" />
      </Layer>
    </Stage>
  )
}

export default StageComponent