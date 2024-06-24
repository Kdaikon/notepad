'use client';

import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line, Text, Group } from 'react-konva';
import { parseInputToItem } from "@/app/ui/logic/StrTo";
import { Item } from './logic/StrToDef';


const DrawingCanvas: React.FC = () => {
  //free write
  const [lines, setLines] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const stageRef = useRef<any>(null);
  let xOffset = 10; // 初期のX位置

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    setLines([...lines, { id: lines.length, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = [...lastLine.points, point.x, point.y];
    const newLines = [...lines.slice(0, lines.length - 1), lastLine];
    setLines(newLines);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    setItems([parseInputToItem(postContent)]);
    //console.log(parseInputToItem(postContent));
  }, [postContent]);

  function handleClick(text: string) {
    setPostContent(text);
  }

  return (
    <div className="grid grid-cols-2">
      <div>
        <textarea id="message" name="message"
          onChange={e => handleClick(e.target.value)} className="mt-1 block w-full h-[calc(100vh-10rem)] px-3 py-2 text-base placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y">
        </textarea>
      </div>

      <div className="p-1">
        <div className="border border-gray-300 rounded-md w-full h-[calc(100vh-10rem)]">
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              <Text
                text='Try to drag a \n star'
                fontSize={20}
                x={10}
                y={50}
              />
              {items.map((item) => {
                const itemElement = (
                  <Group
                    id={item.id}
                    key={item.id}
                  >{
                      item.sentences.map((sent) => (
                        sent.terms.map((ter) => {
                          const textElement = (
                            <Text
                              text={ter.text}
                              x={ter.x}
                              y={ter.y}
                              fontSize={20}
                              key={ter.id}
                            />
                          );
                          return textElement;
                        })
                      ))
                    }
                  </Group>
                )
                return itemElement;
              })}
              {lines.map((line) => (
                <Line
                  key={line.id}
                  points={line.points}
                  stroke="black"
                  strokeWidth={2}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation="source-over"
                />
              ))}
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
