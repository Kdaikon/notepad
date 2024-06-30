'use client';

import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line, Text, Group } from 'react-konva';
import { parseInputToItem } from "@/app/ui/logic/StrTo";
import { Item } from './logic/StrToDef';
import Konva from 'konva';
import { FolderPlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import { toolf } from './logic/CanvasDefs';
import React, { Component } from 'react';

const DrawingCanvas: React.FC = () => {
  //free write
  const [lines, setLines] = useState<any[]>([]);//not use
  const [isDrawing, setIsDrawing] = useState(false);//not use
  const [postContent, setPostContent] = useState('');//テキスト入力エリア
  const [items, setItems] = useState<Item[]>([]);//要素管理
  const stageRef = useRef<any>(null);//not use
  const [tool, setTool] = useState<toolf>('arrow');//現在ツール
  const [activeItem, setActiveItem] = useState<string>('');//テキストエリア表示する要素
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
    let xs = 0;
    let ys = 0;
    if (items[0]) {
      xs = items[0].x;
      ys = items[0].y;
    }
    console.log(xs);
    //console.log(ys);
    setItems([parseInputToItem(postContent,xs,ys)]);
  }, [postContent]);

  function handleClick(text: string) {
    setPostContent(text);
  };

  return (
    <div className="grid grid-cols-2">
      <div>
        <textarea id="message" name="message"
          onChange={e => handleClick(e.target.value)} className="mt-1 block w-full h-[calc(100vh-10rem)] px-3 py-2 text-base placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y">
        </textarea>
      </div>

      <div className="p-1">
        <div className="grid grid-cols-8">
          <button className="bg-cyan-500 hover:bg-cyan-600 h-12 w-12">
            <PencilIcon className="h-12 w-12" />
          </button>
          <button className="bg-cyan-500 hover:bg-cyan-600 h-12 w-12" >
            <FolderPlusIcon className="h-12 w-12" />
          </button>

        </div>
        <div className="border border-gray-300 rounded-md w-full h-[calc(100vh-10rem)]">
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            // onMouseDown={handleMouseDown}
            // onMouseMove={handleMouseMove}
            // onMouseUp={handleMouseUp}
            // onTouchStart={handleMouseDown}
            // onTouchMove={handleMouseMove}
            // onTouchEnd={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              {items.map((item) => {
                const itemElement = (
                  <Group
                    id={item.id}
                    key={item.id}
                    draggable
                    x={item.x}
                    y={item.y}
                    onDragEnd={(e) => {
                      items[0].x = (e.target.x() > 0)? e.target.x() : 0;
                      items[0].y = (e.target.y() > 0)? e.target.y() : 0;
                    }}
                    onDragStart={(e) => {
                      const targetId = e.target.id();
                      for (let i = 0;i < items.length; i++){
                        if (items[i].id == targetId){
                          setActiveItem(targetId);
                        }
                      }
                    }}
                  >
                    {
                      item.sentences.map((sent) => {
                        let length = 0;
                        const sentElement = (
                          sent.terms.map((ter) => {

                            let FONTSIZE = 20;
                            ter.decos.map((deco) => {
                              if (deco.deco == 't') {
                                FONTSIZE = 25;
                              }
                            })


                            const a = new Konva.Text({
                              text: ter.text,
                              fontSize: FONTSIZE
                            });

                            const textElement = (
                              <Text
                                text={ter.text}
                                x={length}
                                y={ter.y}
                                fontSize={FONTSIZE}
                                key={ter.id}
                              />
                            );
                            length += a.getTextWidth();
                            length += 10;
                            return textElement;
                          })
                        )
                        return sentElement;
                      })
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
