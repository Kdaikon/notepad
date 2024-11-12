'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
    const [navClose, setNavClose] = useState<boolean>(false);
    return (
        <div className="relative flex h-full flex-col pb-2 ">
            <div
                className={` flex items-end justify-start  bg-gray-700 
                    ${navClose ? 'h-5' : 'h-20'}`}
            >
                <Link className={`absolute bottom-16 md:bottom-9 ml-1 md:ml-2  w-80 
                text-center text-gray-200 text-[30px] hover:text-gray-700 hover:bg-gray-200 rounded-md
                    ${navClose ? 'opacity-0' : 'opacity-1'}`}
                    href="/">
                    SUPER FAST NOTE
                </Link>

            </div>
            <Link
                className={`absolute bottom-9 right-60 text-gray-200 hover:text-gray-700 hover:bg-gray-200 px-2 rounded-md`}
                href="/canvas"
            >
                CANVAS
            </Link>
            <Link
                className={`absolute bottom-9 right-24 text-gray-200 hover:text-gray-700 hover:bg-gray-200 px-2 rounded-md`}
                href="/canvas/details"
            >
                INFO:CAN
            </Link>
            <div className={`absolute bottom-9 right-3 text-gray-200 hover:text-gray-700 hover:bg-gray-200 px-6 rounded-md`} >
                <button onClick={(e) => { setNavClose(!navClose); }}>
                    {navClose ? '▼' : '▲'}
                </button>
            </div>
            <div className='bg-amber-200 h-5 mb-2'/>
        </div> 
    );
}