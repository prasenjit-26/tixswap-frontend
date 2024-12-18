"use client"
import React from 'react'
import Image from 'next/image';
import { Description, Dialog, DialogPanel, DialogTitle, Tab, TabGroup, TabList, Listbox, ListboxButton, ListboxOption, ListboxOptions, TabPanel, TabPanels, Input, Label, Field, Combobox, ComboboxButton, Select, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { EVENT_DATA, SUPPORTED_CITIES, API_URL } from '../../../config'

export default function Blog({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const [isReadMore, setIsReadMore] = useState(false)
  const [buyFormData, setBuyFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ticketCategory: '',
    quantity: '',
    price: '',
    instagramHandle: '',
    expectedSellingPrice: ''
  })
  const event = EVENT_DATA.find(ev => ev.id === params.slug)
  const [selectedEventCity, setSelectedEventCity] = useState(event?.cities[0])
  const [processing, setProcessing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState({
    title: '',
    subtitle: '',
    isBuy: true,
    isError: false,
  })
  const [selectedEventDate, setSelectedEventDate] = useState(selectedEventCity?.dates[0])
  const [selectedDeliveryCity, setSelectedDeliveryCity] = useState(SUPPORTED_CITIES[0])
  // Regex for phone number validation (country code optional)
  const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  // Regex for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidBuyerPhone = buyFormData.phone.length > 0 ? phoneRegex.test(buyFormData.phone) : true
  const isValidBuyerEmail = buyFormData.email.length > 0 ? emailRegex.test(buyFormData.email) : true
  const handleTextBoxChanges = (title, value) => {
    setBuyFormData(form => ({ ...form, [title]: value }))
  }
  const handleCitySelect = (city) => {
    setSelectedEventCity(city)
    setSelectedEventDate(city.dates[0])
  }
  const addBuyerDetails = async () => {
    try {
      setProcessing(true)
      const addBuyerDetails = {
        name: buyFormData.name,
        email: buyFormData.email,
        phone: buyFormData.phone,
        event: event?.title,
        eventcity: selectedEventCity?.name,
        eventtime: selectedEventDate?.date,
        ticketdeliverycity: selectedDeliveryCity.name,
        ticketcategory: buyFormData.ticketCategory,
        quantity: buyFormData.quantity,
        price: parseFloat(buyFormData.price),
        instagramhandle: buyFormData.instagramHandle,
      }
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addBuyerDetails)
      }
      console.log('addBuyerDetails', addBuyerDetails)
      const addBuyerDetailsResp = await fetch(`${API_URL}/tixswap/addBuyer`, options)
      const resp = await addBuyerDetailsResp.json()
      console.log('resp', resp)
      if (resp.success) {
        setShowModal(true)
        setModalInfo({
          title: 'Buy Request Submitted !!',
          subtitle: `We’ve successfully received your request to purchase tickets for ${event?.title}. Our team will notify you as soon as we match your request with a suitable seller. Thank you for choosing TixSwap!`,
          isBuy: true,
          isError: false,
        })
      } else {
        setShowModal(true)
        setModalInfo({
          title: 'Unable to Submit Buy Request !!',
          subtitle: `We encountered an issue while trying to store your request to purchase tickets for ${event?.title}. Please try again later. If the problem persists, contact our support team for assistance.`,
          isBuy: true,
          isError: true,
        })
      }
      setProcessing(false)
    } catch (error) {
      setShowModal(true)
      setProcessing(false)
      setModalInfo({
        title: 'Unable to Submit Buy Request !!',
        subtitle: `We encountered an issue while trying to store your request to purchase tickets for ${event?.title}. Please try again later. If the problem persists, contact our support team for assistance.`,
        isBuy: true,
        isError: true,
      })
      console.log('error', error)
    }
  }
  const addSellerDetails = async () => {
    try {
      setProcessing(true)
      const addBuyerDetails = {
        name: buyFormData.name,
        email: buyFormData.email,
        phone: buyFormData.phone,
        event: event?.title,
        eventcity: selectedEventCity?.name,
        eventtime: selectedEventDate?.date,
        ticketsavailablein: selectedDeliveryCity.name,
        ticketdeliverycity: selectedDeliveryCity.name,
        ticketcategory: buyFormData.ticketCategory,
        quantity: buyFormData.quantity,
        originalprice: parseFloat(buyFormData.price),
        expectedprice: parseFloat(buyFormData.expectedSellingPrice),
        instagramhandle: buyFormData.instagramHandle
      }
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addBuyerDetails)
      }
      console.log('addBuyerDetails', addBuyerDetails)
      const addBuyerDetailsResp = await fetch(`${API_URL}/tixswap/addSeller`, options)
      const resp = await addBuyerDetailsResp.json()
      console.log('resp', resp)
      if (resp.success) {
        setShowModal(true)
        setModalInfo({
          title: 'Sell Request Submitted !!',
          subtitle: `Your request to sell tickets for ${event?.title} has been successfully submitted. We’ll notify you once we match your tickets with an interested buyer. Thank you for listing with TixSwap!`,
          isBuy: true,
          isError: false,
        })
      } else {
        setShowModal(true)
        setModalInfo({
          title: 'Unable to Submit Sell Request !!',
          subtitle: `We encountered an issue while trying to store your request to sell tickets for ${event?.title}. Please try again later. If the issue persists, our support team is here to help.`,
          isBuy: true,
          isError: true,
        })
      }
      setProcessing(false)
    } catch (error) {
      setShowModal(true)
      setProcessing(false)
      setModalInfo({
        title: 'Unable to Submit Sell Request !!',
        subtitle: `We encountered an issue while trying to store your request to sell tickets for ${event?.title}. Please try again later. If the issue persists, our support team is here to help.`,
        isBuy: true,
        isError: true,
      })
      console.log('error', error)
    }
  }
  return (
    <div className="py-[30px]">
      <AnimatePresence>
        {showModal && (
          <Dialog static open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-lg space-y-4 bg-white rounded-[20px] p-12 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <DialogTitle className="text-[30px] text-[#ff914c] text-center font-bold">{modalInfo.title}</DialogTitle>
                <Description className="text-center">{modalInfo.subtitle}</Description>
                <div className="flex justify-center">
                  <button className='gradient-button shadow-xl' onClick={() => setShowModal(false)}>Close</button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
      {event &&
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 gap-4 xl:grid-cols-2 mb-[40px]">
            <Image src={event.images[0]} alt={event.title} className='rounded-[12px]' />
            <div>
              <div className='flex items-center justify-center flex-col'>
                <h1 className="text-3xl md:text-3xl text-center font-bold text-[#ff914c] mt-[20px]">
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
                <p className="text-[18px] mt-[5px] text-center font-bold text-[#0049b3]">
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
                className=" rounded-full text-[18px] px-[20px] py-[10px] font-semibold text-black focus:outline-none data-[selected]:bg-[#0049b3]/10 data-[hover]:bg-[#0049b3]/5 data-[selected]:data-[hover]:bg-[#0049b3]/10 data-[focus]:outline-1 data-[focus]:outline-black"
              >
                Buy Tickets
              </Tab>
              <Tab
                key="sell"
                className="rounded-full text-[18px] px-[20px] py-[10px] font-semibold text-black focus:outline-none data-[selected]:bg-[#0049b3]/10 data-[hover]:bg-[#0049b3]/5 data-[selected]:data-[hover]:bg-[#0049b3]/10 data-[focus]:outline-1 data-[focus]:outline-black"
              >
                Sell Tickets
              </Tab>
            </TabList>
            <TabPanels className="mt-3">
              <TabPanel key="buy" className="rounded-xl bg-[#0049b3]/5 p-[20px]">
                <h1 className="text-3xl md:text-3xl text-center font-bold text-black mt-[20px] mb-[30px]">
                  Last Minute Plans?
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 gap-4 xl:grid-cols-2">
                  <div className='col-span-1 xl:col-span-2 lg:col-span-2 md:col-span-2'>
                    <Field>
                      <Label className="text-base font-medium text-black">Full Name</Label>
                      <Input
                        placeholder='Enter Full Name...'
                        value={buyFormData.name}
                        onChange={(event) => handleTextBoxChanges('name', event.target.value)}
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
                        value={buyFormData.email}
                        onChange={(event) => handleTextBoxChanges('email', event.target.value)}
                        placeholder='Enter Email...'
                        className={clsx(
                          'mt-3 block w-full rounded-lg bg-black/5 py-5 px-5 text-sm/3 text-black',
                          isValidBuyerEmail ? 'border-none' : 'border-[#ff5555] border-2',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                        )}
                      />
                      {!isValidBuyerEmail &&
                        <p className='mt-[10px] text-[#ff5555] text-[15px] font-[500]'>
                          Invalid Email
                        </p>
                      }
                    </Field>
                  </div>
                  <div>
                    <Field>
                      <Label className="text-base font-medium text-black">Phone</Label>
                      <Input
                        type='number'
                        placeholder='Enter Phone...'
                        value={buyFormData.phone}
                        onChange={(event) => handleTextBoxChanges('phone', event.target.value)}
                        className={clsx(
                          'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                          isValidBuyerPhone ? 'border-none' : 'border-[#ff5555] border-2',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                        )}
                      />
                      {!isValidBuyerPhone &&
                        <p className='mt-[10px] text-[#ff5555] text-[15px] font-[500]'>
                          Invalid Phone Number
                        </p>
                      }
                    </Field>
                  </div>
                  <div>
                    <Field>
                      <Label className="text-base' font-medium text-black mb-3">Event City</Label>
                      <div className="relative mt-3">
                        <Listbox value={selectedEventCity} onChange={handleCitySelect}>
                          <ListboxButton
                            className={clsx(
                              'relative block w-full rounded-lg bg-black/5 py-5 pr-8 pl-3 text-left text-sm/3 text-black',
                              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                            )}
                          >
                            {selectedEventCity?.name}
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-black/60"
                              aria-hidden="true"
                            />
                          </ListboxButton>
                          <ListboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                              'w-[var(--button-width)] rounded-xl border border-black/5 bg-black/80 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                            )}
                          >
                            {event.cities.map((city) => (
                              <ListboxOption
                                key={city.id}
                                value={city}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-black/40"
                              >
                                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                                <div className="text-sm/3 text-white">{city.name}</div>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </Listbox>
                      </div>
                    </Field>
                  </div>
                  <div>
                    <Field>
                      <Label className="text-base' font-medium text-black mb-3">Event Date</Label>
                      <div className="relative mt-3">
                        <Listbox value={selectedEventDate} onChange={setSelectedEventDate}>
                          <ListboxButton
                            className={clsx(
                              'relative block w-full rounded-lg bg-black/5 py-5 pr-8 pl-3 text-left text-sm/3 text-black',
                              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                            )}
                          >
                            {selectedEventDate?.date}
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-black/60"
                              aria-hidden="true"
                            />
                          </ListboxButton>
                          <ListboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                              'w-[var(--button-width)] rounded-xl border border-black/5 bg-black/80 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                            )}
                          >
                            {selectedEventCity?.dates.map((date) => (
                              <ListboxOption
                                key={date.id}
                                value={date}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-black/40"
                              >
                                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                                <div className="text-sm/3 text-white">{date.date}</div>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </Listbox>
                      </div>
                    </Field>
                  </div>
                  <div>
                    <Field>
                      <Label className="text-base font-medium text-black">Ticket Delivery Required at?</Label>
                      <div className="relative mt-3">
                        <Listbox value={selectedDeliveryCity} onChange={setSelectedDeliveryCity}>
                          <ListboxButton
                            className={clsx(
                              'relative block w-full rounded-lg bg-black/5 py-5 pr-8 pl-3 text-left text-sm/3 text-black',
                              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                            )}
                          >
                            {selectedDeliveryCity?.name}
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-black/60"
                              aria-hidden="true"
                            />
                          </ListboxButton>
                          <ListboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                              'w-[var(--button-width)] rounded-xl border border-black/5 bg-black/80 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                            )}
                          >
                            {SUPPORTED_CITIES.map((city) => (
                              <ListboxOption
                                key={city.id}
                                value={city}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-black/40"
                              >
                                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                                <div className="text-sm/3 text-white">{city.name}</div>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </Listbox>
                      </div>
                    </Field>
                  </div>
                  <div>
                    <Field>
                      <Label className="text-base font-medium text-black">Ticket Category</Label>
                      <Input
                        type='text'
                        placeholder='Ticket Category Required'
                        value={buyFormData.ticketCategory}
                        onChange={(event) => handleTextBoxChanges('ticketCategory', event.target.value)}
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
                        type='number'
                        value={buyFormData.quantity}
                        onChange={(event) => handleTextBoxChanges('quantity', event.target.value)}
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
                        value={buyFormData.price}
                        onChange={(event) => handleTextBoxChanges('price', event.target.value)}
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
                        value={buyFormData.instagramHandle}
                        onChange={(event) => handleTextBoxChanges('instagramHandle', event.target.value)}
                        className={clsx(
                          'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                        )}
                      />
                    </Field>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <button disabled={processing} className="gradient-button mt-[20px] shadow-xl" onClick={addBuyerDetails}>
                    {processing ? 'Processing...' : 'Buy Tickets'}
                  </button>
                </div>
              </TabPanel>
              <TabPanel key="sell" className="rounded-xl bg-[#0049b3]/5 p-[20px]">
                <h1 className="text-3xl md:text-3xl text-center font-bold text-black mt-[20px] mb-[30px]">
                  Cancelled Your Plans?
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 gap-4 xl:grid-cols-2">
                  <div className='col-span-1 xl:col-span-2 lg:col-span-2 md:col-span-2'>
                    <Field>
                      <Label className="text-base font-medium text-black">Full Name</Label>
                      <Input
                        value={buyFormData.name}
                        onChange={(event) => handleTextBoxChanges('name', event.target.value)}
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
                        value={buyFormData.email}
                        onChange={(event) => handleTextBoxChanges('email', event.target.value)}
                        placeholder='Enter Email...'
                        className={clsx(
                          'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                          isValidBuyerEmail ? 'border-none' : 'border-[#ff5555] border-2',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                        )}
                      />
                      {!isValidBuyerEmail &&
                        <p className='mt-[10px] text-[#ff5555] text-[15px] font-[500]'>
                          Invalid Email
                        </p>
                      }
                    </Field>
                  </div>
                  <div>
                    <Field>
                      <Label className="text-base font-medium text-black">Phone</Label>
                      <Input
                        type='number'
                        value={buyFormData.phone}
                        onChange={(event) => handleTextBoxChanges('phone', event.target.value)}
                        placeholder='Enter Phone...'
                        className={clsx(
                          'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                          isValidBuyerPhone ? 'border-none' : 'border-[#ff5555] border-2',
                          'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                        )}
                      />
                      {!isValidBuyerPhone &&
                        <p className='mt-[10px] text-[#ff5555] text-[15px] font-[500]'>
                          Invalid Phone Number
                        </p>
                      }
                    </Field>
                  </div>
                  <div>
                    <Field>
                      <Label className="text-base' font-medium text-black mb-3">Event City</Label>
                      <div className="relative mt-3">
                        <Listbox value={selectedEventCity} onChange={handleCitySelect}>
                          <ListboxButton
                            className={clsx(
                              'relative block w-full rounded-lg bg-black/5 py-5 pr-8 pl-3 text-left text-sm/3 text-black',
                              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                            )}
                          >
                            {selectedEventCity?.name}
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-black/60"
                              aria-hidden="true"
                            />
                          </ListboxButton>
                          <ListboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                              'w-[var(--button-width)] rounded-xl border border-black/5 bg-black/80 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                            )}
                          >
                            {event.cities.map((city) => (
                              <ListboxOption
                                key={city.id}
                                value={city}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-black/40"
                              >
                                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                                <div className="text-sm/3 text-white">{city.name}</div>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </Listbox>
                      </div>
                    </Field>
                  </div>
                  <div>
                    <Field>
                      <Label className="text-base' font-medium text-black mb-3">Event Date</Label>
                      <div className="relative mt-3">
                        <Listbox value={selectedEventDate} onChange={setSelectedEventDate}>
                          <ListboxButton
                            className={clsx(
                              'relative block w-full rounded-lg bg-black/5 py-5 pr-8 pl-3 text-left text-sm/3 text-black',
                              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                            )}
                          >
                            {selectedEventDate?.date}
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-black/60"
                              aria-hidden="true"
                            />
                          </ListboxButton>
                          <ListboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                              'w-[var(--button-width)] rounded-xl border border-black/5 bg-black/80 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                            )}
                          >
                            {selectedEventCity?.dates.map((date) => (
                              <ListboxOption
                                key={date.id}
                                value={date}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-black/40"
                              >
                                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                                <div className="text-sm/3 text-white">{date.date}</div>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </Listbox>
                      </div>
                    </Field>
                  </div>
                  <div>
                    <Field>
                      <Label className="text-base font-medium text-black">Tickets Available in?</Label>
                      <div className="relative mt-3">
                        <Listbox value={selectedDeliveryCity} onChange={setSelectedDeliveryCity}>
                          <ListboxButton
                            className={clsx(
                              'relative block w-full rounded-lg bg-black/5 py-5 pr-8 pl-3 text-left text-sm/3 text-black',
                              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                            )}
                          >
                            {selectedDeliveryCity?.name}
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-4 right-2.5 size-4 fill-black/60"
                              aria-hidden="true"
                            />
                          </ListboxButton>
                          <ListboxOptions
                            anchor="bottom"
                            transition
                            className={clsx(
                              'w-[var(--button-width)] rounded-xl border border-black/5 bg-black/80 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
                              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                            )}
                          >
                            {SUPPORTED_CITIES.map((city) => (
                              <ListboxOption
                                key={city.id}
                                value={city}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-black/40"
                              >
                                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                                <div className="text-sm/3 text-white">{city.name}</div>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </Listbox>
                      </div>
                    </Field>
                  </div>
                  <div>
                    <Field>
                      <Label className="text-base font-medium text-black">Ticket Category</Label>
                      <Input
                        type='text'
                        value={buyFormData.ticketCategory}
                        onChange={(event) => handleTextBoxChanges('ticketCategory', event.target.value)}
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
                        type='number'
                        value={buyFormData.quantity}
                        onChange={(event) => handleTextBoxChanges('quantity', event.target.value)}
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
                        value={buyFormData.price}
                        onChange={(event) => handleTextBoxChanges('price', event.target.value)}
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
                        value={buyFormData.expectedSellingPrice}
                        onChange={(event) => handleTextBoxChanges('expectedSellingPrice', event.target.value)}
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
                  <button disabled={processing} className="gradient-button mt-[20px] shadow-xl" onClick={addSellerDetails}>
                    {processing ? 'Processing...' : 'Sell Your Tickets'}
                  </button>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
          <h1 className="text-4xl md:text-4xl text-center font-bold text-[#0049b3] mt-[20px] mb-[30px]">
            Venue Layout
          </h1>
          <Image src={event.venueLayout} alt={event.title} className='rounded-[12px]' />
        </div>
      }
    </div>
  )
}
