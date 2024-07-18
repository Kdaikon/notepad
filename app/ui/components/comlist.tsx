import React from "react";
import { Group, Text, Rect } from "react-konva";

type ComListProps = {
    comname: string;
    top: number;
    left: number;
    keyd: string;
};

const ComList: React.FC<ComListProps> = ({ comname, top, left, keyd }) => {
    let element;
    switch (comname) {
        case 'r':
            element = <Text key={'tsr' + keyd} text="Text" fontSize={20} fill="#ff0000" x={left + 40} y={top + 7} />;
            break;
        case 't':
            element = <Text key={'tst' + keyd} text="Text" fontSize={30} fill="#000000" x={left + 35} y={top + 2} />;
            break;
        case 'p':
            element = <Text key={'tsp' + keyd} text="Text" fontSize={25} fill="#000000" x={left + 37} y={top + 5} />;
            break;
        case 'd':
            element = <Text key={'tsd' + keyd} text="Text" fontSize={20} fill="#000000" x={left + 40} y={top + 7} textDecoration="underline" />;
            break;
        case 'b':
            element = <Text key={'tsb' + keyd} text="Text" fontSize={20} fill="#000000" x={left + 40} y={top + 7} fontStyle="bold" />;
            break;

        default:
            element = <Text key={'ts' + keyd} text="Text" fontSize={20} fill="#000000" x={left + 40} y={top + 7} />;
            break;
    }
    const addClipboard = (e:any) => {
        if (!navigator.clipboard) {
            alert("このブラウザではコピーできません");
            return;
        }

        navigator.clipboard.writeText('^' + comname);
    };
    return (
        <Group key={'g' + keyd} onClick={addClipboard}>
            <Rect key={'rf' + keyd} x={left} y={top} width={25} height={30} fill="#6b7280" strokeWidth={2} cornerRadius={0} />
            <Rect key={'rs' + keyd} x={left} y={top} width={100} height={30} stroke="#6b7280" strokeWidth={2} cornerRadius={5} />
            <Text key={'tf' + keyd} text={comname} fontSize={20} fill="#f9fafb" x={left + 8} y={top + 5} />
            {element}
        </Group>
    )
}

export default ComList;