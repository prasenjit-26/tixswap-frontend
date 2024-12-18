"use client"

import React from 'react'
import logo from '../assets/images/tix.png'
import Image from "next/image";

export default function AppFooter() {
  const scrollToDiv = (container: string) => {
    const element = document.getElementById(container);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div className='bg-[#f2efef] py-[40px]'>
      <div className="container mx-auto flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 gap-6 xl:grid-cols-2 mb-[40px]">
          <div>
            <div className='flex flex-col justify-center'>
              <Image src={logo} alt="TIX-SWAP" width={45} />
              <h1 className="text-2xl md:text-4xl font-bold text-left mt-[15px]">
                <span className="text-[#ff914c]">TIX</span><span className="text-[#0049b3]">SWAP</span>
              </h1>
            </div>
            <p className="text-[20px] mt-[10px] text-left">
              Sorting your tickets till Last Minute!
            </p>
            <button className="gradient-button mt-[10px] shadow-xl" onClick={() => scrollToDiv('events')}>
              Explor Upcoming Events
            </button>
          </div>
          <div>
            <h1 className="text-[28px] text-left font-bold text-black mb-[20px]">
              Important Links
            </h1>
            <div className="cursor-pointer mb-[15px]" onClick={() => scrollToDiv("events")}>
              <p className="font-[500] text-[18px]">Events</p>
            </div>
            <div className="cursor-pointer mb-[15px]" onClick={() => scrollToDiv("howItWorks")}>
              <p className="font-[500] text-[18px]">How It Works</p>
            </div>
            <div className="cursor-pointer mb-[15px]" onClick={() => scrollToDiv("aboutUS")}>
              <p className="font-[500] text-[18px]">About Us</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
