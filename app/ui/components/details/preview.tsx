import React from "react";
import { Group, Text, Rect ,Stage , Layer} from "react-konva";

type PreviewProps = {
    prename: string;
};

const Preview: React.FC<PreviewProps> = ({ prename }) => {
    let element;
    switch (prename) {
        case 'r':
            element = <Text text="Text" fontSize={20} fill="#000000" x={0} y={0} />;
            break;
        default:
            element = <Text text="Text" fontSize={20} fill="#000000" x={0} y={0} />;
            break;
    }
    const addClipboard = (e: any) => {
        if (!navigator.clipboard) {
            alert("このブラウザではコピーできません");
            return;
        }

        navigator.clipboard.writeText('^');
    };
    return (
        <div className="w-96 grid grid-cols-2">
            <Stage width={100} height={30} >
                <Layer>
                    {element}
                </Layer>
            </Stage>
        </div>
    )
}

export default Preview;