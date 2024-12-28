'use client';
import React from 'react';
import Image from 'next/image';
import Profile from './components/profile';
import Calendar from './components/Calendar';

export default function Home() {
  return (
    // <React.StrictMode>
    <div >
      <div
        style={{
          backgroundImage: "url('/static/back_tun.png')",
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5, // 背景の透明度
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1, // 背景として下層に配置
        }}
      ></div>
      <div style={{ opacity: '100%' }}>
      <div
        className="absolute h-0 w-0 h-screen bg-cover bg-center bg-[url('/static/tun1.jpg')]"
      />
        <div>働いている鳥たち </div>
        <div className='disply flex'>
          <Profile Name='2才　つん' Desc='特技　のび' img='/static/tun1.jpg' />
          <Profile Name='2才　つん' Desc='好きなもの　ヒマワリの種' img='/static/tun2.jpg'/>
          <Profile Name='2才　つん' Desc='趣味　睡眠' img='/static/tun3.jpg' />
          <Profile Name='2才　つん' Desc='趣味　睡眠' img='/static/tun3.jpg' />
        </div>
        <div className='pt-5'>
          <div>予約日を決めてね</div>
          <Calendar />
        </div>
      </div>
      </div>
    // </React.StrictMode>

  );
}
