import { FC } from 'react'
import dynamic from 'next/dynamic'

// react-konvaを使用しているコンポーネントはdynamic importを利用する
const StageComponent = dynamic(() => import('@/app/ui/canvas/stagecomponent'), { ssr: false })

// これだと、エラーになる Error: Must use import to load ES Module...
// import StageComponent from '../components/StageComponent'

const CanvasPage: FC = () => {
  return (
    <StageComponent />
  )
}

export default CanvasPage