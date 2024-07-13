'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
    const [navClose, setNavClose] = useState<boolean>(false);
    return (
        <div className="relative flex h-full flex-col px-3 py-2 md:px-2">
            <Link
                className={`mb-2 flex items-end justify-start rounded-md bg-gray-200 p-4
                    ${navClose ? 'h-5' : 'h-20'}`}
                href="/"
            >
                <div className={`w-80 text-gray-800 md:w-80 text-[30px] 
                    ${navClose ? 'opacity-0' : 'opacity-1'}`}>
                    SUPER FAST NOTE
                </div>
                <div className={`absolute bottom-4 right-3 bg-gray-100 px-2 rounded-md`} >
                    <button onClick={(e)=>{setNavClose(!navClose);}}>
                        {navClose ? '↓open' : '↑close'}  
                    </button>
                </div>
            </Link>
        </div>
    );
}