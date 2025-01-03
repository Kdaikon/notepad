'use client';
import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line, Text, Group } from 'react-konva';
import { parseInputToItem } from "@/app/ui/canvas/logic/StrTo";
import { Item } from './logic/StrToDef';
import Konva from 'konva';
import { toolf } from './logic/CanvasDefs';
import React, { Component } from 'react';
import jsPDF from "jspdf"
import ToolIcon from './components/ToolIcon';
import Shelf from './components/shelf';
import { saveData, getData } from './logic/LocalStrage';
import ComListCombined from './components/comlistcombined';
import { resolve } from 'path';
//const { jsPDF } = require("jspdf");

const DrawingCanvas: React.FC = () => {
  //free write
  const [lines, setLines] = useState<any[]>([]);//not use
  const [isDrawing, setIsDrawing] = useState(false);//not use
  const [activeItem, setActiveItem] = useState('NEW');//テキストエリア表示する要素 NEW or uuidv4
  const [postContent, setPostContent] = useState('');//テキスト入力エリア
  const [items, setItems] = useState<Item[]>([]);//要素管理
  const stageRef = useRef<any>(null);//メインキャンバスのパス
  const [tool, setTool] = useState<toolf>('arrow');//現在ツール
  const [dragOK, setDragOK] = useState<boolean>(true);//ドラッグできるかどうか
  const [writeOK, setWriteOK] = useState<boolean>(false);//ペンを使うかどうか

  //cancvas用
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState<number>(0);
  const [stageHeight, setStageHeight] = useState<number>(0);
  useEffect(() => {
    const updateStageWidth = () => {
      if (containerRef.current) {
        setStageWidth(containerRef.current.offsetWidth);
        setStageHeight(containerRef.current.offsetHeight);
      }
    };
    // 初期の幅を設定
    updateStageWidth();
    // ウィンドウのリサイズに対応
    window.addEventListener('resize', updateStageWidth);
    // クリーンアップ
    return () => {
      window.removeEventListener('resize', updateStageWidth);
    };
  }, []);
  //ここまで

  let xOffset = 10; // 初期のX位置
  const key = "itemdata";
  const linekey = "linedata";

  const handleMouseDown = (e: any) => {
    if (!writeOK) return;
    setIsDrawing(true);
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    setLines([...lines, { id: lines.length, points: [pos.x, pos.y], tool: tool }]);
  };

  const handleMouseMove = (e: any) => {
    if (!writeOK) return;
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];
    lastLine.points = [...lastLine.points, point.x, point.y];
    const newLines = [...lines.slice(0, lines.length - 1), lastLine];
    setLines(newLines);
  };

  const handleMouseUp = () => {
    if (!writeOK) return;
    setIsDrawing(false);
  };


  useEffect(() => {
    const savedData = getData(key);
    const savedLine = getData(linekey);
    //console.log("got item");
    //console.log(savedData);
    if (savedData) {
      //console.log("ok");
      setItems(savedData);
    }
    if (savedLine) {
      setLines(savedLine);
    }
  }, []);

  useEffect(() => {
    //console.log("useeffect2 called");
    if (activeItem == 'NEW') {
      if (postContent != '') {
        const now = parseInputToItem(postContent, 0, 0);
        setItems([...items, now]);
        setActiveItem(now.id);
        saveData(key, items);
      }
    } else {
      //setItems([parseInputToItem(postContent,xs,ys)]);
      // console.log(postContent);
    const itemstmp = items.map((item) => {
      if (item.id == activeItem) {
        const xs = item.x;
        const ys = item.y;
        const itemprot = parseInputToItem(postContent, xs, ys);
        setActiveItem(itemprot.id);
        return itemprot;
      } else {
        return item;
      }
    });
    setItems(itemstmp);
    saveData(key, itemstmp);
    }
  }, [postContent]);

  

  useEffect(() => {
    if (lines.length) {
      saveData(linekey, lines);
    }
  }, [lines])

  useEffect(() => {
    switch (tool) {
      case 'arrow':
        setDragOK(true);
        setWriteOK(false);
        break;
      case 'pen':
        setDragOK(false);
        setWriteOK(true);
        break;
      case 'eraser':
        setDragOK(false);
        setWriteOK(false);
        break;
      case 'peneraser':
        setDragOK(false);
        setWriteOK(true);
        break;
    }
  }, [tool]);

  function handleClick(e: any) {
    setPostContent(e.target.value);
  };

  const clickOnGroup = (target: any) => {
    switch (tool) {
      case 'arrow':
        //console.log(e.target.id())
        setActiveItem(target.id());
        for (let i = 0; i < items.length; i++) {
          if (target.id() == items[i].id) {
            setPostContent(items[i].originalText);
          }
        }
        break;
      case 'eraser':
        let deleti = -1;
        for (let i = 0; i < items.length; i++) {
          if (target.id() == items[i].id) {
            deleti = i;
          }
        }
        if (deleti > 0) {
          setItems(items.slice(0, deleti).concat(items.slice(deleti + 1)));
          setActiveItem(items[0].id);
          setPostContent(items[0].originalText);
        }
        if (deleti == 0) {
          setItems([]);
          setActiveItem('NEW');
          setPostContent('');
        }
        break;
    }
  }

  const newElement = (e?: any) => {
    if (activeItem != 'NEW') {
      setActiveItem('NEW');
      setPostContent('');
      setTool('arrow');
    }
  }

  const allVanish = (e?: any) => {
    setItems([]);
    setLines([]);
    setActiveItem('NEW');
    setPostContent('');
    setTool('arrow');
    saveData(linekey,[]);
    saveData(key, []);
  }

  const savePdf = (e?: any) => {
    const stage = stageRef.current;
    let pdf = new jsPDF({
      unit: 'px',
      format: [stage.width(), stage.height()],
      compress: true,
    });
    pdf.addImage(
      stage.toDataURL({ pixelRatio: 2 }),
      'PNG',
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
        <textarea title='message' id="message" name="message" value={postContent}
          onChange={e => handleClick(e)}
          className={`mt-1 block w-full h-[calc(100vh-20rem)] 
            ${'h-[calc(100vh-' + String(Math.floor(6 / Math.floor((stageWidth - 3) / 110)) * 38 + 58 + 40) +  '}]'} 
          px-3 py-2 text-base placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none 
          focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y`}>
        </textarea>
        <ComListCombined x={stageWidth} y={250} />
      </div>

      <div className="p-1">
        <div className="flex-initial ">
          <ToolIcon iconName='plus' onClick={(e) => { newElement() }} onUse={false} />
          {/* <Shelf barName='del' height={12} /> */}
          <ToolIcon iconName='pen' onClick={(e) => { setTool('pen') }} onUse={tool == 'pen'} />
          <ToolIcon iconName='arrow' onClick={(e) => { setTool('arrow') }} onUse={tool == 'arrow'} />
          <ToolIcon iconName='eraser' onClick={(e) => { setTool('eraser') }} onUse={tool == 'eraser'} />
          <ToolIcon iconName='peneraser' onClick={(e) => { setTool('peneraser') }} onUse={tool == 'peneraser'} />
          <ToolIcon iconName='download' onClick={savePdf} onUse={false} />
          <ToolIcon iconName='vanish' onClick={allVanish} onUse={false} />
        </div>
        <div ref={containerRef} className="border border-gray-300 rounded-md w-full h-[calc(100vh-10rem)] bg-white">
          <Stage
            width={stageWidth}
            height={stageHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            ref={stageRef}
          >
            <Layer>
              {lines.map((line) => (
                <Line
                  key={line.id}
                  points={line.points}
                  stroke="black"
                  strokeWidth={line.tool === 'peneraser' ? 30 : 2}
                  tension={0.5}
                  lineCap="round"
                  globalCompositeOperation={
                    line.tool === 'peneraser' ? 'destination-out' : 'source-over'
                  }
                />
              ))}
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
                      clickOnGroup(e.target);
                      saveData(key, items);
                    }}
                    onClick={(e) => {
                      clickOnGroup(e.target.parent);
                    }}
                    onTap={(e) => { clickOnGroup(e.target.parent); }}
                  >
                    {
                      item.sentences.map((sent) => {
                        let length = 5;
                        const sentElement = (
                          sent.terms.map((ter) => {

                            let FONTSIZE = 20;
                            let FILL = '#000000';
                            let TEXTDECORATION = '';
                            let FONTSTYLE = '';

                            ter.decos.map((deco) => {
                              if (deco.deco == 't') {
                                FONTSIZE = 30;
                              }
                              if (deco.deco == 'p') {
                                FONTSIZE = 25;
                              }
                              if (deco.deco == 'r') {
                                FILL = '#ff0000';
                              }
                              if (deco.deco == 'd') {
                                TEXTDECORATION = 'underline';
                              }
                              if (deco.deco == 'b') {
                                FONTSTYLE += 'bold ';
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
                                fill={FILL}
                                fontStyle={FONTSTYLE}
                                textDecoration={TEXTDECORATION}
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

            </Layer>
          </Stage>
          <div className=' w-full text-right'>© 2024 Muff</div>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;
