'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import DyDrawingCanvas from "./ui/DyDrawingCanvas";

export default function Home() {
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    console.log(postContent);
  }, [postContent]);

  function handleClick(text:string) {
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
          <DyDrawingCanvas />
        </div>
      </div>
    </div>
  );
}
