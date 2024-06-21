import { FC } from 'react'
import dynamic from 'next/dynamic'

// react-konvaを使用しているコンポーネントはdynamic importを利用する
const DrawingCanvas = dynamic(() => import('@/app/ui/DrawingCanvas'), { ssr: false })

// これだと、エラーになる Error: Must use import to load ES Module...
// import StageComponent from '../components/StageComponent'

const DyDrawingCanvas: FC = () => {
  return (
    <DrawingCanvas />
  )
}

export default DyDrawingCanvas