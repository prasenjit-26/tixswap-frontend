'use client'

import { StaticImageData } from 'next/image'
import Image from "next/image"
import React from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  title: string
  subtile: string
  date: string
  time: string
  venue: string
  city: string
  about: string
  id: string
  images: StaticImageData[]
  venueLayout: StaticImageData
}
export default function EventCard(
  {
    title,
    subtile,
    date,
    time,
    venue,
    city,
    about,
    id,
    images,
    venueLayout
  }: Props
) {
  const router = useRouter()
  return (
    <div className='rounded-[12px] shadow-xl p-[20px]'>
      <Image src={images[0]} alt={title} className='rounded-[12px]' />
      <h1 className="text-3xl md:text-3xl font-bold text-[#AE445A] mt-[20px]">
        {title}
      </h1>
      <p className="text-[16px] mt-[5px]">
        {subtile}
      </p>
      <p className="text-[18px] mt-[5px] font-bold">
        {date} {time} Onwards
      </p>
      <p className="text-[18px] mt-[5px] font-bold text-[#4B4376]">
        {venue}
      </p>
      <div className='flex items-center justify-center mt-[20px]'>
        <button onClick={() => router.push(`/event/${id}`)} className="px-[20px] py-[10px] text-white rounded-[10px] text-[18px] shadow-md bg-[#AE445A]">
          Check Details
        </button>
      </div>
    </div>
  )
}
