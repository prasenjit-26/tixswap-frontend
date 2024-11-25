"use client"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from 'next/link'
import {
  Bars4Icon
} from '@heroicons/react/16/solid'
import logo from '../assets/images/logo.png'
import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// import ThemeSwitcher from "./ThemeSwitcher";

const AppNavBar = () => {
  const scrollToDiv = (container: string) => {
    const element = document.getElementById(container);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div className="container mx-auto flex-1">
      <Navbar isBordered className="max-w-full">
        <NavbarBrand>
          <Link href="/">
            <div className="flex items-center">
              <Image src={logo} alt="TIX-SWAP" width={45} />
              <p className="font-bold text-inherit ml-[15px] text-[20px]">
                <span className="text-[#AE445A]">TIX</span>-<span className="text-[#4B4376]">SWAP</span>
              </p>
            </div>
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end" className="flex lg:hidden xl:hidden md:hidden">
          <div className="w-52 text-right">
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white">
                <Bars4Icon className="size-6 fill-[#4B4376]" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className="w-52 z-[122] origin-top-right rounded-xl border border-black/80 bg-black/80 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <button onClick={() => scrollToDiv("events")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                    <p className="font-bold text-inherit">Events</p>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button onClick={() => scrollToDiv("howItWorks")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                    <p className="font-bold text-inherit">How It Works</p>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button onClick={() => scrollToDiv("aboutUS")} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/40">
                    <p className="font-bold text-inherit">About Us</p>
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </NavbarContent>
        <NavbarContent justify="end" className="hidden lg:flex xl:flex md:flex">
          {/* <NavbarItem>
        <ThemeSwitcher />
      </NavbarItem> */}
          <NavbarItem className="cursor-pointer">
            <Link href="/">
              <p className="font-bold text-inherit">Home</p>
            </Link>
          </NavbarItem>
          <NavbarItem className="cursor-pointer" onClick={() => scrollToDiv("events")}>
            <p className="font-bold text-inherit">Events</p>
          </NavbarItem>
          <NavbarItem className="cursor-pointer" onClick={() => scrollToDiv("howItWorks")}>
            <p className="font-bold text-inherit">How It Works</p>
          </NavbarItem>
          <NavbarItem className="cursor-pointer" onClick={() => scrollToDiv("aboutUS")}>
            <p className="font-bold text-inherit">About Us</p>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>

  )
}

export default AppNavBar;
