"use client"

import React from 'react'
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion'
import { Input, Label, Field, Description, Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useState } from 'react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { EVENT_DATA, SUPPORTED_CITIES, API_URL } from '../../config'
import buyIcon from '../../assets/images/buy.png'

export default function Buy() {
  const [selectedEvent, setSelectedEvent] = useState(EVENT_DATA[0])
  const [selectedCity, setSelectedCity] = useState(EVENT_DATA[0].cities[0])
  const [selectedEventDate, setSelectedEventDate] = useState(EVENT_DATA[0]?.cities[0].dates[0])
  const [selectedDeliveryCity, setSelectedDeliveryCity] = useState(SUPPORTED_CITIES[0])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ticketCategory: '',
    quantity: '',
    price: '',
    instagramHandle: '',
    expectedSellingPrice: ''
  })
  const [processing, setProcessing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState({
    title: '',
    subtitle: '',
    isBuy: true,
    isError: false,
  })
  // const event = EVENT_DATA.find(ev => ev.id === params.slug)
  const handleEventSelect = (event) => {
    setSelectedEvent(event)
    setSelectedCity(event.cities[0])
  }
  const handleCitySelect = (city) => {
    setSelectedCity(city)
    setSelectedEventDate(city.dates[0])
  }
  const handleTextBoxChanges = (title, value) => {
    setFormData(form => ({ ...form, [title]: value }))
  }
  const addBuyerDetails = async () => {
    try {
      setProcessing(true)
      const addBuyerDetails = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        event: selectedEvent.title,
        eventcity: selectedCity?.name,
        eventtime: selectedEventDate?.date,
        ticketdeliverycity: selectedDeliveryCity.name,
        ticketcategory: formData.ticketCategory,
        quantity: formData.quantity,
        price: parseFloat(formData.price),
        instagramhandle: formData.instagramHandle,
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
          subtitle: `We’ve successfully received your request to purchase tickets for ${selectedEvent?.title}. Our team will notify you as soon as we match your request with a suitable seller. Thank you for choosing TixSwap!`,
          isBuy: true,
          isError: false,
        })
      } else {
        setShowModal(true)
        setModalInfo({
          title: 'Unable to Submit Buy Request !!',
          subtitle: `We encountered an issue while trying to store your request to purchase tickets for ${selectedEvent?.title}. Please try again later. If the problem persists, contact our support team for assistance.`,
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
        subtitle: `We encountered an issue while trying to store your request to purchase tickets for ${selectedEvent?.title}. Please try again later. If the problem persists, contact our support team for assistance.`,
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
      <div className="mb-[40px]">
        <div>
          <div className='rounded-[22px] shadow-xl flex items-center justify-center flex-col p-[20px]'>
            <Image src={buyIcon} alt='Buy Icon' width={80} />
            <h1 className="text-3xl md:text-3xl text-center text-[#0049b3] font-bold mt-[20px] mb-[20px]">
              Last Minute Plans?
            </h1>
            <ol className='list-decimal ml-[30px]'>
              <li className="text-[20px] font-medium mb-[10px]">
                Purchase tickets from your fellow community member
              </li>
              <li className="text-[20px] font-medium mb-[10px]">
                Share your requirements, our team member will match it with a seller and will provide you the deal
              </li>
              <li className="text-[20px] font-medium mb-[10px]">
                These will be 100% in-person fulfilments
              </li>
            </ol>
          </div>
        </div>
        <div className='rounded-[22px] shadow-xl mt-[40px] p-[20px]'>
          <h1 className="text-[30px] text-center text-black font-bold mt-[20px] mb-[20px]">
            Last Minute Plans?
          </h1>
          <p className="text-[20px] text-center font-medium mb-[10px]">
            We got you covered - 100% genuine tickets for soldout shows!
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2  md:grid-cols-2 gap-4 xl:grid-cols-2">
            <div className='col-span-1 xl:col-span-2 lg:col-span-2 md:col-span-2'>
              <Field>
                <Label className="text-base font-medium text-black">Full Name</Label>
                <Input
                  value={formData.name}
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
                  value={formData.email}
                  onChange={(event) => handleTextBoxChanges('email', event.target.value)}
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
                  value={formData.phone}
                  onChange={(event) => handleTextBoxChanges('phone', event.target.value)}
                  type='number'
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
                <div className="relative mt-3">
                  <Listbox value={selectedEvent} onChange={handleEventSelect}>
                    <ListboxButton
                      className={clsx(
                        'relative block w-full rounded-lg bg-black/5 py-5 pr-8 pl-3 text-left text-sm/3 text-black',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                      )}
                    >
                      {selectedEvent.title}
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
                      {EVENT_DATA.map((event) => (
                        <ListboxOption
                          key={event.id}
                          value={event}
                          className="group flex cursor-default items-center gap-2 rounded-lg py-3 px-3 select-none data-[focus]:bg-black/40"
                        >
                          <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                          <div className="text-sm/3 text-white">{event.title}</div>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>
                </div>
              </Field>
            </div>
            <div>
              <Field>
                <Label className="text-base' font-medium text-black mb-3">Event City</Label>
                <div className="relative mt-3">
                  <Listbox value={selectedCity} onChange={handleCitySelect}>
                    <ListboxButton
                      className={clsx(
                        'relative block w-full rounded-lg bg-black/5 py-5 pr-8 pl-3 text-left text-sm/3 text-black',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                      )}
                    >
                      {selectedCity.name}
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
                      {selectedEvent.cities.map((city) => (
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
                      {selectedCity?.dates.map((date) => (
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
                      {SUPPORTED_CITIES?.map((city) => (
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
                  value={formData.ticketCategory}
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
                  value={formData.quantity}
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
                <Label className="text-base font-medium text-black">Price</Label>
                <Input
                  value={formData.price}
                  onChange={(event) => handleTextBoxChanges('price', event.target.value)}
                  type='number'
                  placeholder='Offer Price...'
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
                  value={formData.instagramHandle}
                  onChange={(event) => handleTextBoxChanges('instagramHandle', event.target.value)}
                  placeholder='Instagram Handle...'
                  className={clsx(
                    'mt-3 block w-full rounded-lg border-none bg-black/5 py-5 px-5 text-sm/3 text-black',
                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                  )}
                />
              </Field>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <button disabled={processing} onClick={addBuyerDetails} className="gradient-button mt-[20px] shadow-xl">
            {processing ? 'Processing...' : 'Buy Tickets'}
          </button>
        </div>
      </div>
    </div>
  )
}
