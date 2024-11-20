// @ts-nocheck

"use client"
import React from 'react'
import Image from 'next/image';
import { Tab, TabGroup, TabList, TabPanel, TabPanels, Input, Label, Field, Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { useState } from 'react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { EVENT_DATA, SUPPORTED_CITIES } from '../../../config'

export default function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const [isReadMore, setIsReadMore] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [queryCity, setQueryCity] = useState('')
  const [selectedDeliveryCity, setSelectedDeliveryCity] = useState(SUPPORTED_CITIES[0])
  const event = EVENT_DATA.find(ev => ev.id === params.slug)
  const filteredCities =
    query === ''
      ? event?.cities
      : event?.cities.filter((city) => {
        return city.name.toLowerCase().includes(query.toLowerCase())
      })
  const filteredDeliveryCities =
    queryCity === ''
      ? SUPPORTED_CITIES
      : SUPPORTED_CITIES.filter((city) => {
        return city.name.toLowerCase().includes(queryCity.toLowerCase())
      })
  return (
    <div className="py-[30px]">
      {event &&
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 gap-4 xl:grid-cols-2 mb-[40px]">
            <Image src={event.images[0]} alt={event.title} className='rounded-[12px]' />
            <div>
              <div className='flex items-center justify-center flex-col'>
                <h1 className="text-3xl md:text-3xl text-center font-bold text-[#AE445A] mt-[20px]">
                  {event.title}
                </h1>
                <p className="text-[16px] mt-[5px]">
                  {event.subtile}
                </p>
              </div>
              {/* <div className='flex items-center justify-between mt-[20px]'>
                <p className="text-[18px] text-center mt-[5px] font-bold">
                  {event.date} {event.time} Onwards
                </p>
                <p className="text-[18px] mt-[5px] text-center font-bold text-[#4B4376]">
                  {event.venue}
                </p>
              </div> */}
              <p className="text-[18px] text-center font-[500] mt-[5px]" dangerouslySetInnerHTML={{ __html: isReadMore ? event.about : event.about.slice(0, 200) }} />
              <p onClick={() => setIsReadMore(!isReadMore)} className='cursor-pointer'>{isReadMore ? 'Read Less...' : 'Read More...'}</p>
            </div>
          </div>
          <TabGroup>
            <TabList className="flex gap-4">
              <Tab
                key="buy"
                className=" rounded-full text-[18px] px-[20px] py-[10px] font-semibold text-black focus:outline-none data-[selected]:bg-[#4B4376]/10 data-[hover]:bg-[#4B4376]/5 data-[selected]:data-[hover]:bg-[#4B4376]/10 data-[focus]:outline-1 data-[focus]:outline-black"
              >
                Buy Tickets
              </Tab>
              <Tab
                key="sell"
                className="rounded-full text-[18px] px-[20px] py-[10px] font-semibold text-black focus:outline-none data-[selected]:bg-[#4B4376]/10 data-[hover]:bg-[#4B4376]/5 data-[selected]:data-[hover]:bg-[#4B4376]/10 data-[focus]:outline-1 data-[focus]:outline-black"
              >
                Sell Tickets
              </Tab>
            </TabList>
            <TabPanels className="mt-3">
              <TabPanel key="buy" className="rounded-xl bg-[#4B4376]/5 p-[20px]">
                <h1 className="text-3xl md:text-3xl text-center font-bold text-black mt-[20px] mb-[30px]">
                  Last Minute Plans?
                </h1>
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
                      <Label className="text-base font-medium text-black">Ticket Delivery Required at?</Label>
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
                      <Label className="text-base font-medium text-black">Pirce</Label>
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
                    Buy Tickets
                  </button>
                </div>
              </TabPanel>
              <TabPanel key="sell" className="rounded-xl bg-[#4B4376]/5 p-[20px]">
                <h1 className="text-3xl md:text-3xl text-center font-bold text-black mt-[20px] mb-[30px]">
                  Cancelled Your Plans?
                </h1>
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
                      <Label className="text-base font-medium text-black">Tickets Available in?</Label>
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
              </TabPanel>
            </TabPanels>
          </TabGroup>
          <h1 className="text-4xl md:text-4xl text-center font-bold text-[#4B4376] mt-[20px] mb-[30px]">
            Venue Layout
          </h1>
          <Image src={event.venueLayout} alt={event.title} className='rounded-[12px]' />
        </div>
      }
    </div>
  )
}
