"use client"

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from 'next/link'
// import ThemeSwitcher from "./ThemeSwitcher";

const AppNavBar = () => {
  const scrollToDiv = (container: string) => {
    const element = document.getElementById(container);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">TIX-SWAP</p>
        </Link>
      </NavbarBrand>
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
  )
}

export default AppNavBar;
