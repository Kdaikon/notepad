import React from "react";
import { Stage, Layer, Text ,Rect} from "react-konva";
import ComList from "./comlist";

type ComListCombinedProps = {
    x: number;
    y: number;
};
const ComListCombined: React.FC<ComListCombinedProps> = ({ x, y }) => {
    const n = Math.floor((x - 3) / 110);
    const hei = Math.floor(6 / n) * 38 + 58 + 40;
    const listmap = [
        ' ','r','t','p','d','b'
    ];
    return (
        <div className="flex-initial ">
            <Stage width={x} height={hei} >
                <Layer>
                    <Text key="title" text="コマンドリスト" x={3} y={10} fontSize={25} width={x} fill="#6b7280" textDecoration="underline"/>
                    <Text key="sub"  text="click to copy" x={(x>300)?190:3} y={(x>300)?20:42} fontSize={15} width={x} fill="#6b7280"/>
                    {listmap.map((listname,i)=>(
                        <ComList key={'com'+String(i)} comname={listname} top={Math.floor(i / n) * 38 + 58} left={110 * (i % n) + 3} keyd={String(i)}/>
                    ))}
                </Layer>
            </Stage>

        </div>
    )
}

export default ComListCombined;