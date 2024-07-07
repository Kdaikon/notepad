'use client';

import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line, Text, Group } from 'react-konva';
import { parseInputToItem } from "@/app/ui/logic/StrTo";
import { Item } from './logic/StrToDef';
import Konva from 'konva';
import { FolderPlusIcon, PencilIcon, CursorArrowRaysIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { toolf } from './logic/CanvasDefs';
import React, { Component } from 'react';
import jsPDF from "jspdf"
//const { jsPDF } = require("jspdf");


const DrawingCanvas: React.FC = () => {
  //free write
  const [lines, setLines] = useState<any[]>([]);//not use
  const [isDrawing, setIsDrawing] = useState(false);//not use
  const [activeItem, setActiveItem] = useState('NEW');//テキストエリア表示する要素 NEW or uuidv4
  const [postContent, setPostContent] = useState('');//テキスト入力エリア
  const [items, setItems] = useState<Item[]>([]);//要素管理
  const stageRef = useRef<any>(null);//not use
  const [tool, setTool] = useState<toolf>('arrow');//現在ツール
  const [dragOK, setDragOK] = useState<boolean>(true);

  let xOffset = 10; // 初期のX位置

  // const handleMouseDown = (e: any) => {
  //   setIsDrawing(true);
  //   const stage = e.target.getStage();
  //   const pos = stage.getPointerPosition();
  //   setLines([...lines, { id: lines.length, points: [pos.x, pos.y] }]);
  // };

  // const handleMouseMove = (e: any) => {
  //   if (!isDrawing) return;
  //   const stage = e.target.getStage();
  //   const point = stage.getPointerPosition();
  //   const lastLine = lines[lines.length - 1];
  //   lastLine.points = [...lastLine.points, point.x, point.y];
  //   const newLines = [...lines.slice(0, lines.length - 1), lastLine];
  //   setLines(newLines);
  // };

  // const handleMouseUp = () => {
  //   setIsDrawing(false);
  // };

  useEffect(() => {
    if (activeItem == 'NEW') {
      if (postContent != '') {
        const now = parseInputToItem(postContent, 0, 0);
        setItems([...items, now]);
        setActiveItem(now.id);
      }
    } else {
      //setItems([parseInputToItem(postContent,xs,ys)]);
      setItems(items.map((item) => {
        if (item.id == activeItem) {
          const xs = item.x;
          const ys = item.y;
          const itemprot = parseInputToItem(postContent, xs, ys);
          setActiveItem(itemprot.id);
          return itemprot;
        } else {
          return item;
        }
      }))
    }

  }, [postContent]);

  useEffect(() => {
    switch (tool) {
      case 'arrow':
        setDragOK(true);
        break;
      case 'pen':
        setDragOK(false);
        break;
    }
  }, [tool]);

  function handleClick(text: string) {
    setPostContent(text);
  };

  const clickOnGroup = (e: any) => {
    switch (tool) {
      case 'arrow':
        //console.log(e.target.id())
        setActiveItem(e.target.id());
        for (let i = 0; i < items.length; i++) {
          if (e.target.id() == items[i].id) {
            setPostContent(items[i].originalText);
          }
        }
        break;
    }
  }

  const newElement = (e?: any) => {
    if (activeItem != 'NEW') {
      setActiveItem('NEW');
      setPostContent('');
    }
  }

  const savePdf = (e?: any) => {
    const stage = stageRef.current;
    let pdf = new jsPDF('l', 'px', [stage.width(), stage.height()]);
    pdf.addImage(
      stage.toDataURL({ pixelRatio: 2 }),
      0,
      0,
      stage.width(),
      stage.height()
    );
    pdf.save('canvas.pdf');
  }


  return (
    <div className="grid grid-cols-2">
      <div>
        <textarea id="message" name="message" value={postContent}
          onChange={e => handleClick(e.target.value)} className="mt-1 block w-full h-[calc(100vh-10rem)] px-3 py-2 text-base placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y">
        </textarea>
      </div>

      <div className="p-1">
        <div className="flex-1 ">
          <button className={`hover:bg-gray-300 h-12 w-12 ${tool == 'pen' ? 'bg-gray-500' : 'bg-gray-100'}`} onClick={(e) => { setTool('pen') }}>
            <PencilIcon className="h-12 w-12" />
          </button>
          <button className="bg-gray-100 hover:bg-gray-300 h-12 w-12" onClick={(e) => { newElement(); }}>
            <FolderPlusIcon className="h-12 w-12" />
          </button>
          <button className={`hover:bg-gray-300 h-12 w-12 ${tool == 'arrow' ? 'bg-gray-500' : 'bg-gray-100'}`} onClick={(e) => { setTool('arrow') }}>
            <CursorArrowRaysIcon className="h-12 w-12" />
          </button>
          <button className={`hover:bg-gray-300 h-12 w-12 bg-gray-100`} onClick={savePdf}>
            <ArrowDownTrayIcon className="h-12 w-12" />
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
                    draggable={dragOK}
                    x={item.x}
                    y={item.y}
                    onDragEnd={(e) => {
                      item.x = (e.target.x() > 0) ? e.target.x() : 0;
                      item.y = (e.target.y() > 0) ? e.target.y() : 0;
                      clickOnGroup(e);
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
