// @ts-nocheck
"use client"

import React from 'react'
import Image from 'next/image';
import { Input, Label, Field, Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { useState } from 'react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { EVENT_DATA, SUPPORTED_CITIES } from '../../config'
import sellIcon from '../../assets/images/sell.png'

export default function Sell() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(EVENT_DATA[0])
  const [queryCity, setQueryCity] = useState('')
  const [queryEvent, setQueryEvent] = useState('')
  const [selectedDeliveryCity, setSelectedDeliveryCity] = useState(SUPPORTED_CITIES[0])
  // const event = EVENT_DATA.find(ev => ev.id === params.slug)
  const filteredCities =
    query === ''
      ? selectedEvent && selectedEvent?.cities
      : selectedEvent?.cities.filter((city) => {
        return city.name.toLowerCase().includes(query.toLowerCase())
      })
  const filteredEvents =
    queryEvent === ''
      ? EVENT_DATA
      : EVENT_DATA.filter((event) => {
        return event.title.toLowerCase().includes(queryEvent.toLowerCase())
      })
  const filteredDeliveryCities =
    queryCity === ''
      ? SUPPORTED_CITIES
      : SUPPORTED_CITIES.filter((city) => {
        return city.name.toLowerCase().includes(queryCity.toLowerCase())
      })
  return (
    <div className="py-[30px]">
      <div className="mb-[40px]">
        <div>
          <div className='rounded-[22px] shadow-xl flex items-center justify-center flex-col p-[20px]'>
            <Image src={sellIcon} alt='Sell Icon' width={80} />
            <h1 className="text-3xl md:text-3xl text-center text-[#4B4376] font-bold mt-[20px] mb-[20px]">
              Change of Plans?
            </h1>
            <ol className='list-decimal ml-[30px]'>
              <li className="text-[20px] font-medium mb-[10px]">
                List your tickets for sale
              </li>
              <li className="text-[20px] font-medium mb-[10px]">
                {`You're not allowed to list at more than MRP / Black-market`}
              </li>
              <li className="text-[20px] font-medium mb-[10px]">
                Our team will verify your tickets and deliver to seller
              </li>
              <li className="text-[20px] font-medium mb-[10px]">
                Deal fulfilment will happen in-person
              </li>
            </ol>
          </div>
        </div>
        <div className='rounded-[22px] shadow-xl mt-[40px] p-[20px]'>
          <h1 className="text-[30px] text-center text-black font-bold mt-[20px] mb-[20px]">
            Cancelled Your Plans?
          </h1>
          <p className="text-[20px] text-center font-medium mb-[10px]">
            {`We got you covered - list your tickets, you'll hear back from us soon!`}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 gap-4 xl:grid-cols-2">
            <div className='col-span-1 xl:col-span-2 lg:col-span-2 md:col-span-2'>
              <Field>
                <Label className="text-base font-medium text-black">Full Name</Label>
                <Input
                  placeholder='Enter Full Name...'
                  className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                  )}
                />
              </Field>
            </div>
            <div>
              <Field>
                <Label className="text-base font-medium text-black">Email</Label>
                <Input
                  type='email'
                  placeholder='Enter Email...'
                  className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                  )}
                />
              </Field>
            </div>
            <div>
              <Field>
                <Label className="text-base font-medium text-black">Phone</Label>
                <Input
                  type='phone'
                  placeholder='Enter Phone...'
                  className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                  )}
                />
              </Field>
            </div>
            <div>
              <Field>
                <Label className="text-base' font-medium text-black mb-3">Event Name</Label>
                <Combobox value={selectedEvent} onChange={(value) => setSelectedEvent(value)} onClose={() => setQueryEvent('')}>
                  <div className="relative mt-3">
                    <ComboboxInput
                      className={clsx(
                        'w-full rounded-lg border-none bg-black/5 py-5  pr-8 pl-3 text-sm/3 text-black',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                      )}
                      displayValue={(city) => city?.title}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                      <ChevronDownIcon className="size-4 fill-black/60 group-data-[hover]:fill-black" />
                    </ComboboxButton>
                  </div>

                  <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                      'w-[var(--input-width)] rounded-xl border border-black/5 bg-black/80 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                      'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                  >
                    {filteredEvents && filteredEvents.map((city) => (
                      <ComboboxOption
                        key={city.id}
                        value={city}
                        className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-black/40"
                      >
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                        <div className="text-sm font-[500] text-white">{city.title}</div>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Combobox>
              </Field>
            </div>
            <div>
              <Field>
                <Label className="text-base' font-medium text-black mb-3">Event City</Label>
                <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')}>
                  <div className="relative mt-3">
                    <ComboboxInput
                      className={clsx(
                        'w-full rounded-lg border-none bg-black/5 py-5  pr-8 pl-3 text-sm/3 text-black',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                      )}
                      displayValue={(city) => city?.name}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                      <ChevronDownIcon className="size-4 fill-black/60 group-data-[hover]:fill-black" />
                    </ComboboxButton>
                  </div>

                  <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                      'w-[var(--input-width)] rounded-xl border border-black/5 bg-black/80 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                      'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                  >
                    {filteredCities && filteredCities.map((city) => (
                      <ComboboxOption
                        key={city.id}
                        value={city}
                        className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-black/40"
                      >
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                        <div className="text-sm font-[500] text-white">{city.name}</div>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Combobox>
              </Field>
            </div>
            <div>
              <Field>
                <Label className="text-base font-medium text-black">Tickets Available in</Label>
                <Combobox value={selectedDeliveryCity} onChange={(value) => setSelectedDeliveryCity(value)} onClose={() => setQueryCity('')}>
                  <div className="relative mt-3">
                    <ComboboxInput
                      className={clsx(
                        'w-full rounded-lg border-none bg-black/5 py-5  pr-8 pl-3 text-sm/3 text-black',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                      )}
                      displayValue={(city) => city?.name}
                      onChange={(event) => setQueryCity(event.target.value)}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                      <ChevronDownIcon className="size-4 fill-black/60 group-data-[hover]:fill-black" />
                    </ComboboxButton>
                  </div>

                  <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                      'w-[var(--input-width)] rounded-xl border border-black/5 bg-black/80 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                      'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                  >
                    {filteredDeliveryCities && filteredDeliveryCities.map((city) => (
                      <ComboboxOption
                        key={city.id}
                        value={city}
                        className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-black/40"
                      >
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                        <div className="text-sm font-[500] text-white">{city.name}</div>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Combobox>
              </Field>
            </div>
            <div>
              <Field>
                <Label className="text-base font-medium text-black">Ticket Category</Label>
                <Input
                  type='text'
                  placeholder='Ticket Category Required'
                  className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                  )}
                />
              </Field>
            </div>
            <div>
              <Field>
                <Label className="text-base font-medium text-black">Quantity</Label>
                <Input
                  type='phone'
                  placeholder='Ticket Quantity Required...'
                  className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                  )}
                />
              </Field>
            </div>
            <div>
              <Field>
                <Label className="text-base font-medium text-black">Expected Selling Price (Per Ticket)</Label>
                <Input
                  type='text'
                  placeholder='Expected Selling Price (Per Ticket)...'
                  className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                  )}
                />
              </Field>
            </div>
            <div>
              <Field>
                <Label className="text-base font-medium text-black">Original Ticket Pirce Paid</Label>
                <Input
                  type='text'
                  placeholder='Offer Pirce...'
                  className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                  )}
                />
              </Field>
            </div>
            <div>
              <Field>
                <Label className="text-base font-medium text-black">Instagram Handle (For Authenticity)</Label>
                <Input
                  type='text'
                  placeholder='Instagram Handle...'
                  className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                  )}
                />
              </Field>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <button className="gradient-button mt-[20px] shadow-xl">
              Sell Your Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
