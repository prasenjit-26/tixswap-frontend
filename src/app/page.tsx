"use client"

/* eslint-disable react/no-unescaped-entities */
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { EVENT_DATA, HOW_IT_WORKS } from '../config'
import EventCard from '../components/EventCard'
import buyIcon from '../assets/images/buy.png'
import sellIcon from '../assets/images/sell.png'
import buyButton from '../assets/images/buy-button.png'
import sellButton from '../assets/images/selling.png'

export default function Home() {
  const router = useRouter()
  const scrollToDiv = (container: string) => {
    const element = document.getElementById(container);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div className="py-[40px]">
      <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 gap-4 xl:grid-cols-2 mb-[40px]">
        <div className="md:hidden flex justify-center items-center mb-[20px]">
          <div dangerouslySetInnerHTML={{ __html: '<dotlottie-player src="https://lottie.host/9cbb0c00-84b7-4b59-b16e-ab990f20d1a6/KAIQuUbUIA.json" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>' }} />
        </div>
        <div>
          <h1 className="text-4xl text-center md:text-left md:text-6xl font-bold mb-[20px]">
            Welcome To
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left">
            <span className="text-[#ff914c]">TIX</span>-<span className="text-[#0049b3]">SWAP</span>
          </h1>
          <p className="text-l md:text-2xl mt-[10px] text-center md:text-left">
            Sorting your tickets till Last Minute!
          </p>
          <div className="flex md:justify-start justify-center">
            <button className="gradient-button mt-[20px] shadow-xl" onClick={() => scrollToDiv('events')}>
              Explor Upcoming Events
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <div dangerouslySetInnerHTML={{ __html: '<dotlottie-player src="https://lottie.host/9cbb0c00-84b7-4b59-b16e-ab990f20d1a6/KAIQuUbUIA.json" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>' }} />
        </div>
      </div>
      <div id="buySellContainer" className='mt-[20px] mb-[30px]'>
        <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 gap-4 xl:grid-cols-2 mb-[40px]">
          <div className='border-2 border-[#0049b3] rounded-[20px] shadow-xl p-[20px]'>
            <div className='flex items-center justify-center flex-col'>
              <Image alt='buy' src={buyButton} width={50} />
              <h1 className="text-4xl text-center md:text-4xl font-bold text-[#0049b3] mt-[20px]">
                Buy Tickets
              </h1>
              <p className="text-[20px] text-center font-medium mb-[20px] mt-[20px]">
                Hey! Purchase last minute tickets to your favourite events in town
              </p>
              <button onClick={() => router.push('/buy')} className="px-[20px] py-[10px] text-white rounded-[10px] text-[18px] shadow-md bg-[#0049b3]">
                Buy Tickets
              </button>
            </div>
          </div>
          <div className='border-2 border-[#ff914c] rounded-[20px] shadow-xl p-[20px]'>
            <div className='flex items-center justify-center flex-col'>
              <Image alt='sell' src={sellButton} width={50} />
              <h1 className="text-4xl text-center md:text-4xl font-bold text-[#ff914c] mt-[20px]">
                Sell Tickets
              </h1>
              <p className="text-[20px] text-center font-medium mb-[20px] mt-[20px]">
                Got your plans cancelled? Help your fellow community members with tickets!
              </p>
              <button onClick={() => router.push('/sell')} className="px-[20px] py-[10px] text-white rounded-[10px] text-[18px] shadow-md bg-[#ff914c]">
                Sell Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="events">
        <h1 className="text-4xl md:text-4xl font-bold text-[#0049b3] mt-[20px] mb-[30px]">
          Upcoming Events
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 gap-4 xl:grid-cols-2 mb-[40px]">
          {EVENT_DATA.map(event => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </div>
      <div id="howItWorks">
        <h1 className="text-4xl md:text-4xl text-center md:text-left font-bold text-[#0049b3] mt-[20px] mb-[30px]">
          How It Works
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 gap-4 xl:grid-cols-2 mb-[40px]">
          <div className='rounded-[12px] shadow-xl p-[20px]'>
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className='flex items-center justify-center flex-col'>
                  <Image src={buyIcon} alt="Buy" width={80} />
                  <h1 className="text-3xl text-center md:text-3xl font-bold mb-[20px] mt-[20px]">
                    For Buyer
                  </h1>
                </div>
                <ol className='list-decimal ml-[30px]'>
                  {HOW_IT_WORKS.buyer.map(list => (
                    <li key={list} className="text-[20px] font-medium mb-[10px]">
                      {list}
                    </li>
                  ))}
                </ol>
              </div>
              <div className='flex items-center justify-center'>
                <button className="gradient-button mt-[20px] shadow-xl" onClick={() => router.push('/buy')}>
                  Buy Tickets
                </button>
              </div>
            </div>
          </div>
          <div className='rounded-[12px] shadow-xl p-[20px]'>
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className='flex items-center justify-center flex-col'>
                  <Image src={sellIcon} alt="Sell" width={80} />
                  <h1 className="text-3xl text-center md:text-3xl font-bold mb-[20px] mt-[20px]">
                    For Seller
                  </h1>
                </div>
                <ol className='list-decimal ml-[30px]'>
                  {HOW_IT_WORKS.seller.map(list => (
                    <li key={list} className="text-[20px] font-medium mb-[10px]">
                      {list}
                    </li>
                  ))}
                </ol>
              </div>
              <div className='flex items-center justify-center'>
                <button className="gradient-button mt-[20px] shadow-xl" onClick={() => router.push('/sell')}>
                  Sell Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="aboutUS" className='rounded-[20px] shadow-xl p-[20px] mt-[20px] mb-[30px]'>
        <h1 className="text-4xl text-center md:text-4xl font-bold text-[#0049b3]">
          About Us
        </h1>
        <p className="text-[20px] text-center font-medium mb-[10px] mt-[30px]">
          At TIX-SWAP, we believe that every ticket has a story-and every story deserves a chance to unfold. Whether you're a fan unable to make it to an event or someone seeking a last-minute opportunity to experience the magic, we're here to bridge the gap.
          <br />
          <br />
          Our platform is designed to simplify ticket reselling, offering a trusted space for buyers to list their unused tickets and for sellers to find tickets to events they're passionate about. We're all about transparency, security, and convenience, ensuring every transaction is smooth, reliable, and hassle-free.
          <br />
          <br />
          We're not just a marketplace; we're a community of event enthusiasts committed to keeping the spirit of live experiences alive. From concerts and festivals to sports games and theater shows, [Your Website Name] makes it easier than ever to connect people with the moments they don't want to miss.
          <br />
          <br />
          Welcome to TIX-SWAP - where every seat tells a story.
        </p>
      </div>
      {/* <AffiliateFooter /> */}
    </div>
  );
}